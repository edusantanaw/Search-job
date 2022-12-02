export  class NotEqualError extends Error {
    constructor () {
      super(`Passwords must be equals!`)
      this.name = 'NotEquals'
    }
  }