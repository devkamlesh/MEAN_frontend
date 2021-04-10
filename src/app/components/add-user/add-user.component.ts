import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { APIEndPoints } from 'src/app/config/constants';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    profile: new FormControl('', [Validators.required])
  })
  profileImage: any;
  selectImage: any;
  imageBasePath = APIEndPoints.API_BASE_URL.split('/api').join('');

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private imageService: ImageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.data && this.data._id) {
      this.getUserById(this.data._id);
    }
  }

  get first_name() { return this.userForm.get('first_name') }
  get last_name() { return this.userForm.get('last_name') }
  get email() { return this.userForm.get('email') }
  get phone() { return this.userForm.get('phone') }
  get profile() { return this.userForm.get('profile') }

  closeDialog() {
    this.dialogRef.close();
  }

  addUserData() {
    if (!this.profile.value) {
      this.toastr.info("Please upload profile picture")
    }
    else if (this.userForm.valid) {
      this.userService.addUserService(this.userForm.value).subscribe((data: any) => {
        if (data && data.data && !data.message) {
          this.toastr.success("User added successfully!!!")
          this.userForm.reset();
          this.closeDialog();
        } else {
          this.toastr.warning(data.message);
        }
      }, err => {
        console.log(err);
      })
    }
  }

  onFileSelect(event) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].size > 2000000) {
        this.toastr.error("Please enter image less than 2MB", "Image size overload");
      } else {
        if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/gif') {
          this.profileImage = event.target.files[0];
        } else {
          this.toastr.error("Please select image only", "Type Mismatched")
        }
      }
    }
  }

  onUpload() {
    if (this.profileImage) {
      if (this.selectImage) {
        this.deleteOldImages(this.selectImage)
      }
      const formData = new FormData();
      formData.append('images', this.profileImage)
      this.uploadServiceMethod(formData)
    }
  }

  uploadServiceMethod(formData) {
    this.imageService.uploadImageService(formData).subscribe((data: any) => {
      if (data && data.data) {
        this.selectImage = data.data.path;
        if (this.selectImage) {
          this.profile.patchValue(this.selectImage);
          this.toastr.success("image uploaded successfully.");
          if (this.data && this.data._id) {
            this.updateUser();
          }
        }
      }
    }, err => {
      console.log(err);
    })
  }

  deleteOldImages(image) {
    const data = { images: image }
    this.imageService.deleteOldImageService(data).subscribe((data: any) => {
      if (data && data.data) {
        this.selectImage = '';
      }
    }, err => {
      console.log(err);
    })
  }

  getUserById(_id) {
    this.userService.getUserByIdService(_id).subscribe((data: any) => {
      if (data && data.data) {
        this.first_name.patchValue(data.data.first_name);
        this.last_name.patchValue(data.data.last_name);
        this.email.patchValue(data.data.email);
        this.phone.patchValue(data.data.phone);
        this.profile.patchValue(data.data.profile);
        this.selectImage = data.data.profile;
      }
    }, err => {
      console.log(err);
    })
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUserService(this.data._id, this.userForm.value).subscribe((data: any) => {
        if (data && data.data) {
          this.toastr.success("User updated successfully.");
          this.closeDialog();
        }
      }, err => {
        if (err && err.error && err.error.message) {
          if (err.error.message.includes('E11000')) {
            this.toastr.success("Email already present")
          }
        }
        console.log(err);
      })
    }
  }
}
