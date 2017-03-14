const path = require('path');
const loadJsonFile = require('load-json-file').sync;
const exists = require('path-exists').sync;
const isCore = require('resolve').isCore;
const resolve = require('resolve-from');

exports.interfaceVersion = 2;

exports.resolve = function (source, file) {
	if (isCore(source)) {
		return {found: true, path: null};
	}

	const patternPath = path.dirname(file);
	const manifestPath = path.join(patternPath, 'pattern.json');
	const baseName = path.basename(file);
	const extName = path.extname(file);
	const isDemo = path.basename(baseName, extName) === 'demo';
	const indexFile = `./index${extName}`;

	if (!exists(manifestPath)) {
		return {found: false, path: null};
	}

	const manifest = loadJsonFile(manifestPath);
	const patterns = manifest.patterns || {};

	if (isDemo && source === 'Pattern') {
		const resolved = resolve(patternPath, indexFile);
		return {found: Boolean(resolved), path: resolved};
	}

	if (source in patterns) {
		const id = String(patterns[source]);
		const relativeDependencyPath = id.split('/').join(path.sep);
		const patternRoot = getPatternRoot(file);
		const dependencyRoot = path.join(patternRoot, relativeDependencyPath);
		const dependencyManifestPath = path.join(dependencyRoot, 'pattern.json');
		const dependencyFilePath = path.join(dependencyRoot, indexFile);

		if (exists(dependencyManifestPath)) {
			try {
				return {found: true, path: resolve(patternPath, dependencyFilePath)};
			} catch (err) {
				return {found: false, path: null};
			}
		}
	}

	return {found: false, path: null};
};

function getPatternRoot(file) {
	const frags = file.split(path.sep);
	return frags.slice(0, frags.lastIndexOf('patterns') + 1)
		.join(path.sep);
}
