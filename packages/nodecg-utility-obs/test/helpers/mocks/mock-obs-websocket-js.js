'use strict';

// Native
const EventEmitter = require('events');

// Packages
const clone = require('clone');
const sinon = require('sinon');

const SCENE_STUB = {
	name: 'sceneName',
	sources: [{
		name: 'foo-source',
		visible: true
	}]
};

class MockOBSWebsocketJS extends EventEmitter {
	constructor() {
		super();
		this.connect = sinon.stub();
		this.disconnect = sinon.stub();

		this.send = sinon.stub();
		this.send.withArgs('GetSceneList').resolves({scenes: [clone(SCENE_STUB)]});
		this.send.withArgs('GetCurrentScene').resolves(clone(SCENE_STUB));
		this.send.withArgs('GetPreviewScene').resolves(clone(SCENE_STUB));
		this.send.withArgs('GetStudioModeStatus').resolves({'studio-mode': true});
	}
}

module.exports = MockOBSWebsocketJS;
