export  class emailAlreayUsed extends Error {
    constructor () {
      super('Email is already been used!')
      this.name = 'EmailAlreadyBeenUsed'
    }
  }