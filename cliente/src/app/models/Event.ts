export class Event{
    constructor(
        public nombre: string,
        public encargados: number[],
        public fecha: Date,
        public hora: Date,
        public categoria: number,
        public equipo: number,
        public privacidad: number,
        public descripcion: string,
        public enlace: string,
        public evento: number
    ) { }
}