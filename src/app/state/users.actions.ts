import { createAction, props } from '@ngrx/store';
import { User } from '../user/users.model';

export const addUser = createAction(
  '[User List] Add User',
  props<{ user: User }>()
);

export const retrievedUserList = createAction(
  '[User List/API] Retrieve User Success',
  props<{ users: ReadonlyArray<User> }>()
);