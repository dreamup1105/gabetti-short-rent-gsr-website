/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    //enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'dynamicPages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'dynamicPages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ],
	theme: {
		fontFamily: {
			body: ['Muli'],
		},
		screens: {
			xs: '480px',
			// => @media (min-width: 480px)
			sm: '640px',
			// => @media (min-width: 640px)
			md: '768px',
			// => @media (min-width: 768px)
			lg: '1024px',
			// => @media (min-width: 1024px)
			xl: '1280px',
			// => @media (min-width: 1280px)
		},
    extend: {
      aspectRatio: {
        '3/2': '3 / 2',
        '4/3': '4 / 3',
      },
    }
	},
	variants: {},
	plugins: [],
};
