export class Register{
    constructor(
        public nombre:string,
        public apellidoPaterno:string,
        public apellidoMaterno:string,
        public email:string,
        public password:string,
        public repetirPassword:string
    ){}
}