import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoints } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImageService(data) {
    return this.http.post(APIEndPoints.UPLOAD_IMAGE, data)
  }

  deleteOldImageService(data) {
    return this.http.post(APIEndPoints.DELTE_OLD_IMAGE, data)
  }
}
