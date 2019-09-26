module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "allowImportExportEverywhere": true,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // comma at object/array end
        "comma-dangle": 0,

        "no-prototype-builtins": 0,

        // fat arrow
        "arrow-body-style": 0,
        "arrow-spacing": ["error", { "before": true, "after": true }],

        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "yoda": [
            1,
            "always"
        ],
        "eqeqeq": 1,
        "curly": [
            1,
            "all"
        ],
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true }
        ],
        "space-in-parens": [
            "error",
            "always"
        ],
        "camelcase": [
            1,
            {
                "properties": "always"
            }
        ],
        "comma-spacing": [
            1,
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            1,
            "last"
        ],
        "computed-property-spacing": [
            "error",
            "always"
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "func-style": [
            "error",
            "expression"
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "max-nested-callbacks": [
            "error",
            3
        ],
        "new-cap": [
            "error", {
                "newIsCap": true,
                "capIsNewExceptions": ["Get", "Post", "Put", "Delete"]
            }
        ],
        "no-mixed-spaces-and-tabs": "error",
        "no-multiple-empty-lines": [
            "error", {
                "max": 2
            }
        ],
        "no-nested-ternary": "error",
        "no-spaced-func": "error",
        "no-trailing-spaces": [
            "error", {
                "skipBlankLines": true,
                "ignoreComments": false
            }
        ],
        //"no-unneeded-ternary": "error",
        "operator-assignment": [
            "error",
            "never"
        ],

        //"space-after-keywords": "error",
        "space-before-blocks": "error",

        /* Variables */
        "no-catch-shadow": 0,
        "no-delete-var": 0,
        "no-label-var": 1,
        "no-shadow-restricted-names": 1,
        "no-shadow": 1,
        "no-undef-init": 1,
        "no-undef": 1,
        "no-undefined": 0,
        "no-unused-vars": [
            1,
            {
                "vars": "local",
                "args": "after-used"
            }
        ],
        "no-use-before-define": [
            "error",
            {
                "functions": true,
                "classes": true,
                "variables": false
            }
        ],
        "no-unreachable": "error",
        "lines-around-comment": [
            "error", {
                "beforeBlockComment": true,
                "beforeLineComment": true
            }
        ],

        /* Legacy */
        "max-depth": [0, 3],
        "max-params": 0,
        "max-statements": 0,
        "no-bitwise": 0,
        "no-plusplus": 1,

        /* ECMAScript 6 */
        "constructor-super": 1,
        "generator-star-spacing": 0,
        "no-this-before-super": 1,
        "no-var": 1,
        "object-shorthand": 0,
        "prefer-const": 1,

        "no-async-promise-executor": 0,
        "no-misleading-character-class": 0,
        "no-useless-catch": 0,
        "require-atomic-updates": 0,

        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/display-name": 1,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-undef": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1
    },
    "globals": {
        "IS_ENV_DEV": false,
        "IS_MOCK_SERVER": false,
        "React": true,
        "CONFIG": true, // node-config
        "__dirname": true,
        "process": true,
        "module": true,
        "exports": true,
        "global": true,
        "log": true
    }
};
