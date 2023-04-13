module.exports = {
	root: true,
	env: { node: true, },
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-strongly-recommended',
		'@vue/typescript/recommended',
	],
	globals: {
		'gapi': 'readonly'
	},
	plugins: ['no-null'],
	parserOptions: { ecmaVersion: 'latest', },
	rules: {
		'no-undef': 'off',
		'vue/no-undef': 'off',
		'no-null/no-null': 'error',
		'no-console': 'warn',
		'no-debugger': 'warn',
		'indent': [
			'warn',
			'tab',
			{
				'flatTernaryExpressions': true
			}
		],
		'space-in-parens': [
			'warn',
			'never'
		],
		'object-curly-newline': [
			'warn',
			{
				'multiline': true,
				'consistent': true,
				'minProperties': 2,
			}
		],
		'object-curly-spacing': [
			'warn',
			'always',
			{
				'arraysInObjects': false,
				'objectsInObjects': false
			}
		],
		'vue/array-bracket-newline': [
			'warn',
			{
				'multiline': true, 'minItems': 2
			}
		],
		'vue/array-bracket-spacing': [
			'warn',
			'always',
			{
				'singleValue': false,
				'objectsInArrays': false,
				'arraysInArrays': false
			}
		],
		'vue/singleline-html-element-content-newline': ['warn',
			{
				'ignoreWhenNoAttributes': true,
				'ignoreWhenEmpty': true,
			}],
		'vue/multiline-html-element-content-newline': ['warn',
			{
				'ignoreWhenEmpty': true,
				'allowEmptyLines': false
			}],
		'array-element-newline': ['warn',
			'always'],
		quotes: [
			'warn',
			'single'
		],
		semi: [
			'warn',
			'never'
		],
		'vue/v-on-event-hyphenation': [
			'warn',
			'always'
		],
		'vue/no-empty-component-block': 'warn',
		'vue/no-multiple-objects-in-class':'warn',
		'vue/no-duplicate-attr-inheritance': 'warn',
		//'vue/no-required-prop-with-default': 'warn',
		//'vue/v-on-handler-style': 'warn',
		'vue/no-static-inline-styles': 'warn',
		'vue/no-template-target-blank': 'warn',
		'vue/no-this-in-before-route-enter': 'error',
		'vue/no-unsupported-features': ['error',
			{
				'version': '^3.2.0'
			}],
		'vue/v-for-delimiter-style': 'warn',
		'vue/require-name-property': 'warn',
		'vue/require-direct-export': 'warn',
		'vue/prefer-true-attribute-shorthand': 'warn',
		'vue/prefer-prop-type-boolean-first': 'warn',
		'vue/padding-line-between-blocks': 'warn',
		'vue/no-useless-v-bind': 'warn',
		'vue/multi-word-component-names': 'warn',
		'vue/match-component-file-name': [
			'warn',
			{
				'extensions': [
					'jsx',
					'vue'
				],
				'shouldMatchCase': true
			}
		],
		'vue/no-multiple-template-root': 'off',
		'vue/component-name-in-template-casing': [
			'warn',
			'PascalCase',
			{
				'registeredComponentsOnly': true,
				'ignores': []
			}
		],
		'vue/no-bare-strings-in-template': [
			process.env.NODE_ENV === 'production'? 'error': 'off',
			{
				'allowlist': [
					'(',
					')',
					',',
					'.',
					'&',
					'+',
					'-',
					'=',
					'*',
					'/',
					'#',
					'%',
					'!',
					'?',
					':',
					'[',
					']',
					'{',
					'}',
					'<',
					'>',
					'\u00b7',
					'\u2022',
					'\u2010',
					'\u2013',
					'\u2014',
					'\u2212',
					'|'
				],
				'attributes': {
					'/.+/': [
						'title',
						'aria-label',
						'aria-placeholder',
						'aria-roledescription',
						'aria-valuetext'
					],
					'input': ['placeholder'],
					'img': ['alt']
				},
				'directives': ['v-text']
			}
		],
		'vue/next-tick-style': [
			'error',
			'promise'
		],
		'vue/define-macros-order': [
			'warn',
			{
				'order': [
					'defineProps',
					'defineEmits'
				]
			}
		],
		'vue/custom-event-name-casing': [
			'warn',
			'camelCase',
			{ 'ignores': []}
		],
		'vue/block-tag-newline': [
			'warn',
			{
				'singleline': 'always',
				'multiline': 'always',
				'maxEmptyLines': 0,
			}
		],
		'vue/block-lang': [
			'warn',
			{ 'script': { 'lang': 'ts' }}
		],
		'vue/html-indent': [
			'warn',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
			},
		],
		'vue/html-closing-bracket-newline': [
			'warn',
			{
				singleline: 'never',
				multiline: 'always',
			},
		],
		'vue/order-in-components': [
			'warn',
			{
				order: [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					[
						'delimiters',
						'comments'
					],
					[
						'components',
						'directives',
						'filters'
					],
					'extends',
					'mixins',
					'emits',
					[
						'provide',
						'inject'
					],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					[
						'props',
						'propsData'
					],
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'LIFECYCLE_HOOKS',
					'methods',
					[
						'template',
						'render'
					],
					'renderError',
				],
			},
		],
		// 'vue/padding-lines-in-component-definition': [
		// 	'warn',
		// 	{
		// 		'betweenOptions': 'always',
		// 		'groupSingleLineProperties': true
		// 	}
		// ],
		// 'vue/padding-line-between-tags': [
		// 	'warn',
		// 	[
		// 		{
		// 			'blankLine': 'always', 'prev': '*', 'next': '*'
		// 		}
		// 	]
		// ],
	},
}
