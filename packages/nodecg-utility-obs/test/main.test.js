'use strict';

// Packages
const mockery = require('mockery');
const sinon = require('sinon');
const test = require('ava');

// Mocks
const MockNodeCG = require('mock-nodecg');
const MockOBSWebsocketJS = require('./helpers/mocks/mock-obs-websocket-js');

mockery.registerMock('obs-websocket-js', MockOBSWebsocketJS);
mockery.enable({warnOnUnregistered: false});

// This library. Must be required after we register our mocks.
const OBS = require('../dist/index.js').OBSUtility;

test.beforeEach(t => {
	OBS._clearUsedNamespaces();
	t.context.nodecg = new MockNodeCG();
	t.context.obs = new OBS(t.context.nodecg);
});

test.afterEach(t => {
	// See http://sinonjs.org/#faking-time
	if (t.context.clock) {
		t.context.clock.restore();
		t.context.clock = undefined;
	}
});

test('namespace safety', t => {
	t.throws(() => {
		return new OBS(t.context.nodecg);
	}, /Please choose a different namespace/);
});

test.cb('obs:connect', t => {
	t.plan(4);

	sinon.stub(t.context.obs, '_connectToOBS').resolves();

	const callback = sinon.spy();
	t.context.nodecg.emit('obs:connect', {
		ip: 'localhost',
		port: 4444,
		password: 'foo'
	}, callback);

	setTimeout(() => {
		t.true(t.context.obs._connectToOBS.calledOnce);
		t.deepEqual(t.context.obs._connectToOBS.firstCall.args, []);
		t.true(callback.calledOnce);
		t.deepEqual(callback.firstCall.args, []);
		t.end();
	}, 0);
});

test.cb('obs:connect failure', t => {
	t.plan(2);

	sinon.stub(t.context.obs, '_connectToOBS').rejects({
		error: 'bad password'
	});

	const callback = sinon.spy();
	t.context.nodecg.emit('obs:connect', {}, callback);

	setTimeout(() => {
		t.true(callback.calledOnce);
		t.deepEqual(callback.firstCall.args, ['bad password']);
		t.end();
	}, 0);
});

test('obs:disconnect', t => {
	t.context.nodecg.emit('obs:disconnect');
	t.is(t.context.obs.replicants.websocket.value.status, 'disconnected');
	t.true(t.context.obs.disconnect.calledOnce);
	t.deepEqual(t.context.obs.disconnect.firstCall.args, []);
	t.true(t.context.obs.log.info.calledOnce);
	t.deepEqual(t.context.obs.log.info.firstCall.args, ['Operator-requested disconnect.']);
});

test.cb('obs:previewScene', t => {
	t.plan(2);

	// Tell our #send stub to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.nodecg.emit('obs:previewScene', 'foo-scene');

	setTimeout(() => {
		t.true(t.context.obs.send.calledOnce);
		t.deepEqual(t.context.obs.send.firstCall.args, ['SetPreviewScene', {'scene-name': 'foo-scene'}]);
		t.end();
	}, 0);
});

test.cb('obs:previewScene failure', t => {
	t.plan(5);

	// Tell our #send stub to return a promise that rejects.
	t.context.obs.send.rejects(new Error('error message'));

	t.context.nodecg.emit('obs:previewScene', 'foo-scene');

	setTimeout(() => {
		t.true(t.context.obs.send.calledOnce);
		t.deepEqual(t.context.obs.send.firstCall.args, ['SetPreviewScene', {'scene-name': 'foo-scene'}]);
		t.true(t.context.obs.log.error.calledOnce);
		t.is(t.context.obs.log.error.firstCall.args[0], 'Error setting preview scene:');
		t.is(t.context.obs.log.error.firstCall.args[1].message, 'error message');
		t.end();
	}, 0);
});

test.cb('obs:transition studio - without hook', t => {
	t.context.obs.replicants.studioMode.value = true;
	t.plan(4);

	// Tell our #send stub to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition');
	t.context.nodecg.emit('obs:transition', {name: 'transition-name', duration: 250});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.true(t.context.obs.send.calledTwice);
		t.deepEqual(t.context.obs.send.firstCall.args, ['TransitionToProgram', {'with-transition': {name: undefined, duration: undefined}}]);
		t.deepEqual(t.context.obs.send.secondCall.args, ['TransitionToProgram', {'with-transition': {name: 'transition-name', duration: 250}}]);
		t.end();
	}, 0);
});

test.cb('obs:transition studio - with sync hook', t => {
	t.context.obs.replicants.studioMode.value = true;
	t.plan(5);

	// Tell our #transitionToProgram stub to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.hooks.preTransition = sinon.stub();
	t.context.obs.hooks.preTransition.resolves({'with-transition': 'custom-transition'});

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition');
	t.context.nodecg.emit('obs:transition', {name: 'transition-name'});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.true(t.context.obs.hooks.preTransition.calledTwice);
		t.true(t.context.obs.send.calledTwice);
		t.deepEqual(t.context.obs.send.firstCall.args, ['TransitionToProgram', {'with-transition': 'custom-transition'}]);
		t.deepEqual(t.context.obs.send.secondCall.args, ['TransitionToProgram', {'with-transition': 'custom-transition'}]);
		t.end();
	}, 0);
});

test.cb('obs:transition studio - with async hook', t => {
	t.context.obs.replicants.studioMode.value = true;
	t.plan(5);

	// Tell our #send stub to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.hooks.preTransition = sinon.stub();
	t.context.obs.hooks.preTransition.returns({'with-transition': 'custom-transition'});

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition');
	t.context.nodecg.emit('obs:transition', {name: 'transition-name'});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.true(t.context.obs.hooks.preTransition.calledTwice);
		t.true(t.context.obs.send.calledTwice);
		t.deepEqual(t.context.obs.send.firstCall.args, ['TransitionToProgram', {'with-transition': 'custom-transition'}]);
		t.deepEqual(t.context.obs.send.secondCall.args, ['TransitionToProgram', {'with-transition': 'custom-transition'}]);
		t.end();
	}, 0);
});

test.cb('obs:transition studio - with sceneName', t => {
	t.context.obs.replicants.studioMode.value = true;
	t.plan(4);

	// Tell our stubs to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition', {name: 'transition-name', duration: 250, sceneName: 'Foo Scene'});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.true(t.context.obs.send.calledTwice);
		t.deepEqual(t.context.obs.send.firstCall.args, ['SetPreviewScene', {'scene-name': 'Foo Scene'}]);
		t.deepEqual(t.context.obs.send.secondCall.args, ['TransitionToProgram', {'with-transition': {name: 'transition-name', duration: 250}}]);
		t.end();
	}, 0);
});

test.cb('obs:transition non-studio - with sceneName', t => {
	t.context.obs.replicants.studioMode.value = false;

	// Tell our stubs to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition', { sceneName: 'Foo Scene'});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.deepEqual(t.context.obs.send.firstCall.args, ['SetCurrentScene', {'scene-name': 'Foo Scene'}]);
		t.end()
	});
});

test.cb('obs:transition non-studio - changes transition', t => {
	t.context.obs.replicants.studioMode.value = false;

	// Tell our stubs to return a promise that resolves.
	t.context.obs.send.resolves();

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition', {name: 'transition-name', duration: 250, sceneName: 'Foo Scene'});

	setTimeout(() => {
		t.true(t.context.obs.replicants.transitioning.value);
		t.true(t.context.obs.send.calledThrice);
		t.deepEqual(t.context.obs.send.firstCall.args, ['SetCurrentTransition', {'transition-name': 'transition-name'}]);
		t.deepEqual(t.context.obs.send.secondCall.args, ['SetTransitionDuration', {duration: 250}]);
		t.deepEqual(t.context.obs.send.thirdCall.args, ['SetCurrentScene', {'scene-name': 'Foo Scene'}]);
		t.end()
	});
});

test.cb('obs:transition failure', t => {
	t.plan(4);

	// Tell our #send stub to return a promise that rejects.
	t.context.obs.send.rejects(new Error('error message'));

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.nodecg.emit('obs:transition', {name: 'Foo Transition', duration: 252});

	setTimeout(() => {
		t.true(t.context.obs.send.calledOnce);
		t.true(t.context.obs.log.error.calledOnce);
		t.is(t.context.obs.log.error.firstCall.args[0], 'Error transitioning:');
		t.is(t.context.obs.log.error.firstCall.args[1].message, 'error message');
		t.end();
	}, 0);
});

test('reconnection', t => {
	// See http://sinonjs.org/#faking-time
	const clock = sinon.useFakeTimers();
	t.context.clock = clock;

	sinon.stub(t.context.obs, '_connectToOBS');
	t.context.obs._connectToOBS.resolves();

	t.context.obs.emit('ConnectionClosed');
	clock.tick(1000);
	t.context.obs.emit('ConnectionClosed');
	clock.tick(4000);

	t.is(t.context.obs.replicants.websocket.value.status, 'connecting');
	t.true(t.context.obs.log.warn.calledOnce);
	t.deepEqual(t.context.obs.log.warn.firstCall.args,
		['Connection closed, will attempt to reconnect every 5 seconds.']);
	t.true(t.context.obs._connectToOBS.calledOnce);
});

test.cb('detects when websocketConfig.status disagrees with _connected', t => {
	// We can't use fake timers in this test because the interval
	// was created before this test started.

	t.plan(3);
	sinon.stub(t.context.obs, '_reconnectToOBS');

	t.context.obs.replicants.websocket.value.status = 'connected';
	t.context.obs._connected = false;

	setTimeout(() => {
		try {
			t.true(t.context.obs._reconnectToOBS.calledOnce);
			t.true(t.context.obs.log.warn.calledOnce);
			t.deepEqual(t.context.obs.log.warn.firstCall.args, [
				'Thought we were connected, but the automatic poll detected we were not. Correcting.'
			]);
		} catch (e) {
			t.fail(e);
		}

		t.end();
	}, 1000);
});

test.cb('doesn\'t attempt to reconnect if the disconnect was intentional', t => {
	t.plan(1);
	t.context.nodecg.emit('obs:disconnect');
	t.context.obs.emit('ConnectionClosed');
	setTimeout(() => {
		t.is(t.context.obs.replicants.websocket.value.status, 'disconnected');
		t.end();
	}, 0);
});

test('on SwitchScenes', t => {
	sinon.stub(t.context.obs, '_updatePreviewScene');
	sinon.stub(t.context.obs, '_updateProgramScene');

	t.context.obs.emit('SwitchScenes');

	t.is(t.context.obs.replicants.transitioning.value, false);
	t.true(t.context.obs._updatePreviewScene.calledOnce);
	t.true(t.context.obs._updateProgramScene.calledOnce);
});

test('on ScenesChanged', t => {
	sinon.stub(t.context.obs, '_updateScenesList');
	t.context.obs.emit('ScenesChanged');
	t.true(t.context.obs._updateScenesList.calledOnce);
});

test('on PreviewSceneChanged', t => {
	sinon.stub(t.context.obs, '_updatePreviewScene');
	sinon.stub(t.context.obs, '_updateProgramScene');

	const data = {
		sceneName: 'foo-scene',
		sources: [{
			name: 'foo-source',
			visible: true
		}]
	};

	t.context.obs.emit('PreviewSceneChanged', data);

	t.deepEqual(t.context.obs.replicants.previewScene.value, {
		name: data['scene-name'],
		sources: data.sources
	});
});

test('on TransitionBegin', t => {
	t.context.obs.replicants.previewScene.value = {name: 'to-scene'};
	t.context.obs.replicants.programScene.value = {name: 'from-scene'};

	t.context.obs.emit('TransitionBegin', {name: 'Transiton Name', duration: 500});

	t.is(t.context.obs.replicants.transitioning.value, true);
	t.true(t.context.nodecg.sendMessage.calledOnce);
	t.deepEqual(t.context.nodecg.sendMessage.firstCall.args, [
		'obs:transitioning',
		{
			sceneName: 'to-scene',
			toScene: 'to-scene',
			fromScene: 'from-scene',
			name: 'Transiton Name',
			duration: 500
		}
	]);
});

test('on TransitionBegin when not in Studio mode', t => {
	sinon.stub(t.context.obs, '_updateScenesList');
	t.context.obs.emit('ScenesChanged');
	t.true(t.context.obs._updateScenesList.calledOnce);
});

test('on StudioModeSwitched', t => {
	t.context.obs.emit('StudioModeSwitched', {'new-state': false});
	t.is(t.context.obs.replicants.studioMode.value, false);
	t.context.obs.emit('StudioModeSwitched', {'new-state': true});
	t.is(t.context.obs.replicants.studioMode.value, true);
});

test('#_connectToOBS', async t => {
	sinon.stub(t.context.obs, '_fullUpdate').resolves();

	// Tell our #connect stub to return a promise that resolves.
	t.context.obs.connect.resolves();

	t.context.obs.replicants.websocket.value = {
		ip: 'localhost',
		port: 4444,
		password: 'foo'
	};

	await t.context.obs._connectToOBS();

	t.true(t.context.obs.connect.calledOnce);
	t.deepEqual(t.context.obs.connect.firstCall.args, [{
		address: 'localhost:4444',
		password: 'foo'
	}]);
	t.true(t.context.obs.log.info.calledOnce);
	t.deepEqual(t.context.obs.log.info.firstCall.args, ['Connected.']);
	t.is(t.context.obs.replicants.websocket.value.status, 'connected');
	t.true(t.context.obs._fullUpdate.calledOnce);

	t.throws(() => {
		return t.context.obs._connectToOBS();
	}, 'Attempted to connect to OBS while already connected!');
});

test('#_fullUpdate', async t => {
	sinon.stub(t.context.obs, '_updateScenesList').resolves();
	sinon.stub(t.context.obs, '_updateProgramScene').resolves();
	sinon.stub(t.context.obs, '_updatePreviewScene').resolves();

	await t.context.obs._fullUpdate();

	t.true(t.context.obs._updateScenesList.calledOnce);
	t.true(t.context.obs._updateProgramScene.calledOnce);
	t.true(t.context.obs._updatePreviewScene.calledOnce);
});

test('#_updateScenesList', async t => {
	await t.context.obs._updateScenesList();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetSceneList');
	t.deepEqual(t.context.obs.replicants.sceneList.value, ['sceneName']);

	t.context.obs.send.reset();
	t.context.obs.send.rejects(new Error('boom'));

	await t.context.obs._updateScenesList();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetSceneList');
	t.true(t.context.obs.log.error.calledOnce);
	t.deepEqual(t.context.obs.log.error.firstCall.args[0], 'Error updating scenes list:');
	t.deepEqual(t.context.obs.log.error.firstCall.args[1].message, 'boom');
});

test('#_updateProgramScene', async t => {
	await t.context.obs._updateProgramScene();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetCurrentScene');
	t.deepEqual(t.context.obs.replicants.programScene.value, {
		name: 'sceneName',
		sources: [{
			name: 'foo-source',
			visible: true
		}]
	});

	t.context.obs.send.reset();
	t.context.obs.send.rejects(new Error('boom'));

	await t.context.obs._updateProgramScene();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetCurrentScene');
	t.true(t.context.obs.log.error.calledOnce);
	t.deepEqual(t.context.obs.log.error.firstCall.args[0], 'Error updating program scene:');
	t.deepEqual(t.context.obs.log.error.firstCall.args[1].message, 'boom');
});

test('#_updatePreviewScene', async t => {
	await t.context.obs._updatePreviewScene();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetPreviewScene');
	t.deepEqual(t.context.obs.replicants.previewScene.value, {
		name: 'sceneName',
		sources: [{
			name: 'foo-source',
			visible: true
		}]
	});

	t.context.obs.send.reset();
	t.context.obs.send.rejects(new Error('boom'));

	await t.context.obs._updatePreviewScene();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetPreviewScene');
	t.true(t.context.obs.log.error.calledOnce);
	t.deepEqual(t.context.obs.log.error.firstCall.args[0], 'Error updating preview scene:');
	t.deepEqual(t.context.obs.log.error.firstCall.args[1].message, 'boom');
});

test('#_updatePreviewScene sets previewScene replicant to null when not in studio mode', async t => {
	// Tell our #send stub to return a promise that rejects.
	t.context.obs.send.withArgs('GetPreviewScene').rejects({error: 'studio mode not enabled'});

	await t.context.obs._updatePreviewScene();

	t.true(t.context.obs.send.calledOnce);
	t.is(t.context.obs.replicants.previewScene.value, null);
});

test('#_updateStudioMode', async t => {
	await t.context.obs._updateStudioMode();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetStudioModeStatus');
	t.deepEqual(t.context.obs.replicants.studioMode.value, true);

	t.context.obs.send.reset();
	t.context.obs.send.rejects(new Error('boom'));

	await t.context.obs._updateStudioMode();
	t.true(t.context.obs.send.calledOnce);
	t.deepEqual(t.context.obs.send.firstCall.args[0], 'GetStudioModeStatus');
	t.true(t.context.obs.log.error.calledOnce);
	t.deepEqual(t.context.obs.log.error.firstCall.args[0], 'Error getting studio mode status:');
	t.deepEqual(t.context.obs.log.error.firstCall.args[1].message, 'boom');
});

test('#_transition throws when not connected to OBS', t => { // eslint-disable-line ava/prefer-async-await
	t.plan(1);

	return t.context.obs._transition().then(() => {
		t.fail();
	}).catch(err => {
		t.is(err.message, 'Can\'t transition when not connected to OBS');
	});
});

test('restores connection on startup if appropriate', t => {
	sinon.stub(t.context.obs, '_connectToOBS').resolves();

	// Emit twice so we can check that _connectToOBS is for sure only called once
	t.context.obs.replicants.websocket.emit('change', {status: 'connected'});
	t.context.obs.replicants.websocket.emit('change', {status: 'connected'});

	t.true(t.context.obs._connectToOBS.calledOnce);
});

test.cb('error handling of startup connection restoration', t => {
	t.plan(2);
	sinon.stub(t.context.obs, '_connectToOBS').rejects(new Error('boom'));

	// Emit twice so we can check that _connectToOBS is for sure only called once
	t.context.obs.replicants.websocket.emit('change', {status: 'connected'});
	t.context.obs.replicants.websocket.emit('change', {status: 'connected'});

	setTimeout(() => {
		t.true(t.context.obs._connectToOBS.calledOnce);
		t.is(t.context.obs.replicants.websocket.value.status, 'error');
		t.end();
	}, 0);
});

test.cb('does nothing on startup if there\'s no connection to restore', t => {
	t.plan(2);
	sinon.stub(t.context.obs, '_connectToOBS').rejects(new Error('boom'));
	t.context.obs.replicants.websocket.value.status = 'disconnected';

	// Emit twice so we can check that _connectToOBS is for sure only called once
	t.context.obs.replicants.websocket.emit('change', {status: 'disconnected'});
	t.context.obs.replicants.websocket.emit('change', {status: 'disconnected'});

	setTimeout(() => {
		t.false(t.context.obs._connectToOBS.calledOnce);
		t.is(t.context.obs.replicants.websocket.value.status, 'disconnected');
		t.end();
	}, 0);
});
