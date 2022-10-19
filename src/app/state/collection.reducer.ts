import { createReducer, on } from '@ngrx/store';
import { User } from '../user/users.model';
import { addUser } from './users.actions';

let result = document.cookie;
export const initialState: ReadonlyArray<User> = result
  ? [...JSON.parse(result)]
  : [];

export const collectionReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => {
    const users = JSON.stringify([...state, user]);

    document.cookie = users;
    console.log(document.cookie);
    return [...state, user];
  })
);
