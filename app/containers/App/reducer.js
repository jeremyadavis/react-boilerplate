/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
} from './actions';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

const appReducer = handleActions({
  [loadRepos]: (state) =>
    state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false),
  [reposLoaded]: (state, { payload }) =>
    state
      .setIn(['userData', 'repositories'], payload.repos)
      .set('loading', false)
      .set('currentUser', payload.username),
  [repoLoadingError]: (state, { payload }) =>
    state
      .set('error', payload.error)
      .set('loading', false),
}, initialState);

export default appReducer;
