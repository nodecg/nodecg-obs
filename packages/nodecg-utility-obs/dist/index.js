'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path = require("path");
// Packages
const clone = require("clone");
const OBSWebSocket = require("obs-websocket-js");
const usedNamespaces = new Set();
class OBSUtility extends OBSWebSocket {
    constructor(nodecg, opts = {}) {
        super();
        this._ignoreConnectionClosedEvents = false;
        this._reconnectInterval = null;
        let namespace = 'obs';
        if (opts.namespace !== undefined) {
            namespace = opts.namespace;
        }
        if (usedNamespaces.has(namespace)) {
            throw new Error(`Namespace "${namespace}" has already been used. Please choose a different namespace.`);
        }
        usedNamespaces.add(namespace);
        this.namespace = namespace;
        const namespacesReplicant = nodecg.Replicant('_obs:namespaces', {
            schemaPath: buildSchemaPath('namespaces'),
            persistent: false
        });
        namespacesReplicant.value.push(namespace);
        const websocketConfig = nodecg.Replicant(`${namespace}:websocket`, { schemaPath: buildSchemaPath('websocket') });
        const programScene = nodecg.Replicant(`${namespace}:programScene`, { schemaPath: buildSchemaPath('programScene') });
        const previewScene = nodecg.Replicant(`${namespace}:previewScene`, { schemaPath: buildSchemaPath('previewScene') });
        const sceneList = nodecg.Replicant(`${namespace}:sceneList`, { schemaPath: buildSchemaPath('sceneList') });
        const transitioning = nodecg.Replicant(`${namespace}:transitioning`, { schemaPath: buildSchemaPath('transitioning') });
        const studioMode = nodecg.Replicant(`${namespace}:studioMode`, { schemaPath: buildSchemaPath('studioMode') });
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
            transitioning,
            studioMode
        };
        this.log = log;
        this.hooks = opts.hooks || {};
        websocketConfig.once('change', newVal => {
            // If we were connected last time, try connecting again now.
            if (newVal.status === 'connected' || newVal.status === 'connecting') {
                websocketConfig.value.status = 'connecting';
                this._connectToOBS().then().catch(() => {
                    websocketConfig.value.status = 'error';
                });
            }
        });
        nodecg.listenFor(`${namespace}:connect`, (params, callback) => {
            this._ignoreConnectionClosedEvents = false;
            clearInterval(this._reconnectInterval);
            this._reconnectInterval = null;
            websocketConfig.value.ip = params.ip;
            websocketConfig.value.port = parseInt(params.port, 10);
            websocketConfig.value.password = params.password;
            this._connectToOBS().then(() => {
                if (callback && !callback.handled) {
                    callback();
                }
            }).catch(err => {
                websocketConfig.value.status = 'error';
                log.error('Failed to connect:', err);
                if (!callback || callback.handled) {
                    return;
                }
                /* istanbul ignore else: this is just an overly-safe way of logging these critical errors */
                if (err.error && typeof err.error === 'string') {
                    callback(err.error);
                }
                else if (err.message) {
                    callback(err.message);
                }
                else if (err.code) {
                    callback(err.code);
                }
                else {
                    callback(err);
                }
            });
        });
        nodecg.listenFor(`${namespace}:disconnect`, (_data, callback) => {
            this._ignoreConnectionClosedEvents = true;
            clearInterval(this._reconnectInterval);
            this._reconnectInterval = null;
            websocketConfig.value.status = 'disconnected';
            this.disconnect();
            log.info('Operator-requested disconnect.');
            if (callback && !callback.handled) {
                callback();
            }
        });
        nodecg.listenFor(`${namespace}:previewScene`, async (sceneName, callback) => {
            try {
                await this.send('SetPreviewScene', { 'scene-name': sceneName });
                if (callback && !callback.handled) {
                    callback();
                }
            }
            catch (error) {
                log.error('Error setting preview scene:', error);
                if (callback && !callback.handled) {
                    callback(error);
                }
            }
        });
        nodecg.listenFor(`${namespace}:transition`, async ({ name, duration, sceneName } = {}, callback) => {
            if (sceneName) {
                try {
                    await this.send('SetPreviewScene', { 'scene-name': sceneName });
                }
                catch (error) {
                    log.error('Error setting preview scene for transition:', error);
                    if (callback && !callback.handled) {
                        callback(error);
                    }
                    return;
                }
            }
            try {
                await this._transition(name, duration);
            }
            catch (error) {
                log.error('Error transitioning:', error);
                if (callback && !callback.handled) {
                    callback(error);
                }
                return;
            }
            if (callback && !callback.handled) {
                callback();
            }
        });
        nodecg.listenFor(`${namespace}:startStreaming`, (_data, callback) => {
            try {
                this.send('StartStreaming');
            }
            catch (error) {
                log.error('Error starting the streaming:', error);
                if (callback && !callback.handled) {
                    callback(error);
                }
                return;
            }
            if (callback && !callback.handled) {
                callback();
            }
        });
        nodecg.listenFor(`${namespace}:stopStreaming`, (_data, callback) => {
            try {
                this.send('StopStreaming');
            }
            catch (error) {
                log.error('Error stopping the streaming:', error);
                if (callback && !callback.handled) {
                    callback(error);
                }
                return;
            }
            if (callback && !callback.handled) {
                callback();
            }
        });
        this.on('ConnectionClosed', () => {
            this._reconnectToOBS();
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
                name: data['scene-name'],
                sources: data.sources
            };
        });
        this.on('TransitionBegin', data => {
            const toScene = previewScene.value ? previewScene.value.name : undefined;
            nodecg.sendMessage(`${namespace}:transitioning`, Object.assign({ sceneName: toScene, fromScene: programScene.value ? programScene.value.name : undefined, toScene }, data));
            transitioning.value = true;
        });
        this.on('StudioModeSwitched', data => {
            studioMode.value = data['new-state'];
        });
        setInterval(() => {
            if (websocketConfig.value && websocketConfig.value.status === 'connected' && !this._connected) {
                log.warn('Thought we were connected, but the automatic poll detected we were not. Correcting.');
                clearInterval(this._reconnectInterval);
                this._reconnectInterval = null;
                this._reconnectToOBS();
            }
        }, 1000);
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
            this._reconnectInterval = null;
            websocketConfig.value.status = 'connected';
            return this._fullUpdate();
        });
    }
    /**
     * Attempt to reconnect to OBS, and keep re-trying every 5s until successful.
     * @private
     */
    _reconnectToOBS() {
        if (this._reconnectInterval) {
            return;
        }
        const websocketConfig = this.replicants.websocket;
        if (this._ignoreConnectionClosedEvents) {
            websocketConfig.value.status = 'disconnected';
            return;
        }
        websocketConfig.value.status = 'connecting';
        this.log.warn('Connection closed, will attempt to reconnect every 5 seconds.');
        this._reconnectInterval = setInterval(() => {
            this._connectToOBS().catch(/* istanbul ignore next */ () => { }); // Intentionally discard error messages -- bit dangerous.
        }, 5000);
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
            this._updatePreviewScene(),
            this._updateStudioMode()
        ]);
    }
    /**
     * Updates the sceneList replicant with the current value from OBS.
     * By extension, it also updates the customSceneList replicant.
     * @returns {Promise}
     */
    _updateScenesList() {
        return this.send('GetSceneList').then(res => {
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
        return this.send('GetCurrentScene').then(res => {
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
        return this.send('GetPreviewScene').then(res => {
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
     * Updates the studioMode replicant with the current value from OBS.
     * @returns {Promise.<T>|*}
     * @private
     */
    _updateStudioMode() {
        return this.send('GetStudioModeStatus').then(res => {
            this.replicants.studioMode.value = res['studio-mode'];
        }).catch(err => {
            this.log.error('Error getting studio mode status:', err);
        });
    }
    /**
     * Transitions from preview to program with the desired transition.
     * Has an optional hook for overriding which transition is used.
     * @param [transitionName] - The name of the transition to use.
     * If not provided, will use whatever default transition is selected in this.
     * The transition choice can be overridden by a user code hook.
     * @param [transitionDuration] - The duration of the transition to use.
     * If not provided, will use whatever default transition duration is selected in this.
     * The transition duration can be overridden by a user code hook.
     * @returns {Promise}
     */
    async _transition(transitionName, transitionDuration) {
        if (this.replicants.websocket.value.status !== 'connected') {
            throw new Error('Can\'t transition when not connected to OBS');
        }
        const transitionConfig = {
            name: transitionName,
            duration: undefined
        };
        if (typeof transitionDuration === 'number') {
            transitionConfig.duration = transitionDuration;
        }
        let transitionOpts = {
            'with-transition': transitionConfig
        };
        this.replicants.transitioning.value = true;
        if (typeof this.hooks.preTransition === 'function') {
            const modifiedTransitionOpts = await this.hooks.preTransition(clone(transitionOpts));
            if (modifiedTransitionOpts) {
                transitionOpts = modifiedTransitionOpts;
            }
        }
        try {
            await this.send('TransitionToProgram', transitionOpts);
        }
        catch (e) {
            this.replicants.transitioning.value = false;
            // If we are able, add information about the name and duration of the transition we were trying
            // to invoke when the error happened.
            if (typeof e === 'object' && {}.hasOwnProperty.call(e, 'messageId') &&
                typeof transitionOpts === 'object' && typeof transitionOpts['with-transition'] === 'object') {
                e.name = transitionOpts['with-transition'].name;
                e.duration = transitionOpts['with-transition'].duration;
            }
            throw e;
        }
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
 */
function buildSchemaPath(schemaName) {
    return path.resolve(__dirname, 'schemas', `${encodeURIComponent(schemaName)}.json`);
}
module.exports = OBSUtility;
//# sourceMappingURL=index.js.map