const path = require('path');
const screens = require(path.join(__dirname, './config/screens.json'));

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  safelist: [{
    pattern: /.*/,
    variants: [
      "hover",
      "focus",
      ...Object.keys(screens)
    ]
  }],
  theme: {
    screens: screens,
    colors: require(path.join(__dirname, './config/colors.json')),
    container: {},
    fontFamily: {
      DEFAULT: [
        "Gilroy",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif"
      ]
    },
    spacing: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '64px',
      '7': '128px',
    },
    fontSize: {
      "title-1": '40px',
      "title-1m": '28px',
      "title-2": '32px',
      "title-2m": '24px',
      "title-3": '24px',
      "title-3m": '22px',
      "title-4": '20px',
      "title-5": '18px',
      "title-6": '16px',
      "title-7": '14px',
      "title-8": '12px',
      "body-1": '20px',
      "body-2": '16px',
      "body-3": '14px',
      "body-4": '12px'
    },
    lineHeight: {
      none: '1',
      "title-1": '44px',
      "title-1m": '32px',
      "title-2": '36px',
      "title-2m": '30px',
      "title-3": '28px',
      "title-3m": '26px',
      "title-4": '24px',
      "title-5": '22px',
      "title-6": '20px',
      "title-7": '18px',
      "title-8": '16px',
      "body-1": '24px',
      "body-2": '20px',
      "body-3": '18px',
      "body-4": '16px'
    },
    width: {
      auto: 'auto',
      '1': '18rem',
      '2': '24rem',
      '3': '28rem',
      '4': '32rem',
      '5': '36rem',
      '6': '42rem',
      '7': '48rem',
      '8': '56rem',
      '9': '64rem',
      '10': '72rem',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vw',
    },
    maxWidth: theme => ({
      none: 'none',
      ...theme('width')
    }),
    minWidth: theme => ({
      '0': '0',
      ...theme('width'),
    }),
    boxShadow: {
      none: 'none',
      '1': '0px 1px 3px rgba(0, 0, 0, 0.1)',
      '2': '0px 2px 4px rgba(0, 0, 0, 0.15)',
      '3': '0px 2px 7px rgba(0, 0, 0, 0.15)',
      '4': '0px 2px 10px rgba(0, 0, 0, 0.2)',
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.DEFAULT'),
    }),
    borderRadius: {
      none: '0',
      xsmall: '8px',
      small: '12px',
      DEFAULT: '16px',
      large: '20px',
      xlarge: '24px',
      circle: '999px',
    },
    borderWidth: {
      none: '0',
      DEFAULT: '1px',
      '2': '2px',
      '4': '4px'
    },
    fontWeight: {
      "100": '100',
      "200": '200',
      "300": '300',
      "400": '400',
      "500": '500',
      "600": '600',
      "700": '700',
      "800": '800',
      "900": '900'
    },
    zIndex: {
      auto: 'auto',
      '0': '0',
      '1': '10',
      '2': '20',
      '3': '30',
      '4': '40',
      '5': '50',
    },
  }
}
