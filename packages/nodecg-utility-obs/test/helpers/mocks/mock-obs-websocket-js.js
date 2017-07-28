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
		this.setPreviewScene = sinon.stub();
		this.transitionToProgram = sinon.stub();
		this.getSceneList = sinon.stub().resolves({scenes: [clone(SCENE_STUB)]});
		this.getCurrentScene = sinon.stub().resolves(clone(SCENE_STUB));
		this.getPreviewScene = sinon.stub().resolves(clone(SCENE_STUB));
		this.getStudioModeStatus = sinon.stub().resolves({studioMode: true});
	}
}

module.exports = MockOBSWebsocketJS;
