import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  LOOPBACK_API_SERVER: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  public uploadFormData(formData) {
    return this.http.post<any>(`${this.LOOPBACK_API_SERVER}/api/storages/keep1/upload/`, formData);
  }

}
