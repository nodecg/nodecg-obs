/**
 * `nodecg-widget-obs-controls`
 * The controls for a specific connection to OBS.
 *
 * @customElement
 * @polymer
 */
class NodecgWidgetObsControls extends Polymer.Element {
	static get is() {
		return 'nodecg-widget-obs-controls';
	}

	static get properties() {
		return {
			namespace: {
				type: String,
				observer: '_namespaceChanged'
			},
			websocketReplicant: {
				type: Object,
				readOnly: true
			},
			status: {
				type: String,
				value: 'disconnected',
				observer: '_statusChanged',
				readOnly: true,
				notify: true
			},
			ipAddress: String,
			port: Number,
			password: String
		};
	}

	constructor() {
		super();
		this._handleWebsocketReplicantChange = this._handleWebsocketReplicantChange.bind(this);
	}

	ready() {
		super.ready();
		this.$.connect.disabled = true;
	}

	connect() {
		nodecg.sendMessage(`${this.namespace}:connect`, {
			ip: this.ipAddress,
			port: this.port,
			password: this.password
		}).catch(err => {
			this.dispatchEvent(new CustomEvent('connection-failure', {
				detail: err,
				bubbles: true,
				composed: true
			}));
		});
	}

	disconnect() {
		nodecg.sendMessage(`${this.namespace}:disconnect`);
	}

	_namespaceChanged(newNamespace) {
		if (this.websocketReplicant) {
			this.websocketReplicant.removeListener('change', this._handleWebsocketReplicantChange);
		}

		this._setWebsocketReplicant(nodecg.Replicant(`${newNamespace}:websocket`));
		this.websocketReplicant.on('change', this._handleWebsocketReplicantChange);
	}

	_statusChanged(newStatus, oldStatus) {
		this.$.connect.hidden = newStatus === 'connected' || newStatus === 'connecting';
		this.$['indicator-status-online'].hidden = newStatus !== 'connected';

		this.$.disconnect.hidden = newStatus !== 'connected';
		this.$['indicator-status-offline'].hidden = newStatus !== 'disconnected' && newStatus !== 'error';

		this.$.abort.hidden = newStatus !== 'connecting';
		this.$['indicator-status-connecting'].hidden = newStatus !== 'connecting';

		if (oldStatus === 'connected') {
			this.dispatchEvent(new CustomEvent('disconnected', {bubbles: true, composed: true}));
		} else if (newStatus === 'connected') {
			this.dispatchEvent(new CustomEvent('connected', {bubbles: true, composed: true}));
		}

		switch (newStatus) {
			case 'connected':
				this.$['indicator-led'].color = 'green';
				break;
			case 'connecting':
				this.$['indicator-led'].color = 'yellow';
				break;
			case 'disconnected':
			case 'error':
				this.$['indicator-led'].color = 'red';
				break;
			/* istanbul ignore next */
			default:
				// Do nothing.
		}
	}

	_handleWebsocketReplicantChange(newVal) {
		this.ipAddress = newVal.ip;
		this.port = newVal.port;
		this.password = newVal.password;
		this.disableControls = newVal.status === 'connected' || newVal.status === 'connecting';
		this._setStatus(newVal.status);
	}

	_calcConnectDisabled(ipAddress, port) {
		return !ipAddress || !port;
	}
}

window.customElements.define(NodecgWidgetObsControls.is, NodecgWidgetObsControls);
