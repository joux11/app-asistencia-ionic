import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = "http://localhost/si_asistencia/ws_asistencia.php";
  constructor(private http: HttpClient, private _toastController: ToastController) { }

  userLogin(req: any) {
    return this.http.post(`${this.API_URL}`, req);
  }

  userRegister(req: any) {
    return this.http.post(`${this.API_URL}`, req);
  }

  async showToast(msg: string) {
    const toast = await this._toastController.create({
      position: 'bottom',
      message: msg,
      duration: 2000
    })

    return toast.present();

  }
}
