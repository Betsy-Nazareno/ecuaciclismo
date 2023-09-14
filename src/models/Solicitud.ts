import { RutaCoordinadas } from "./Rutas";
import { User } from "./User";

export interface Solicitud {
    first_name?: string;
    last_name?: string;
    username?: string;
    foto?: string;
    token_usuario: string;
    token_notificacion?: string;
    tipo: string;
    nombre: string;
    direccion?: string;
    imagen?: string;
    estado: string;
    usuarios?:Partial<User>[]
    motivo_rechazo: string;
    path_Pdf?: string;
    token: string;
    token_lugar?: string;
    descripcion?: string;
    fecha_creacion?: string;
    ubicacion?: RutaCoordinadas;
}
