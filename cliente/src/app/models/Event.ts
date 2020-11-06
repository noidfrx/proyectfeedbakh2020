export class Event{
    constructor(
        public nombre: string,
        public encargado: string,
        public dia: number,
        public mes: number,
        public anio: number,
        public sinFecha: boolean,
        public hora: number,
        public minuto: number,
        public sinHora: boolean,
        public categoria: string,
        public sinCategoria: boolean,
        public colaboradores: string[],
        public privacidad: number,
        public descripcion: string,
        public enlace: string
    ) { }
}