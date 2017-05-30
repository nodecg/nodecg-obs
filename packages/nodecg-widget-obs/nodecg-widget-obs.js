(function () {
	const namespaces = nodecg.Replicant('_obs:namespaces');

	/**
	 * `nodecg-widget-obs`
	 * A NodeCG utility that provides a UI for configuring a connection to OBS via obs-websocket
	 *
	 * @customElement
	 * @polymer
	 */
	class NodecgWidgetObs extends Polymer.Element {
		static get is() {
			return 'nodecg-widget-obs';
		}

		static get properties() {
			return {
				selected: {
					type: Number,
					value: 0,
					notify: true
				},
				namespaces: {
					type: Array,
					value() {
						return [];
					}
				},
				numNamespaces: {
					type: Number,
					computed: '_computeNumNamespaces(namespaces)'
				}
			};
		}

		ready() {
			super.ready();
			namespaces.on('change', newVal => {
				this.namespaces = newVal.slice(0);
			});
		}

		_computeNumNamespaces(namespaces) {
			return namespaces.length;
		}

		_lessThan(a, b) {
			return a < b;
		}

		_handleControlsStatusChanged(e) {
			const leds = this.shadowRoot.querySelectorAll('nodecg-widget-obs-led');
			const led = leds[e.model.index];

			/* istanbul ignore next: just a safety, not worth the hassle of testing */
			if (!led) {
				return;
			}

			switch (e.target.status) {
				case 'connected':
					led.color = 'green';
					break;
				case 'connecting':
					led.color = 'yellow';
					break;
				case 'disconnected':
				case 'error':
					led.color = 'red';
					break;
				/* istanbul ignore next */
				default:
					// Do nothing.
			}
		}

		_handleControlsConnected(e) {
			this.$.toast.show(`OBS #${e.model.index + 1}: Connected!`);
		}

		_handleControlsDisconnected(e) {
			this.$.toast.show(`OBS #${e.model.index + 1}: Disconnected.`);
		}

		_handleControlsConnectionFailure(e) {
			const error = e.detail;
			this.$.toast.show(`OBS #${e.model.index + 1}: Failed to connect: ${error.message ? error.message : error}`);
		}
	}

	window.NodecgWidgetObs = NodecgWidgetObs;
	window.customElements.define(NodecgWidgetObs.is, NodecgWidgetObs);
})();
