/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Nunito: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0px 2px 7px 0px #D7D7D740',
      },
      screens: {
        'small-mobile': '320px',      // 360 by 640
        'mobile': '375px',            // 375 by 667
        'large-mobile': '414px',      // 414 by 896
        'phablet': '480px',           // 393 by 873
        'sm': '640px',                // Default sm
        'md': '768px',                // 768 by 1024
        'lg': '1024px',               // 1024 by 768
        'xl': '1280px',               // 1280 by 720 Default xl
        'windowScreen': '1366px',     // ProBook 4430s (of dimension 1366 by 650) falls in this category
        'large-desktop': '1440px',    // 1440 by 900
        '2xl': '1536px',              // Default 2xl
        'macScreens': '1650px',       // 1650 by 920
        'wide-desktop': '1920px',     // 1920 by 1080
      },
      backgroundImage: {
        authBg: "url('/public/img/auth-bg.png')",
        mediaBg1: "url('/public/img/media-bg-1.png')",
        mediaBg2: "url('/public/img/media-bg-2.png')",
        mediaBg3: "url('/public/img/media-bg-3.png')",
        trendingImg1: "url('/public/img/trending-img-1.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

