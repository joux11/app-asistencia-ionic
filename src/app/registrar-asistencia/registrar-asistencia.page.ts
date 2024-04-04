import { Component, OnInit, inject } from '@angular/core';
import { IUsuario } from '../interfaces/Usuario.interface';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { Geolocation } from '@capacitor/geolocation';
import { IAsistencia } from '../interfaces/Asistencia.interface';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {



  usuario?: IUsuario
  asistencia?: IAsistencia;

  appService = inject(AppService)

  mostrarMapa = false

  horaRegistroEntrada?: string;
  horaRegistroSalida?: string;
  mostrarRegistroSalida: boolean = false;

  mostrarDatosSalida: boolean = false;
  mostrarDatosEntrada?: boolean;

  lngLat?: [number, number]


  fecha_actual = moment().format('YYYY-MM-DD');
  hora_actual = moment().format('HH:mm:ss')
  constructor(

  ) { }

  ngOnInit() {
    this.appService.getSession("user").then(user => {
      this.usuario = JSON.parse(user!)
      this.appService.postData({ accion: "getAsistenciaByDateAndId", fecha_marcacion: this.fecha_actual, usuario_id: this.usuario?.id }).subscribe((res: any) => {
        this.asistencia = res
        if (!this.asistencia) {
          this.mostrarDatosEntrada = true
          this.mostrarDatosSalida = false

        } else {
          this.mostrarDatosEntrada = false
          this.mostrarDatosSalida = true
          this.horaRegistroEntrada = this.asistencia?.hora_entrada
          this.lngLat = [this.asistencia.longitud, this.asistencia.latitud]
          this.mostrarMapa = true

          if (this.asistencia.hora_salida) {
            this.mostrarDatosSalida = false
            this.horaRegistroSalida = this.asistencia.hora_salida
            this.mostrarRegistroSalida = true
          }
        }
      })
    })




  }

  async registrarEntrada() {
    const cordenadas = await Geolocation.getCurrentPosition();
    this.lngLat = [cordenadas.coords.longitude, cordenadas.coords.latitude]

    const body = {
      accion: "createAsistencia",
      fecha_marcacion: this.fecha_actual,
      hora_entrada: this.hora_actual,
      estado: "A",
      longitud: cordenadas.coords.longitude,
      latitud: cordenadas.coords.latitude,
      usuario_id: this.usuario?.id
    }

    this.appService.postData(body).subscribe((res: any) => {

      if (res.status) {
        this.appService.showToast(res.msg)
        this.mostrarMapa = true;
        this.cargarRegistroAsistencia()
        this.mostrarDatosEntrada = false
        this.mostrarDatosSalida = false
      }
    })




  }
  registrarSalida() {
    const body = {
      accion: 'updateAsistencia',
      id: this.asistencia?.id,
      hora_salida: this.hora_actual
    }
    this.appService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
        this.mostrarRegistroSalida = true
        this.cargarRegistroAsistencia()
        this.mostrarDatosEntrada = false
        this.mostrarDatosSalida = false
      }
    })
  }

  cargarRegistroAsistencia() {

    const body = {
      accion: 'getAsistenciaByUsuario',
      usuario_id: this.usuario?.id
    }

    this.appService.postData(body).subscribe((res: any) => {
      this.asistencia = res
      this.horaRegistroEntrada = this.asistencia?.hora_entrada
      this.horaRegistroSalida = this.asistencia?.hora_salida!
    })
  }
}
