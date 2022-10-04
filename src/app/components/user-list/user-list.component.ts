import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/users.model';
import { selectUserCollection } from 'src/app/state/users.selectors';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { debounce, map, Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email'];
  search = new FormControl('');
  bookCollection$ = this.store.select(selectUserCollection);
  subject = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookCollection$.subscribe((value) => {
      this.users = value;
    });
  }

  get filteredUsers() {
    if (this.search.value) {
      return this.users.filter(({ email }) =>
        email.toLowerCase().includes(this.search.value!.toLocaleLowerCase())
      );
    } else {
      return this.users;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
  }
}
