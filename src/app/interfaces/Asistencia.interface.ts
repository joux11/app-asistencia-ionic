export interface IAsistencia {
    id: number;
    fecha_marcacion: Date;
    hora_entrada: string;
    hora_salida: null;
    estado: string;
    latitud: number;
    longitud: number;
    usuario_id: number;
}