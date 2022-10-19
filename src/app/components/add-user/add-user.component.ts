import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { addUser } from 'src/app/state/users.actions';
import { User } from 'src/app/user/users.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onAdd(user: User) {
    this.store.dispatch(addUser({ user }));
  }

  onSubmit() {
    const newId = uuidv4();
    this.onAdd({
      name: this.userForm.value.name!,
      email: this.userForm.value.email!,
      id: newId,
    });
  }
}
