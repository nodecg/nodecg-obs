'use strict';

const IS_NODE_MODULE = typeof module !== 'undefined';

// Native
const EventEmitter = require('events');

// Packages
let sinon;
if (IS_NODE_MODULE) {
	sinon = require('sinon');
}

class MockReplicant extends EventEmitter {
	constructor() {
		super();
		this.value = {};
	}
}

class MockNodeCGLogger {
	constructor() {
		this.trace = sinon.spy();
		this.debug = sinon.spy();
		this.info = sinon.spy();
		this.warn = sinon.spy();
		this.error = sinon.spy();
	}
}

class MockNodeCG extends EventEmitter {
	constructor() {
		super();
		this.sendMessage = typeof sinon === 'undefined' ? function () {} : sinon.stub();
		this.replicantsMap = new Map();
	}

	get Logger() {
		return MockNodeCGLogger;
	}

	Replicant(name) {
		if (this.replicantsMap.has(name)) {
			return this.replicantsMap.get(name);
		}

		const replicant = new MockReplicant();
		this.replicantsMap.set(name, replicant);

		if (name === '_obs:namespaces') {
			replicant.value = [];
		}

		return replicant;
	}

	listenFor(messageName, handler) {
		this.on(messageName, handler);
	}
}

if (IS_NODE_MODULE) {
	module.exports = MockNodeCG;
} else {
	window.MockNodeCG = MockNodeCG;
}
