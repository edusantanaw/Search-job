export  class emailAlreadyUsed extends Error {
    constructor () {
      super('Email is already been used!')
      this.name = 'EmailAlreadyBeenUsed'
    }
  }