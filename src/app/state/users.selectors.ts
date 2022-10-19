import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../user/users.model';

export const selectUsers = createFeatureSelector<User>('users');

export const selectCollectionState =
  createFeatureSelector<User[]>('collection');

export const selectUserCollection = createSelector(
  selectUsers,
  selectCollectionState,
  (users, collection) => {
    return collection;
  }
);
