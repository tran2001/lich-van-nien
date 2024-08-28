import { configureStore } from "@reduxjs/toolkit";
import yearReducer from "../features/yearSlice";
import functionReducer from "../features/functionSlice";
import stepReducer from "../features/stepSlice";
import listDayReducer from "../features/listDaySlice";
import { dayApi } from "../services/day";
import focusDayReducer from "../features/focusDaySlice";
import descriptionReducer from "../features/descriptionSlice";

export const store = configureStore({
  reducer: {
    year: yearReducer,
    functions: functionReducer,
    step: stepReducer,
    listDay: listDayReducer,
    [dayApi.reducerPath]: dayApi.reducer,
    focusDay: focusDayReducer,
    description: descriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dayApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
