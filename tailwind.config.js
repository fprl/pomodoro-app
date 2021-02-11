module.exports = {
  purge: {
    enabled: false,
    content: [
    './dist/**/*.html',
    './dist/**/*.js',],
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
  plugins: [
    require('tailwindcss-owl')],
}
