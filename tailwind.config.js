module.exports = {
  purge: {
    enabled: true,
    content: ['./dist/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-owl')],
}
