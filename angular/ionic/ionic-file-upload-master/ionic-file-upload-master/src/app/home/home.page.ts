import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pic: Observable<any>;
  pic_uri: any= [];
  pic_api: string = "http://localhost:3000/api/storages/keep1/download/";
  constructor(public httpClient: HttpClient) { 

    this.pic = this.httpClient.get('http://localhost:3000/api/storages/keep1/files');
    this.pic
    .subscribe(data => {
		console.log(data.length);
	  for (var i=0; i<data.length; i++)
	  {
		console.log('my data: ', this.pic_api + data[i].name);
		this.pic_uri.push(this.pic_api + data[i].name);
	  }
    })
	
  }

}
