import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		languageOptions: {
			parser: tseslint, // Use TypeScript parser for both JS and TS
		},
		rules: {
			"import/order": [
				"error",
				{
					groups: [
						["builtin", "external"],
						["internal", "parent", "sibling", "index"],
					],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
			"prefer-arrow-callback": "error",
			"func-style": ["error", "expression", { allowArrowFunctions: true }],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_", // Ignore unused function arguments that start with an underscore
					varsIgnorePattern: "^_", // Ignore unused variables that start with an underscore
				},
			],
		},
		plugins: {
			import: importPlugin,
		},
	},
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
