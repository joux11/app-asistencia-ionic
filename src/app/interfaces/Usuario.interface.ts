export interface IUsuario {
    id: number;
    identificacion: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    numero_celular: string;
    email: string;
    estado: number;
    created_at: Date;
    updated_at: Date;
    rol_id: number;
}