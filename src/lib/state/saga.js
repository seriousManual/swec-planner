import { all } from 'redux-saga/effects'

import { watchActiveSessions } from './sagas/activeSession';
import { watchFavorites } from './sagas/favorites';
import { watchPromptGetDiscarded, watchPromptGetInitialized } from './sagas/prompt';
import { watchTheme } from './sagas/theme';
import { watchPushNotification } from './sagas/notifications';

export default function* () {
  yield all([
    watchActiveSessions(),
    watchFavorites(),
    watchPromptGetDiscarded(),
    watchPromptGetInitialized(),
    watchTheme(),
    watchPushNotification()
  ])
}
