import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  // @ViewChild('refresherRef') refresherRef;
  pic: Observable<any>;
  pic_uri: any = [];
  pic_api: string = "http://localhost:3000/api/storages/keep1/download/";
  pic_del_api: string = "http://localhost:3000/api/storages/keep1/files/"
  constructor(private router: Router, public navCtrl: NavController, public alertController: AlertController,
  public httpClient: HttpClient) {

    this.pic = this.httpClient.get('http://localhost:3000/api/storages/keep1/files');
    this.pic
    .subscribe(data => {
		console.log(data.length);
	  for (var i=0; i<data.length; i++)
	  {
		console.log('my data: ', this.pic_api + data[i].name);
		//this.pic_uri.unshift([this.pic_api + data[i].name, data[i].name]);
	  }
    })

  }

  async presentAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      header: 'จะลบหรอ!',
      message: '<strong>ต้องการลบ</strong>!!!',
      buttons: [
        {
          text: 'ไม่ลบหรอก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('ไม่ลบ');
          }
        }, {
          text: 'ลบ!',
          handler: () => {
            console.log(this.pic_del_api + data[1]);
			this.httpClient.delete(this.pic_del_api + data[1])
			.subscribe(res => {
				console.log(res);
				}, err => {
				console.log(err);
			});
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  }

}
