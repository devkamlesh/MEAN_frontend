import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ViewUserDetailsComponent } from '../view-user-details/view-user-details.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  displayedColumns = ['first_name', 'last_name', 'email', 'action'];
  dataSource: any;
  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  openAddUser(id) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '80%',
      data: { _id: id ? id : null },
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe(d => {
      this.getUsers();
    })
  }

  getUsers() {
    this.userService.getUsersService().subscribe((data: any) => {
      if (data && data.data && data.data.length) {
        this.dataSource = data.data;
      }
    }, err => {
      console.log(err);
    })
  }

  openUserDetails(id) {
    const dialgoRef = this.dialog.open(ViewUserDetailsComponent, {
      width: '500px',
      data: { _id: id },
      disableClose: true,
    })
    dialgoRef.afterClosed().subscribe(data => {
      if (data) {
        this.getUsers();
      }
    })
  }
}
