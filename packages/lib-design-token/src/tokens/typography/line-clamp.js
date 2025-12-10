export default {
  /**
   * Line clamp values for truncating text to N lines.
   *
   * CSS usage:
   * display: -webkit-box;
   * -webkit-box-orient: vertical;
   * -webkit-line-clamp: var(--dg-line-clamp-*);
   * overflow: hidden;
   */
  'line-clamp': {
    1: {
      value: 1,
      type: 'number',
      comment: 'Single line truncation'
    },
    2: {
      value: 2,
      type: 'number',
      comment: 'Two line truncation'
    },
    3: {
      value: 3,
      type: 'number',
      comment: 'Three line truncation'
    },
    4: {
      value: 4,
      type: 'number',
      comment: 'Four line truncation'
    },
    5: {
      value: 5,
      type: 'number',
      comment: 'Five line truncation'
    },
    6: {
      value: 6,
      type: 'number',
      comment: 'Six line truncation'
    }
  }
}
