import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage, LocalStorage } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {
  private storage: any;
  LOOPBACK_API_SERVER: string = "http://localhost:3000";
  constructor(private http: HttpClient) {
    this.storage = localStorage;
  }

  public uploadFormData(formData, filename, caption) {
    console.log(caption);
    this.http.post(this.LOOPBACK_API_SERVER + '/api/cats?access_token=' + this.storage.getItem("access_token"),
     { "name": filename,
      "userId": this.storage.getItem("userId"),
      "caption": caption
    }).subscribe(
      (res) =>
      {
        this.http.post<any>(this.LOOPBACK_API_SERVER + '/api/storages/keep1/upload/',formData).subscribe(
          (res) => {
            console.log(res);
            console.log("Upload success!");
          },
          (err) => {console.log(err);}
        );
      },
      (err) =>
      {
        console.log(err);
        // return err;
      }
    );
  }

}
