import { createReducer, on } from '@ngrx/store';

import { retrievedUserList } from './users.actions';
import { User } from '../user/users.model';

export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
  initialState,
  on(retrievedUserList, (state, { users }) => users)
);
