import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage, LocalStorage, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('myNav') nav: NavController
  userlogin = {};
  private storage: any;
  error: string;

  constructor(public httpClient: HttpClient, public navCtrl: NavController) {
    this.storage = localStorage;
  }

  ngOnInit() {
  }

  logForm() {

    this.httpClient.post('http://localhost:3000/api/Users/login', this.userlogin).subscribe(
      (res) => {
        console.log(res);
        this.storage.setItem("access_token", res["id"]);
        this.storage.setItem("userId", res["userId"]);
        console.log(this.storage.getItem("access_token"));
        console.log(this.storage.getItem("userId"));
        this.navCtrl.navigateForward('/home');
      },
      (err) => {
        console.log(err);
        this.error = "Username or password is incorrect";
      }
    );

    console.log(this.userlogin)
  }
}
