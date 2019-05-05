import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { Storage, LocalStorage, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('myNav') nav: NavController
  // @ViewChild('refresherRef') refresherRef;
  pic: Observable<any>;
  pic_uri: any = [];
  pic_api: string = "http://localhost:3000/api/storages/keep1/download/";
  pic_del_api: string = "http://localhost:3000/api/storages/keep1/files/"
  cat_del_api: string = "http://localhost:3000/api/cats/"
  constructor(public navCtrl: NavController, public alertController: AlertController,
  public httpClient: HttpClient) {
    this.storage = localStorage;
// แสดงรูป และแคปชั่นของยูสเซอร์ที่ล็อคอินเข้ามา
    this.pic = this.httpClient.get('http://localhost:3000/api/cats?access_token=' + this.storage.getItem("access_token") + "&filter={\"where\":{\"userId\":\""+ this.storage.getItem("userId") +"\"}}");
    this.pic.subscribe(data => {
    console.log(data);
		console.log(data.length);

	  for (var i=0; i<data.length; i++)
	  {
		console.log('my data: ', this.pic_api + data[i].name);
		this.pic_uri.unshift([this.pic_api + data[i].name, data[i].name, data[i].id, data[i].caption]);
	  }
  });

  }
// แจ้งเตือนลบรูป
  async presentAlertConfirm(data: any) {
    console.log(data);
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: '<strong>ต้องการลบรูปหรือไม่</strong>!!!',
      buttons: [
        {
          text: 'ไม่!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('ไม่ลบ');
          }
        }, {
          text: 'ใช่!',
          handler: () => {
            console.log(this.pic_del_api + data[1]);
            this.httpClient.delete(this.cat_del_api + data[2] + "?access_token=" + this.storage.getItem("access_token")).subscribe(res => {
      				console.log(res);
              this.httpClient.delete(this.pic_del_api + data[1])
        			.subscribe(res => {
        				console.log(res);
                this.navCtrl.navigateForward('/home');
        				}, err => {
        				console.log(err);
        			});
      				}, err => {
      				console.log(err);
      			});

          }
        }
      ]
    });

    await alert.present();
  }
  // ลองทำรีเฟรชหน้าแต่ไม่สามรถใช้งานได้
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  }

  // logout function
  logout() {
    this.httpClient.post("http://localhost:3000/api/Users/logout?access_token=" + this.storage.getItem("access_token")).subscribe(
      (res) => {
        console.log(res);
        console.log("logout success!");
        this.navCtrl.navigateForward('/login');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
