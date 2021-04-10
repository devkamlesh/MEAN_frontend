import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { APIEndPoints } from 'src/app/config/constants';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.scss']
})
export class ViewUserDetailsComponent implements OnInit {

  imageBasePath = APIEndPoints.API_BASE_URL.split('/api').join('');
  userData: any;

  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: ToastrService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    if (this.data._id) {
      this.getUser(this.data._id);
    }
  }

  getUser(_id) {
    this.userService.getUserByIdService(_id).subscribe((data: any) => {
      if (data && data.data) {
        this.userData = data.data;
      }
    }, err => {
      console.log(err);
    })
  }

  closeDialog(data) {
    this.dialogRef.close(data);
  }

  deleteUser() {
    this.userService.deleteUserService(this.data._id).subscribe((data: any) => {
      if (data && data.data) {
        this.closeDialog(data);
        this.imageService.deleteOldImageService({images:data.data.profile}).subscribe((data: any) => {
          if (data && data.data) {
            console.log("image deleted successfully");
          }
        }, err => {
          console.log(err);
        })
        this.toastr.info("User deleted successfully!");
      }
    }, err => {
      console.log(err);
    })
  }
}
