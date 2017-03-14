import path from 'path';
import test from 'ava';
import {resolve} from '.';

test('reports <found> for core modules', t => {
	const actual = resolve('path');
	t.is(actual.found, true);
	t.is(actual.path, null);
});

test('reports not <found> for js outside of patterns', t => {
	const actual = resolve('./b', 'fixtures/no-pattern/patterns/a/index.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});

test('reports <found> for Pattern inside pattern demo files', t => {
	const actual = resolve('Pattern', 'fixtures/single-pattern/patterns/a/demo.js');
	t.is(actual.found, true);
	t.is(actual.path, path.resolve('fixtures/single-pattern/patterns/a/index.js'));
});

test('reports not <found> for Pattern inside invalid pattern demo files', t => {
	const actual = resolve('Pattern', 'fixtures/invalid-demo/patterns/a/demo.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});

test('throws for pattern with invalid json', t => {
	t.throws(() => resolve('Pattern', 'fixtures/invalid-manifest/patterns/a/demo.js'));
});

test('reports not <found> for patterns with missing pattern entry', t => {
	const actual = resolve('./b', 'fixtures/missing-pattern-entry/patterns/a/index.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});

test('reports not <found> for patterns with missing target pattern', t => {
	const actual = resolve('./b', 'fixtures/missing-pattern/patterns/a/index.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});

test('reports not <found> for patterns with missing target pattern manifest', t => {
	const actual = resolve('./b', 'fixtures/missing-pattern-manifest/patterns/a/index.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});

test('reports not <found> for patterns with missing target pattern file', t => {
	const actual = resolve('./b', 'fixtures/missing-pattern-manifest/patterns/a/index.js');
	t.is(actual.found, false);
	t.is(actual.path, null);
});
