'use strict';

// Native
const path = require('path');

// Packages
const copyfiles = require('copyfiles');
const del = require('del');
const fs = require('fs-extra');
const makeDir = require('make-dir');

const rootPath = path.resolve(__dirname, '..');
const nycOutputPath = path.join(rootPath, '.nyc_output');

// Delete existing copied coverage reports.
del.sync(nycOutputPath);
makeDir.sync(nycOutputPath);

// Copy the nodecg-obs-scene coverage report.
fs.copySync(
	path.join(rootPath, 'packages/nodecg-obs-scene/coverage/coverage-final.json'),
	path.join(nycOutputPath, 'nodecg-obs-scene.json')
);

// Copy the nodecg-widget-obs coverage report.
fs.copySync(
	path.join(rootPath, 'packages/nodecg-widget-obs/coverage/coverage-final.json'),
	path.join(nycOutputPath, 'nodecg-widget-obs.json')
);

// Copy any nyc coverage reports (which will all have unique names, unlike the previous reports).
copyfiles([
	path.join(rootPath, 'packages/*/.nyc_output/*.json'),
	nycOutputPath
], true, error => {
	if (error) {
		console.error(error);
		process.exit(1);
	}
});
