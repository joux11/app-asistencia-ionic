export interface IChild {
    id: number;
    identificacion: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: Date;
    genero: string;
    created_at: Date;
    update_at: Date;
    aula_id?: number
}