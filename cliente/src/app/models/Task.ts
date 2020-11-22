export class Task{
    constructor(
        public nombre: string,
        public encargado: number,
        public equipo: number,
        public dia: number,
        public mes: number,
        public anio: number,
        public categoria: number,
        public descripcion: string,
        public tarea: number
    ) { }
}