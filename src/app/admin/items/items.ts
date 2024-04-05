import { AsignacionAulasComponent } from "../asignacion-aulas/asignacion-aulas.component";
import { AulasComponent } from "../aulas/aulas.component";
import { UsuariosComponent } from "../usuarios/usuarios.component";

export const items: { nombre: string, descripcion: string, icon?: string, component?: any }[] =
    [

        {
            nombre: 'Usuarios',
            descripcion: 'Gestion de los usuarios',
            icon: "people-circle-outline",
            component: UsuariosComponent
        },
        {
            nombre: 'Aulas',
            descripcion: 'Gestion de las Aulas',
            icon: "grid-outline",
            component: AulasComponent
        },
        {
            nombre: 'Asignacion de Aulas',
            descripcion: 'Asignar aulas a los docentes',
            icon: "open-outline",
            component: AsignacionAulasComponent
        }
    ]