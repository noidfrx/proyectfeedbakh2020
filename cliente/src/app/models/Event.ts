export class Event{
    constructor(
        public nombre: string,
        public encargado: number,
        public dia: number,
        public mes: number,
        public anio: number,
        public hora: number,
        public minuto: number,
        public categoria: number,
        public equipo: number,
        public privacidad: number,
        public descripcion: string,
        public enlace: string
    ) { }
}