// gradient generation: https://www.css-gradient.com/

export default {
  gradient: {
    'colourful-button': {

      // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#formal_syntax
      type: 'linear-gradient',

      value: [
        {
          // 0deg === bottom to top, 180deg === top to bottom
          angle: 134,

          // https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method#formal_syntax
          interpolation: '',

          colors: [
            {
              color: 'cyan',
              // length: '1rem',
              percentage: 0 // >= 0 && <=100
            },
            {
              color: 'red',
              percentage: 50
            },
            {
              color: 'transparent',
              percentage: 70
            },
            {
              color: 'blue',
              percentage: 100
            }
          ]
        },
        {
          colors: [
            {
              color: 'cyan'

            },
            {
              color: 'red'
            }]
        }
      ]
    },

    'radial-bg': {

      //https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient#formal_syntax
      type: 'radial-gradient',

      value: [
        {
          // ellipse(default) / circle
          endingShape: 'circle',

          // farthest-corner(default) / farthest-side / closest-corner / closest-size
          // 100px / N%
          // xpx ypx / x% y%
          size: 'farthest-side',

          position: {
            x: 'left', // left / center(default) / right / n% / 10px
            y: 'bottom' // top / center(default) / bottom / n% / 10px
          },

          interpolation: '',

          colors: [
            {
              color: 'salmon',
              percentage: 0
            },
            {
              color: 'red',
              percentage: 50
            },
            {
              color: 'blue',
              percentage: 100
            }
          ]
        },
        {
          colors: [
            {
              color: 'black'
            },
            {
              color: 'white'
            }
          ]
        }
      ]
    },

    'conic-bg': {

      // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient#formal_syntax
      type: 'conic-gradient',

      value: [
        {
          angle: 123, // same to linear-gradient
          position: { // same to radial-gradient
            x: 'left',
            y: 'bottom'
          },
          interpolation: '',
          colors: [
            {
              color: 'salmon',
              percentage: 0
            },
            {
              color: 'teal',
              percentage: 100
            }
          ]
        },
        {
          colors: [
            {
              color: 'black'
            },
            {
              color: 'white'
            }
          ]
        }
      ]
    }
  }
}
