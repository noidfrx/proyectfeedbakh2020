export class Task{
    constructor(
        public nombre: string,
        public encargado: number,
        public equipo: number,
        public fecha: Date,
        public categoria: number,
        public descripcion: string,
        public tarea: number,
        public completado: number
    ) { }
}