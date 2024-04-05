import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-asignacion-aulas',
  templateUrl: './asignacion-aulas.component.html',
  styleUrls: ['./asignacion-aulas.component.scss'],
})
export class AsignacionAulasComponent implements OnInit {

  asignaciones: any[] = [];
  usuarios: any[] = [];
  aulas: any[] = [];

  aula?: string;
  usuario?: string;

  dataSource: any;
  displayedColumns: string[] = ["nombre_docente", "aula"];
  constructor(
    private modalCtrl: ModalController,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.listarAsignaciones()
  }
  Columns(res: any[]): any[] | undefined {
    const newRes: any[] = []

    res.forEach(element => {
      const e = {
        nombre_docente: element.nombre_usuario,
        aula: element.nombre_aula
      }
      newRes.push(e)
    })

    return newRes
  }




  cancel() {

    return this.modalCtrl.dismiss(null, 'cancel');
  }
  asignar() {
    const body = {
      accion: "createAsignacion",
      aula_id: this.aula,
      usuario_id: this.usuario

    }
    this.appService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
        this.aula = ""
        this.usuario = ""
        this.listarAsignaciones()
      }
    })
  }

  listarAsignaciones() {
    this.appService.postData({ accion: "getAllAsignaciones" }).subscribe((res: any) => {
      this.asignaciones = res
      this.dataSource = new MatTableDataSource<any>(this.Columns(this.asignaciones))


    })
    this.appService.postData({ accion: "getUsersNoAsignado" }).subscribe((res: any) => {
      this.usuarios = res
    })
    this.appService.postData({ accion: "getAulasNoAsignadas" }).subscribe((res: any) => {
      this.aulas = res
    })
  }


}
