export class Event{
    constructor(
        public nombre: string,
        public encargados: number[],
        public fecha: Date,
        public hora: number,
        public minuto: number,
        public categoria: number,
        public equipo: number,
        public privacidad: number,
        public descripcion: string,
        public enlace: string,
        public evento: number
    ) { }
}