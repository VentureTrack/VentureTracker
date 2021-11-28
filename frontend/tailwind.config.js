module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'price-discount': "url('./images/undraw_discount_d-4-bd.svg')",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
