// Courtesy of @Hoishin: https://github.com/nodecg/nodecg/pull/432#issuecomment-413478698
'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const {compileFromFile} = require('json-schema-to-typescript');
const appRoot = require('app-root-path');

const writeFilePromise = util.promisify(fs.writeFile);

const outDir = appRoot.resolve('src/types/schemas');
const schemasDir = appRoot.resolve('schemas');
const schemas = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));

const style = {
	singleQuote: true,
	useTabs: true
};

const compile = (input, output, cwd = appRoot.path) =>
	compileFromFile(input, {
		cwd,
		declareExternallyReferenced: true,
		enableConstEnums: true,
		style
	})
		.then(ts => writeFilePromise(output, ts))
		.then(() => {
			console.log(output);
		})
		.catch(err => {
			console.error(err);
		});

for (const schema of schemas) {
	compile(
		path.resolve(schemasDir, schema),
		path.resolve(outDir, schema.replace(/\.json$/i, '.d.ts')),
		schemasDir
	);
}
