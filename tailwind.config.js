/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        linen: '#E8DCC8',
        coffee: '#3C2E22',
        olive: '#5C6B4C',
        terracotta: '#B8705C',
        tan: '#8B7355',
      },
      fontFamily: {
        brand: ['Cormorant Garamond', 'serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}   