import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Storage, LocalStorage, NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  pic: Observable<any>;
  pic_uri: any = [];
  pic_api: string = "http://localhost:3000/api/storages/keep1/download/";
  pic_del_api: string = "http://localhost:3000/api/storages/keep1/files/"
  cat_del_api: string = "http://localhost:3000/api/cats/"
//  users: any = [];
  comments: Observable<any>;
  ment_user: Observable<any>;
  public comment;
  constructor(public httpClient: HttpClient) {

    this.storage = localStorage;

    // โพสท์ทั้งหมดของทุกคน

    this.pic = this.httpClient.get('http://localhost:3000/api/cats?access_token=' + this.storage.getItem("access_token"));
    this.pic.subscribe(data => {
      console.log(data);
      console.log(data.length);

      for (var i = 0; i < data.length; i++)
      {
        console.log(data[i]);
        let pic_name_api = this.pic_api + data[i].name;
        let pic_name = data[i].name;
        let pic_id = data[i].id;
        let pic_cap = data[i].caption;
        let pic_comment = [];
        let users = [];
        this.comments = this.httpClient.get('http://localhost:3000/api/Comments?access_token=' + c + "&filter={\"where\":{\"picId\":\""+ pic_id +"\"}}");
        this.comments.subscribe(data2 =>{
          console.log(data2);
          pic_comment = data2;
        }); // get comments
        this.ment_user = this.httpClient.get('http://localhost:3000/api/Users/' + pic_comment.userId + '?access_token=' + this.storage.getItem("access_token"));
        this.ment_user.subscribe( data3 => {
          console.log(data3);
          users = data3;
        }); // get comment username from comment
        this.httpClient.get('http://localhost:3000/api/Users/' + data[i].userId + '?access_token=' + this.storage.getItem("access_token")).subscribe(users => {
            this.pic_uri.unshift([pic_name_api, pic_name, pic_id, users.username, pic_comment, pic_cap, users]);
        })
        console.log('my data: ', this.pic_api + data[i].name);
      }
    });

  }

  ngOnInit() {
  }

// คอมเม้นใต้โพทส์
  postcomment(pic_id) {
    console.log(pic_id);
    console.log(this.comment);
    this.httpClient.post('http://localhost:3000/api/Comments?access_token=' + this.storage.getItem("access_token"),
    {
      "text": this.comment,
      "userId": this.storage.getItem("userId"),
      "picId": pic_id
    }).subscribe((res) => {console.log(res);});
  }

}
