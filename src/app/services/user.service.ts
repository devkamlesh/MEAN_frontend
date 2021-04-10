import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoints } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  addUserService(data) {
    return this.http.post(APIEndPoints.USER, data)
  }

  getUsersService() {
    return this.http.get(APIEndPoints.USER)
  }

  getUserByIdService(_id) {
    return this.http.get(`${APIEndPoints.USER}/${_id}`)
  }

  updateUserService(_id, data) {
    return this.http.post(`${APIEndPoints.UPDATE_USER}/${_id}`, data);
  }

  deleteUserService(_id) {
    return this.http.delete(`${APIEndPoints.DELETE_USER}/${_id}`)
  }
}
