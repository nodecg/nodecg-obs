'use strict';

// Native
const path = require('path');

// Packages
const clone = require('clone');
const OBSWebSocket = require('obs-websocket-js');

const usedNamespaces = new Set();

class OBSUtility extends OBSWebSocket {
	constructor(nodecg, opts = {}) {
		let namespace = opts.namespace;
		if (typeof opts.namespace === 'undefined') {
			namespace = 'obs';
		}

		if (usedNamespaces.has(namespace)) {
			throw new Error(`Namespace "${namespace}" has already been used. Please choose a different namespace.`);
		}

		super();

		usedNamespaces.add(namespace);
		this.namespace = namespace;
		const namespacesReplicant = nodecg.Replicant('_obs:namespaces', {
			schemaPath: buildSchemaPath('namespaces'),
			persistent: false
		});
		namespacesReplicant.value.push(namespace);

		let ignoreConnectionClosedEvents = false;
		const websocketConfig = nodecg.Replicant(`${namespace}:websocket`, {schemaPath: buildSchemaPath('websocket')});
		const programScene = nodecg.Replicant(`${namespace}:programScene`, {schemaPath: buildSchemaPath('programScene')});
		const previewScene = nodecg.Replicant(`${namespace}:previewScene`, {schemaPath: buildSchemaPath('previewScene')});
		const sceneList = nodecg.Replicant(`${namespace}:sceneList`, {schemaPath: buildSchemaPath('sceneList')});
		const transitioning = nodecg.Replicant(`${namespace}:transitioning`, {schemaPath: buildSchemaPath('transitioning')});
		const log = new nodecg.Logger(`${nodecg.bundleName}:${namespace}`);

		// Expose convenient references to the Replicants.
		// This isn't strictly necessary. The same effect could be achieved by just
		// declaring the same Replicant again, but some folks might like
		// to just work with the references that we return here.
		this.replicants = {
			websocket: websocketConfig,
			programScene,
			previewScene,
			sceneList,
			transitioning
		};
		this.log = log;
		this.hooks = opts.hooks || {};
		this._reconnectInterval = null;

		websocketConfig.once('change', newVal => {
			// If we were connected last time, try connecting again now.
			if (newVal.status === 'connected' || newVal.status === 'connecting') {
				websocketConfig.value.status = 'connecting';
				this._connectToOBS().then().catch(() => {
					websocketConfig.value.status = 'error';
				});
			}
		});

		nodecg.listenFor(`${namespace}:connect`, (params, cb) => {
			ignoreConnectionClosedEvents = false;
			clearInterval(this._reconnectInterval);
			websocketConfig.value.ip = params.ip;
			websocketConfig.value.port = params.port;
			websocketConfig.value.password = params.password;
			this._connectToOBS().then(() => {
				cb();
			}).catch(err => {
				websocketConfig.value.status = 'error';
				log.error('Failed to connect:', err);

				/* istanbul ignore else: this is just an overly-safe way of logging these critical errors */
				if (err.error && typeof err.error === 'string') {
					cb(err.error);
				} else if (err.message) {
					cb(err.message);
				} else if (err.code) {
					cb(err.code);
				} else {
					cb(err);
				}
			});
		});

		nodecg.listenFor(`${namespace}:disconnect`, () => {
			ignoreConnectionClosedEvents = true;
			clearInterval(this._reconnectInterval);
			websocketConfig.value.status = 'disconnected';
			this.disconnect();
			log.info('Operator-requested disconnect.');
		});

		nodecg.listenFor(`${namespace}:previewScene`, sceneName => {
			this.setPreviewScene({
				'scene-name': sceneName
			}).catch(err => {
				log.error('Error setting preview scene:', err);
			});
		});

		nodecg.listenFor(`${namespace}:transition`, transitionName => {
			this._transition(transitionName).catch(err => {
				log.error('Error transitioning:', err);
			});
		});

		this.on('ConnectionClosed', () => {
			if (this._reconnectInterval) {
				return;
			}

			if (ignoreConnectionClosedEvents) {
				websocketConfig.value.status = 'disconnected';
				return;
			}

			websocketConfig.value.status = 'connecting';
			log.warn('Connection closed, will attempt to reconnect every 5 seconds.');
			this._reconnectInterval = setInterval(() => {
				this._connectToOBS().catch(/* istanbul ignore next */() => {}); // Intentionally discard error messages -- bit dangerous.
			}, 5000);
		});

		this.on('SwitchScenes', () => {
			transitioning.value = false;
			this._updatePreviewScene();
			this._updateProgramScene();
		});

		this.on('ScenesChanged', () => {
			this._updateScenesList();
		});

		this.on('PreviewSceneChanged', data => {
			previewScene.value = {
				name: data.sceneName,
				sources: data.sources
			};
		});

		this.on('TransitionBegin', () => {
			nodecg.sendMessage(`${namespace}:transitioning`, {
				sceneName: previewScene.value ? previewScene.value.name : undefined
			});
			transitioning.value = true;
		});
	}

	/**
	 * Attemps to connect to OBS Studio via obs-websocket using the parameters
	 * defined in the ${namespace}:websocket Replicant.
	 * @returns {Promise}
	 */
	_connectToOBS() {
		const websocketConfig = this.replicants.websocket;
		if (websocketConfig.value.status === 'connected') {
			throw new Error('Attempted to connect to OBS while already connected!');
		}

		websocketConfig.value.status = 'connecting';

		return this.connect({
			address: `${websocketConfig.value.ip}:${websocketConfig.value.port}`,
			password: websocketConfig.value.password
		}).then(() => {
			this.log.info('Connected.');
			clearInterval(this._reconnectInterval);
			websocketConfig.value.status = 'connected';
			return this._fullUpdate();
		});
	}

	/**
	 * Gets the current scene info from OBS, and detemines what layout is active based
	 * on the sources present in that scene.
	 * @returns {Promise}
	 */
	_fullUpdate() {
		return Promise.all([
			this._updateScenesList(),
			this._updateProgramScene(),
			this._updatePreviewScene()
		]);
	}

	/**
	 * Updates the sceneList replicant with the current value from OBS.
	 * By extension, it also updates the customSceneList replicant.
	 * @returns {Promise}
	 */
	_updateScenesList() {
		return this.getSceneList().then(res => {
			this.replicants.sceneList.value = res.scenes.map(scene => scene.name);
			return res;
		}).catch(err => {
			this.log.error('Error updating scenes list:', err);
		});
	}

	/**
	 * Updates the programScene replicant with the current value from OBS.
	 * @returns {Promise}
	 */
	_updateProgramScene() {
		return this.getCurrentScene().then(res => {
			this.replicants.programScene.value = {
				name: res.name,
				sources: res.sources
			};
			return res;
		}).catch(err => {
			this.log.error('Error updating program scene:', err);
		});
	}

	/**
	 * Updates the previewScene replicant with the current value from OBS.
	 */
	_updatePreviewScene() {
		return this.getPreviewScene().then(res => {
			this.replicants.previewScene.value = {
				name: res.name,
				sources: res.sources
			};
		}).catch(err => {
			if (err.error === 'studio mode not enabled') {
				this.replicants.previewScene.value = null;
				return;
			}

			this.log.error('Error updating preview scene:', err);
		});
	}

	/**
	 * Transitions from preview to program with the desired transition.
	 * Has an optional hook for overriding which transition is used.
	 * @param [transitionName] {string} - The name of the transition to use.
	 * If not provided, will use whatever default transition is selected in this.
	 * The transition choice can be overridden by a user code hook.
	 * @returns {Promise}
	 */
	async _transition(transitionName) {
		if (this.replicants.websocket.value.status !== 'connected') {
			throw new Error('Can\'t transition when not connected to OBS');
		}

		let transitionOpts = {
			'with-transition': transitionName
		};

		if (typeof this.hooks.preTransition === 'function') {
			const modifiedTransitionOpts = await this.hooks.preTransition(clone(transitionOpts));
			if (modifiedTransitionOpts) {
				transitionOpts = modifiedTransitionOpts;
			}
		}

		return this.transitionToProgram(transitionOpts);
	}

	/**
	 * Clears the list of used namespaces, allowing any previously used
	 * namespace to be re-used. Used internally for testing, should
	 * not be used in production.
	 * @private
	 */
	static _clearUsedNamespaces() {
		return usedNamespaces.clear();
	}
}

/**
 * Calculates the absolute file path to one of our local Replicant schemas.
 * @param schemaName {string}
 */
function buildSchemaPath(schemaName) {
	return path.resolve(__dirname, 'schemas', `${encodeURIComponent(schemaName)}.json`);
}

module.exports = OBSUtility;
