module.exports = {
  purge: ['./pages/**/*.tsx', './application/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['active'],
    },
  },
  plugins: [],
}
