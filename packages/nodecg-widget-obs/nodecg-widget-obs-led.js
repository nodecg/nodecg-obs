/**
 * `nodecg-widget-obs-led`
 * A colored status indicator made to look like an LED
 *
 * @customElement
 * @polymer
 */
class NodecgWidgetObsLed extends Polymer.Element {
	static get is() {
		return 'nodecg-widget-obs-led';
	}

	static get properties() {
		return {
			color: {
				type: String,
				reflectToAttribute: true
			}
		};
	}
}

window.customElements.define(NodecgWidgetObsLed.is, NodecgWidgetObsLed);
