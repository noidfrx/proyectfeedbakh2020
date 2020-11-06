export class Task{
    constructor(
        public nombre: string,
        public encargado: string,
        public dia: number,
        public mes: number,
        public anio: number,
        public sinFecha: boolean,
        public categoria: string,
        public sinCategoria: boolean,
        public descripcion: string
    ) { }
}