export default {
  'white-space': {
    DEFAULT: {
      // 1. Sequences of white space are **collapsed**
      // 2. Newline characters = white spaces
      // 3. Lines are broken as necessary
      value: 'normal',
      type: 'whiteSpace'
    },
    nowrap: {
      // 1. Collapsed
      // 2. No line breaks
      value: 'nowrap',
      type: 'whiteSpace'
    },
    preserved: {
      // 1. preserve white spaces & newline characters
      // 2. line break when: 2.1 newline characters 2.2 <br>
      value: 'pre',
      type: 'whiteSpace'
    },
    'preserved-wrap': {
      // 1. preserve white spaces & newline characters
      // 2. line break when: 2.1 newline characters 2.2 <br> 2.3 end of the box
      value: 'pre-wrap',
      type: 'whiteSpace'
    },
    'preserved-line': {
      // 1.1 preserve newline characters
      // 1.1 collapse Sequences of white spaces
      // 2. line break when: 2.1 newline characters 2.2 <br> 2.3 end of the box
      value: 'pre-line',
      type: 'whiteSpace'
    },
    'break-spaces': {
      value: 'break-spaces',
      type: 'whiteSpace'
    }
  }
}
