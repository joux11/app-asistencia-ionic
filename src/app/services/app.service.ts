import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL = "http://localhost/ws_asistencia/api/ws_asistencia.php";
  constructor(private http: HttpClient, private _toastController: ToastController) { }

  postData(req: any) {
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
  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }


  async closeSession(id: string) {
    await Preferences.remove({ key: id })
  }
  async clearSession() {
    await Preferences.clear()
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value
  }
}
