import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/users.model';
import { selectUserCollection } from 'src/app/state/users.selectors';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { debounce, map, Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUser: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email'];
  search = new FormControl('');
  bookCollection$ = this.store.select(selectUserCollection);
  results$!: Observable<any>;
  subject = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookCollection$.subscribe((value) => {
      this.users = value;
      this.filteredUser = value;
    });
    this.results$ = this.subject.pipe(
      debounce(() => interval(1000)),
      map((searchText: any) =>
        this.users.filter(({ email }) =>
          email.toLowerCase().includes(searchText.toLocaleLowerCase())
        )
      )
    );
  }

  filterUsers() {
    if (this.search.value) {
      this.subject.next(this.search.value);
      this.results$.subscribe((value) => (this.filteredUser = value));
    } else {
      this.filteredUser = this.users;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
  }
}
