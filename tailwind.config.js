/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 모든 하위 폴더와 파일 포함
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        mainColor: 'rgb(0, 104, 223)',
      },
    },
  },
  plugins: [],
}
