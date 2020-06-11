export default interface IClase {
    descripcion: string;
    calificacion: number;
    id: number;
    titulo: string;
    imagenClase: string;
    comentarios: {
        length: number;
        comentario: string;
        _id: string;
        usuario: {
            avatar: string;
            nombre: string;
            _id: string;
        }
    }
}