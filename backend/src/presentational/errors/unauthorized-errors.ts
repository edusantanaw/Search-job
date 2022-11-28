export class UnauthorizedError extends Error {
    constructor( private paramName: string){
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}