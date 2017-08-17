(function () {
	'use strict';

	/**
	 * @customElement
	 * @polymer
	 * @extends Polymer.Element
	 */
	class NodeCGOBSScene extends Polymer.Element {
		static get is() {
			return 'nodecg-obs-scene';
		}

		static get properties() {
			return {
				/**
				 * The nodecg-utility-obs namespace to use for Messages and Replicants.
				 */
				namespace: {
					type: String,
					value: 'obs',
					observer: '_namespaceChanged'
				},

				/**
				 * The name of the scene in OBS Studio to track.
				 */
				sceneName: {
					type: String,
					observer: '_sceneNameChanged'
				},

				/**
				 * The state of the target scene in OBS Studio.
				 * Will always be one of `preview`, `program`, or `none`.
				 */
				state: {
					type: String,
					notify: true,
					observer: '_stateChanged'
				}
			};
		}

		/**
		 * Fired when the target scene is in Preview.
		 *
		 * @event preview
		 */

		/**
		 * Fired when the target scene is in Program.
		 *
		 * @event program
		 */

		/**
		 * Fired when the target scene is in neither Preview nor Program.
		 *
		 * @event none
		 */

		ready() {
			this.refresh = this.refresh.bind(this);
			this._handleTransitionMsg = this._handleTransitionMsg.bind(this);
			this._handlePreviewOrProgramReplicantChange = this._handlePreviewOrProgramReplicantChange.bind(this);

			// It's important that this come _after_ the bindings above.
			super.ready();
		}

		refresh(forceFire) {
			if (typeof forceFire !== 'boolean' && typeof forceFire !== 'undefined') {
				throw new Error(`forceFire must be a boolean, got a ${typeof forceFire}`);
			}

			if ((this._sceneBeingTransitionedTo === this.sceneName) ||
				(this._programSceneRep.value && this._programSceneRep.value.name === this.sceneName)) {
				this.state = 'program';
			} else if (this._previewSceneRep.value && this._previewSceneRep.value.name === this.sceneName) {
				this.state = 'preview';
			} else {
				this.state = 'none';
			}

			if (forceFire) {
				this.dispatchEvent(new CustomEvent(this.state, {bubbles: false}));
			}
		}

		_namespaceChanged(newVal, oldVal) {
			// Remove listeners for the old namespace.
			if (typeof oldVal === 'string') {
				nodecg.unlisten(`${oldVal}:transitioning`, this._handleTransitionMsg);
				this._previewSceneRep.removeListener('change', this._handlePreviewOrProgramReplicantChange);
				this._programSceneRep.removeListener('change', this._handlePreviewOrProgramReplicantChange);
			}

			// Set up listeners for the new namespace.
			nodecg.listenFor(`${newVal}:transitioning`, this._handleTransitionMsg);
			this._previewSceneRep = nodecg.Replicant(`${newVal}:previewScene`);
			this._programSceneRep = nodecg.Replicant(`${newVal}:programScene`);
			this._previewSceneRep.on('change', this._handlePreviewOrProgramReplicantChange);
			this._programSceneRep.on('change', this._handlePreviewOrProgramReplicantChange);
		}

		_sceneNameChanged() {
			this.refresh();
		}

		_stateChanged(newVal) {
			this.dispatchEvent(new CustomEvent(newVal, {bubbles: false}));
		}

		_handlePreviewOrProgramReplicantChange() {
			this.refresh();
		}

		_handleTransitionMsg(data) {
			this._sceneBeingTransitionedTo = data.sceneName;
			if (data.sceneName === this.sceneName) {
				this.state = 'program';
			}
		}
	}

	customElements.define(NodeCGOBSScene.is, NodeCGOBSScene);
})();
