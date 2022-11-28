export class UnauthorizedError extends Error {
    constructor(paramName: string){
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}