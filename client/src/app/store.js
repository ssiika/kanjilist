import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice'
import kanjiReducer from '../features/kanji/kanjiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kanji: kanjiReducer,
  },
});
