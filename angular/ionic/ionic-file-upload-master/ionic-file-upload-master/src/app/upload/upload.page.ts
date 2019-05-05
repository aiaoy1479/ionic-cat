import { Component, OnInit } from '@angular/core';

import { UploadingService } from '../uploading.service';

import { Storage, LocalStorage } from '@ionic/angular';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {



  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  private storage: any;
  public caption;


  constructor(private uploadingService: UploadingService) {
    this.storage = localStorage;
  }


  ngOnInit() {
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }




  uploadFiles() {

    let files = this.getFiles();
    let requests = [];

    console.log(this.storage.getItem("access_token"));
    console.log(this.caption);
//    this.storage.setItem("caption", this.caption);
//    console.log(this.storage.getItem("caption"));

    console.log("files", files);
    files.forEach((file) => {
      let formData = new FormData();
	  formData.append('file' , file.rawFile, file.name);
      requests.push(this.uploadingService.uploadFormData(formData, file.name, this.caption));

    });


  }

}
