export const IMAGE_PATHS = {
  dataStructure: {
    base: '/images/data-structure',
    get description() { return `${this.base}/description.png` },
    get wrongAnswer() { return `${this.base}/wrongAnswer.png` },
    get right() { return `${this.base}/right.png` }
  },
  thoughts: {
    base: '/images/thoughts'
  },
  blog: {
    base: '/images/blog'
  },
  common: {
    base: '/images/common',
    get logo() { return `${this.base}/logo.png` }
  }
}; 