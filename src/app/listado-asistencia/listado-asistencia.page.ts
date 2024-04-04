import { Component, OnInit, inject } from '@angular/core';
import { AppService } from '../services/app.service';
import { IAsistenciaN } from '../interfaces/RegistroAsistenciaN.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['fecha_marcacion', 'hora_entrada', 'hora_salida', 'estado'];



  private appService = inject(AppService)
  constructor() { }

  ngOnInit() {
    this.appService.postData({ accion: "getAllAsistenciasN" }).subscribe((res: any) => {
      const response: IAsistenciaN[] = res
      this.dataSource = new MatTableDataSource<any>(this.Columns(response))
    })
  }

  Columns(res: IAsistenciaN[]) {
    const newRes: any[] = []

    res.forEach(element => {
      const e = {
        fecha_marcacion: element?.fecha_marcacion,
        hora_entrada: element?.hora_entrada,
        hora_salida: element?.hora_salida,
        estado: element?.estado
      }
      newRes.push(e)
    })

    return newRes
  }


}
