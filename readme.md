> eslint-import integration for patternplate

# eslint-import-resolver-patternplate [![stability][0]][1]

[![npm version][6]][7] [![Travis branch][2]][3] [![AppVeyor branch][4]][5]

patternplate uses a custom [resolver algorithm](https://github.com/sinnerschrader/patternplate/blob/master/documentation/pattern-resolve-algorithm.md) to manage dependencies.

This causes false positives for pattern files linted using
[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), which can be solved by using `eslint-import-resolver-patternplate`.

## Installation

```shell
npm install --save-dev patternplate \
  eslint \
  eslint-plugin-import \
  eslint-import-resolver-patternplate
```

## Usage

Specify both the `node` (default) and `patternplate` resolvers in `package.json`. See the docs of [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import#resolvers) for other options.

```js
{
  "eslintConfig": {
    "settings": {
      "import/resolver": {
        "node": {},
        "patternplate": {}
      }
    }
  }
}
```

---
Built by (c) marionebl. Released under the MIT license.


[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/travis/marionebl/eslint-import-resolver-patternplate/master.svg?style=flat-square
[3]: https://travis-ci.org/marionebl/eslint-import-resolver-patternplate
[4]: https://img.shields.io/appveyor/ci/marionebl/eslint-import-resolver-patternplate/master.svg?style=flat-square
[5]: https://ci.appveyor.com/project/marionebl/eslint-import-resolver-patternplate
[6]: https://img.shields.io/npm/v/eslint-import-resolver-patternplate.svg?style=flat-square
[7]: https://npmjs.org/package/eslint-import-resolver-patternplate
