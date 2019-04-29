import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user = {};
  success: any;
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {}
  
  signForm() {
	  
	  this.httpClient.post('http://localhost:3000/api/Users', this.user).subscribe(
      (res) => {
        console.log(res);
		this.success = "success";
      },
      (err) => {  
        console.log(err);
		this.success = "error";
      }
    );
	  
	  console.log(this.user)
  }

}
