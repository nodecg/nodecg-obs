# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.4](https://github.com/nodecg/nodecg-obs/compare/v5.0.3...v5.0.4) (2018-12-18)


### Bug Fixes

* **nodecg-utility-obs:** fix error on startup ([5bba2a0](https://github.com/nodecg/nodecg-obs/commit/5bba2a0))





## [5.0.3](https://github.com/nodecg/nodecg-obs/compare/v5.0.2...v5.0.3) (2018-12-09)

**Note:** Version bump only for package nodecg-utility-obs





# Change Log

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.2"></a>
## 5.0.2 (2018-12-09)


### Bug Fixes

* **nodecg-utility-obs:** expose websocket status enum type ([f2e5dd0](https://github.com/nodecg/nodecg-obs/commit/f2e5dd0))



<a name="5.0.1"></a>
## 5.0.1 (2018-12-07)


### Bug Fixes

* **nodecg-utility-obs:** make obs-websocket-js-types a prodDep ([8a0b6b4](https://github.com/nodecg/nodecg-obs/commit/8a0b6b4))



<a name="5.0.0"></a>
# 5.0.0 (2018-12-07)



<a name="4.4.0"></a>
# 4.4.0 (2018-06-05)


### Features

* **nodecg-utility-obs:** forward all data from TransitionBegin event ([cf1563d](https://github.com/nodecg/nodecg-obs/commit/cf1563d))



<a name="4.3.1"></a>
## 4.3.1 (2018-06-01)


### Bug Fixes

* **nodecg-utility-obs:** add callback handlers for message listeners which were missing them ([5325755](https://github.com/nodecg/nodecg-obs/commit/5325755))



<a name="4.3.0"></a>
# 4.3.0 (2018-06-01)


### Features

* **nodecg-utility-obs:** add optional `sceneName` param to receivable `obs:transition` event ([eb91083](https://github.com/nodecg/nodecg-obs/commit/eb91083))



<a name="4.2.0"></a>
# 4.2.0 (2018-05-24)


### Features

* **nodecg-utility-obs:** add `toScene` and `fromScene` properties to the `obs:transitioning` event ([41fa986](https://github.com/nodecg/nodecg-obs/commit/41fa986))



<a name="4.1.2"></a>
## 4.1.2 (2017-10-18)


### Bug Fixes

* **nodecg-utility-obs:** avoid getting stuck in the "transitioning" state when a transition fails ([158149d](https://github.com/nodecg/nodecg-obs/commit/158149d))



<a name="4.1.1"></a>
## 4.1.1 (2017-10-17)


### Bug Fixes

* **nodecg-utility-obs:** improve logging of transition errors to include name and duration when modified by a hook ([d6d7d8d](https://github.com/nodecg/nodecg-obs/commit/d6d7d8d))



<a name="4.1.0"></a>
# 4.1.0 (2017-10-17)


### Features

* **nodecg-utility-obs:** include the name and duration of the transition when logging a transition error ([6f4a963](https://github.com/nodecg/nodecg-obs/commit/6f4a963))



<a name="4.0.2"></a>
## 4.0.2 (2017-10-16)


### Bug Fixes

* **nodecg-utility-obs:** set `transitioning` to true before invoking a transition ([391648f](https://github.com/nodecg/nodecg-obs/commit/391648f))



<a name="4.0.1"></a>
## 4.0.1 (2017-10-12)


### Bug Fixes

* **nodecg-utility-obs:** revert obs-websocket-js to 0.7.0 ([d8ba6be](https://github.com/nodecg/nodecg-obs/commit/d8ba6be))



<a name="4.0.0"></a>
# 4.0.0 (2017-10-12)


### Features

* **nodecg-utility-obs:** allow specifying a duration in the obs:transition message ([c744088](https://github.com/nodecg/nodecg-obs/commit/c744088))
* **nodecg-utility-obs:** update obs-websocket-js to v0.9.0 ([8ef4b49](https://github.com/nodecg/nodecg-obs/commit/8ef4b49))


### BREAKING CHANGES

* **nodecg-utility-obs:** Changed the argument to the `obs:transition` message to be an object with `name` and `duration` properties, instead of being just a string which specified the transition name.



<a name="3.2.2"></a>
## 3.2.2 (2017-09-01)


### Bug Fixes

* ensure port is a number before trying to connect ([af589f2](https://github.com/nodecg/nodecg-obs/commit/af589f2))



<a name="3.1.3"></a>
## 3.1.3 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix cases where reconnect would never start ([33ecb13](https://github.com/nodecg/nodecg-obs/commit/33ecb13))



<a name="3.1.2"></a>
## 3.1.2 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix the previous commit not actually doing anything except logspam ([5ed2125](https://github.com/nodecg/nodecg-obs/commit/5ed2125))



<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="5.0.1"></a>
## 5.0.1 (2018-12-07)


### Bug Fixes

* **nodecg-utility-obs:** make obs-websocket-js-types a prodDep ([8a0b6b4](https://github.com/nodecg/nodecg-obs/commit/8a0b6b4))



<a name="5.0.0"></a>
# 5.0.0 (2018-12-07)



<a name="4.4.0"></a>
# 4.4.0 (2018-06-05)


### Features

* **nodecg-utility-obs:** forward all data from TransitionBegin event ([cf1563d](https://github.com/nodecg/nodecg-obs/commit/cf1563d))



<a name="4.3.1"></a>
## 4.3.1 (2018-06-01)


### Bug Fixes

* **nodecg-utility-obs:** add callback handlers for message listeners which were missing them ([5325755](https://github.com/nodecg/nodecg-obs/commit/5325755))



<a name="4.3.0"></a>
# 4.3.0 (2018-06-01)


### Features

* **nodecg-utility-obs:** add optional `sceneName` param to receivable `obs:transition` event ([eb91083](https://github.com/nodecg/nodecg-obs/commit/eb91083))



<a name="4.2.0"></a>
# 4.2.0 (2018-05-24)


### Features

* **nodecg-utility-obs:** add `toScene` and `fromScene` properties to the `obs:transitioning` event ([41fa986](https://github.com/nodecg/nodecg-obs/commit/41fa986))



<a name="4.1.2"></a>
## 4.1.2 (2017-10-18)


### Bug Fixes

* **nodecg-utility-obs:** avoid getting stuck in the "transitioning" state when a transition fails ([158149d](https://github.com/nodecg/nodecg-obs/commit/158149d))



<a name="4.1.1"></a>
## 4.1.1 (2017-10-17)


### Bug Fixes

* **nodecg-utility-obs:** improve logging of transition errors to include name and duration when modified by a hook ([d6d7d8d](https://github.com/nodecg/nodecg-obs/commit/d6d7d8d))



<a name="4.1.0"></a>
# 4.1.0 (2017-10-17)


### Features

* **nodecg-utility-obs:** include the name and duration of the transition when logging a transition error ([6f4a963](https://github.com/nodecg/nodecg-obs/commit/6f4a963))



<a name="4.0.2"></a>
## 4.0.2 (2017-10-16)


### Bug Fixes

* **nodecg-utility-obs:** set `transitioning` to true before invoking a transition ([391648f](https://github.com/nodecg/nodecg-obs/commit/391648f))



<a name="4.0.1"></a>
## 4.0.1 (2017-10-12)


### Bug Fixes

* **nodecg-utility-obs:** revert obs-websocket-js to 0.7.0 ([d8ba6be](https://github.com/nodecg/nodecg-obs/commit/d8ba6be))



<a name="4.0.0"></a>
# 4.0.0 (2017-10-12)


### Features

* **nodecg-utility-obs:** allow specifying a duration in the obs:transition message ([c744088](https://github.com/nodecg/nodecg-obs/commit/c744088))
* **nodecg-utility-obs:** update obs-websocket-js to v0.9.0 ([8ef4b49](https://github.com/nodecg/nodecg-obs/commit/8ef4b49))


### BREAKING CHANGES

* **nodecg-utility-obs:** Changed the argument to the `obs:transition` message to be an object with `name` and `duration` properties, instead of being just a string which specified the transition name.



<a name="3.2.2"></a>
## 3.2.2 (2017-09-01)


### Bug Fixes

* ensure port is a number before trying to connect ([af589f2](https://github.com/nodecg/nodecg-obs/commit/af589f2))



<a name="3.1.3"></a>
## 3.1.3 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix cases where reconnect would never start ([33ecb13](https://github.com/nodecg/nodecg-obs/commit/33ecb13))



<a name="3.1.2"></a>
## 3.1.2 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix the previous commit not actually doing anything except logspam ([5ed2125](https://github.com/nodecg/nodecg-obs/commit/5ed2125))



<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="5.0.0"></a>
# 5.0.0 (2018-12-07)



<a name="4.4.0"></a>
# 4.4.0 (2018-06-05)


### Features

* **nodecg-utility-obs:** forward all data from TransitionBegin event ([cf1563d](https://github.com/nodecg/nodecg-obs/commit/cf1563d))



<a name="4.3.1"></a>
## 4.3.1 (2018-06-01)


### Bug Fixes

* **nodecg-utility-obs:** add callback handlers for message listeners which were missing them ([5325755](https://github.com/nodecg/nodecg-obs/commit/5325755))



<a name="4.3.0"></a>
# 4.3.0 (2018-06-01)


### Features

* **nodecg-utility-obs:** add optional `sceneName` param to receivable `obs:transition` event ([eb91083](https://github.com/nodecg/nodecg-obs/commit/eb91083))



<a name="4.2.0"></a>
# 4.2.0 (2018-05-24)


### Features

* **nodecg-utility-obs:** add `toScene` and `fromScene` properties to the `obs:transitioning` event ([41fa986](https://github.com/nodecg/nodecg-obs/commit/41fa986))



<a name="4.1.2"></a>
## 4.1.2 (2017-10-18)


### Bug Fixes

* **nodecg-utility-obs:** avoid getting stuck in the "transitioning" state when a transition fails ([158149d](https://github.com/nodecg/nodecg-obs/commit/158149d))



<a name="4.1.1"></a>
## 4.1.1 (2017-10-17)


### Bug Fixes

* **nodecg-utility-obs:** improve logging of transition errors to include name and duration when modified by a hook ([d6d7d8d](https://github.com/nodecg/nodecg-obs/commit/d6d7d8d))



<a name="4.1.0"></a>
# 4.1.0 (2017-10-17)


### Features

* **nodecg-utility-obs:** include the name and duration of the transition when logging a transition error ([6f4a963](https://github.com/nodecg/nodecg-obs/commit/6f4a963))



<a name="4.0.2"></a>
## 4.0.2 (2017-10-16)


### Bug Fixes

* **nodecg-utility-obs:** set `transitioning` to true before invoking a transition ([391648f](https://github.com/nodecg/nodecg-obs/commit/391648f))



<a name="4.0.1"></a>
## 4.0.1 (2017-10-12)


### Bug Fixes

* **nodecg-utility-obs:** revert obs-websocket-js to 0.7.0 ([d8ba6be](https://github.com/nodecg/nodecg-obs/commit/d8ba6be))



<a name="4.0.0"></a>
# 4.0.0 (2017-10-12)


### Features

* **nodecg-utility-obs:** allow specifying a duration in the obs:transition message ([c744088](https://github.com/nodecg/nodecg-obs/commit/c744088))
* **nodecg-utility-obs:** update obs-websocket-js to v0.9.0 ([8ef4b49](https://github.com/nodecg/nodecg-obs/commit/8ef4b49))


### BREAKING CHANGES

* **nodecg-utility-obs:** Changed the argument to the `obs:transition` message to be an object with `name` and `duration` properties, instead of being just a string which specified the transition name.



<a name="3.2.2"></a>
## 3.2.2 (2017-09-01)


### Bug Fixes

* ensure port is a number before trying to connect ([af589f2](https://github.com/nodecg/nodecg-obs/commit/af589f2))



<a name="3.1.3"></a>
## 3.1.3 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix cases where reconnect would never start ([33ecb13](https://github.com/nodecg/nodecg-obs/commit/33ecb13))



<a name="3.1.2"></a>
## 3.1.2 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix the previous commit not actually doing anything except logspam ([5ed2125](https://github.com/nodecg/nodecg-obs/commit/5ed2125))



<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="4.4.0"></a>
# [4.4.0](https://github.com/nodecg/nodecg-obs/compare/v4.3.1...v4.4.0) (2018-06-05)


### Features

* **nodecg-utility-obs:** forward all data from TransitionBegin event ([cf1563d](https://github.com/nodecg/nodecg-obs/commit/cf1563d))




<a name="4.3.1"></a>
## [4.3.1](https://github.com/nodecg/nodecg-obs/compare/v4.3.0...v4.3.1) (2018-06-01)


### Bug Fixes

* **nodecg-utility-obs:** add callback handlers for message listeners which were missing them ([5325755](https://github.com/nodecg/nodecg-obs/commit/5325755))




<a name="4.3.0"></a>
# [4.3.0](https://github.com/nodecg/nodecg-obs/compare/v4.2.0...v4.3.0) (2018-06-01)


### Features

* **nodecg-utility-obs:** add optional `sceneName` param to receivable `obs:transition` event ([eb91083](https://github.com/nodecg/nodecg-obs/commit/eb91083))




<a name="4.2.0"></a>
# [4.2.0](https://github.com/nodecg/nodecg-obs/compare/v4.1.2...v4.2.0) (2018-05-24)


### Features

* **nodecg-utility-obs:** add `toScene` and `fromScene` properties to the `obs:transitioning` event ([41fa986](https://github.com/nodecg/nodecg-obs/commit/41fa986))




<a name="4.1.2"></a>
## [4.1.2](https://github.com/nodecg/nodecg-obs/compare/v4.1.1...v4.1.2) (2017-10-18)


### Bug Fixes

* **nodecg-utility-obs:** avoid getting stuck in the "transitioning" state when a transition fails ([158149d](https://github.com/nodecg/nodecg-obs/commit/158149d))




<a name="4.1.1"></a>
## [4.1.1](https://github.com/nodecg/nodecg-obs/compare/v4.1.0...v4.1.1) (2017-10-17)


### Bug Fixes

* **nodecg-utility-obs:** improve logging of transition errors to include name and duration when modified by a hook ([d6d7d8d](https://github.com/nodecg/nodecg-obs/commit/d6d7d8d))




<a name="4.1.0"></a>
# [4.1.0](https://github.com/nodecg/nodecg-obs/compare/v4.0.2...v4.1.0) (2017-10-17)


### Features

* **nodecg-utility-obs:** include the name and duration of the transition when logging a transition error ([6f4a963](https://github.com/nodecg/nodecg-obs/commit/6f4a963))




<a name="4.0.2"></a>
## [4.0.2](https://github.com/nodecg/nodecg-obs/compare/v4.0.1...v4.0.2) (2017-10-16)


### Bug Fixes

* **nodecg-utility-obs:** set `transitioning` to true before invoking a transition ([391648f](https://github.com/nodecg/nodecg-obs/commit/391648f))




<a name="4.0.1"></a>
## [4.0.1](https://github.com/nodecg/nodecg-obs/compare/v4.0.0...v4.0.1) (2017-10-12)


### Bug Fixes

* **nodecg-utility-obs:** revert obs-websocket-js to 0.7.0 ([d8ba6be](https://github.com/nodecg/nodecg-obs/commit/d8ba6be))




<a name="4.0.0"></a>
# [4.0.0](https://github.com/nodecg/nodecg-obs/compare/v3.2.2...v4.0.0) (2017-10-12)


### Features

* **nodecg-utility-obs:** allow specifying a duration in the obs:transition message ([c744088](https://github.com/nodecg/nodecg-obs/commit/c744088))
* **nodecg-utility-obs:** update obs-websocket-js to v0.9.0 ([8ef4b49](https://github.com/nodecg/nodecg-obs/commit/8ef4b49))


### BREAKING CHANGES

* **nodecg-utility-obs:** Changed the argument to the `obs:transition` message to be an object with `name` and `duration` properties, instead of being just a string which specified the transition name.




<a name="3.1.3"></a>
## 3.1.3 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix cases where reconnect would never start ([33ecb13](https://github.com/nodecg/nodecg-obs/commit/33ecb13))



<a name="3.1.2"></a>
## 3.1.2 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix the previous commit not actually doing anything except logspam ([5ed2125](https://github.com/nodecg/nodecg-obs/commit/5ed2125))



<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.1.2"></a>
## 3.1.2 (2017-08-05)


### Bug Fixes

* **nodecg-utility-obs:** fix the previous commit not actually doing anything except logspam ([5ed2125](https://github.com/nodecg/nodecg-obs/commit/5ed2125))



<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.1.1"></a>
## 3.1.1 (2017-08-04)


### Bug Fixes

* **nodecg-utility-obs:** detect rare cases where a disconnect happens but no ConnectionClosed event is emitted ([2f69dec](https://github.com/nodecg/nodecg-obs/commit/2f69dec))



<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.1.0"></a>
# 3.1.0 (2017-07-28)


### Features

* **nodecg-utility-obs:** add studioMode boolean replicant ([cc69522](https://github.com/nodecg/nodecg-obs/commit/cc69522))



<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.0.2"></a>
## 3.0.2 (2017-06-21)


### Bug Fixes

* **nodecg-utility-obs:** fix validation error when previewScene is null ([0f30046](https://github.com/nodecg/nodecg-obs/commit/0f30046))



<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.0.1"></a>
## 3.0.1 (2017-06-20)


### Bug Fixes

* **nodecg-utility-obs:** don't throw when a scene transition begins while not in studio mode ([cfa9b84](https://github.com/nodecg/nodecg-obs/commit/cfa9b84))



<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="3.0.0"></a>
# 3.0.0 (2017-06-17)


### Bug Fixes

* **replicants:** set the previewScene replicant value to null when not in studio mode, instead of erroring ([ef2176f](https://github.com/nodecg/nodecg-obs/commit/ef2176f))


### BREAKING CHANGES

* **replicants:** _getPreviewScene will no longer reject when OBS is not in studio mode. It will instead set the previewScene replicant's `value` to `null`.



<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)




<a name="2.0.4"></a>
## 2.0.4 (2017-06-01)


### Bug Fixes

* **replicants:** use "null" as the default value for the previewScene and programScene replicants ([f86527e](https://github.com/nodecg/nodecg-obs/commit/f86527e))



<a name="2.0.3"></a>
## 2.0.3 (2017-06-01)



<a name="2.0.1"></a>
## 2.0.1 (2017-05-31)


### Bug Fixes

* **package:** include schemas in nodecg-utility-obs npm tarball ([50ad33f](https://github.com/nodecg/nodecg-obs/commit/50ad33f))



<a name="2.0.0"></a>
# 2.0.0 (2017-05-31)
