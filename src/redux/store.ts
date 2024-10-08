// src/store.ts
import {
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './rtk-query/auth';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/auth';
import { communityApi } from './rtk-query/community';
import { userApi } from './rtk-query/user';
import { visitorApi } from './rtk-query/visitor';
import { airbnbApi } from './rtk-query/airbnb';
import { productApi } from './rtk-query/product';
import { businessApi } from './rtk-query/business';
import { vehicleApi } from './rtk-query/vehicle';
import { foundItemApi } from './rtk-query/foundItems';
import { lostItemApi } from './rtk-query/lostItem';
import { alertApi } from './rtk-query/alert';
import { featuredApi } from './rtk-query/featured';
import { meetingApi } from './rtk-query/meeting';
import { communityLeaderApi } from './rtk-query/communityLeader';
import { chartDataApi } from './rtk-query/chartData';

export const resetStoreAction = createAction('RESET_STORE');
const persistConfig = {
  key: 'root',
  storage,
  // You can add more configuration options here,
  // like 'whitelist' or 'blacklist' to selectively persist parts of the state.
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const rootReducerWithReset = (state: any, action: any) => {
  if (action.type === resetStoreAction.type) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithReset);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [visitorApi.reducerPath]: visitorApi.reducer,
    [airbnbApi.reducerPath]: airbnbApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [foundItemApi.reducerPath]: foundItemApi.reducer,
    [lostItemApi.reducerPath]: lostItemApi.reducer,
    [alertApi.reducerPath]: alertApi.reducer,
    [featuredApi.reducerPath]: featuredApi.reducer,
    [meetingApi.reducerPath]: meetingApi.reducer,
    [communityLeaderApi.reducerPath]: communityLeaderApi.reducer,
    [chartDataApi.reducerPath]: chartDataApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      communityApi.middleware,
      userApi.middleware,
      visitorApi.middleware,
      airbnbApi.middleware,
      productApi.middleware,
      businessApi.middleware,
      vehicleApi.middleware,
      foundItemApi.middleware,
      lostItemApi.middleware,
      alertApi.middleware,
      featuredApi.middleware,
      meetingApi.middleware,
      communityLeaderApi.middleware,
      chartDataApi.middleware,
    ),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
