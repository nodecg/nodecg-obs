# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.4](https://github.com/nodecg/nodecg-obs/compare/v6.1.3...v6.1.4) (2020-02-06)


### Bug Fixes

* **nodecg-utility-obs:** prevent multiple sockets from being opened at once ([46a7889](https://github.com/nodecg/nodecg-obs/commit/46a7889))





## [6.1.3](https://github.com/nodecg/nodecg-obs/compare/v6.1.2...v6.1.3) (2020-01-27)


### Bug Fixes

* obs-websocket-js import ([#12](https://github.com/nodecg/nodecg-obs/issues/12)) ([12dcb5a](https://github.com/nodecg/nodecg-obs/commit/12dcb5a))





## [6.1.2](https://github.com/nodecg/nodecg-obs/compare/v6.1.1...v6.1.2) (2019-06-17)


### Bug Fixes

* **schemas:** add missing props to obs_source schema ([fdb0ccd](https://github.com/nodecg/nodecg-obs/commit/fdb0ccd))





## [6.1.1](https://github.com/nodecg/nodecg-obs/compare/v6.1.0...v6.1.1) (2019-06-17)


### Bug Fixes

* **nodecg-utility-obs:** compensate for obs-websocket bug ([9e8ca41](https://github.com/nodecg/nodecg-obs/commit/9e8ca41))





# [6.1.0](https://github.com/nodecg/nodecg-obs/compare/v6.0.0...v6.1.0) (2019-06-17)


### Features

* **api:** support transition outside of studio mode ([#7](https://github.com/nodecg/nodecg-obs/issues/7)) ([fc128e4](https://github.com/nodecg/nodecg-obs/commit/fc128e4))
* **nodecg-utility-obs:** update obs-websocket-js ([d05f015](https://github.com/nodecg/nodecg-obs/commit/d05f015))





# [6.0.0](https://github.com/nodecg/nodecg-obs/compare/v5.0.6...v6.0.0) (2019-04-02)


### chore

* **package:** update obs-websocket-js ([cd98e83](https://github.com/nodecg/nodecg-obs/commit/cd98e83))


### BREAKING CHANGES

* **package:** Updated obs-websocket-js to v3. See https://github.com/haganbmj/obs-websocket-js#upgrading-from-2x-to-3x for migration steps.





## [5.0.6](https://github.com/nodecg/nodecg-obs/compare/v5.0.5...v5.0.6) (2019-01-12)


### Bug Fixes

* **nodecg-utility-obs:** log socket errors, and reconnect when they occur ([a515867](https://github.com/nodecg/nodecg-obs/commit/a515867))





## [5.0.5](https://github.com/nodecg/nodecg-obs/compare/v5.0.4...v5.0.5) (2018-12-18)


### Bug Fixes

* **nodecg-utility-obs:** make types work ([8e6c5b3](https://github.com/nodecg/nodecg-obs/commit/8e6c5b3))





## [5.0.4](https://github.com/nodecg/nodecg-obs/compare/v5.0.3...v5.0.4) (2018-12-18)


### Bug Fixes

* **nodecg-utility-obs:** fix error on startup ([5bba2a0](https://github.com/nodecg/nodecg-obs/commit/5bba2a0))





## [5.0.3](https://github.com/nodecg/nodecg-obs/compare/v5.0.2...v5.0.3) (2018-12-09)

**Note:** Version bump only for package nodecg-obs





<a name="4.5.0"></a>
# [4.5.0](https://github.com/nodecg/nodecg-obs/compare/v4.4.0...v4.5.0) (2018-06-17)


### Features

* **nodecg-widget-obs:** show names in tabs ([9116953](https://github.com/nodecg/nodecg-obs/commit/9116953))




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
