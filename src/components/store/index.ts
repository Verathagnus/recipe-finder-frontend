import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import careerReducer from './career/careerSlice';
import galleryReducer from './gallery/gallerySlice';
import eventReducer from './event/eventSlice';
import bookingReducer from './booking/bookingSlice';
import adminReducer from './admin/adminSlice';

export const store = configureStore({
    reducer: {
        career: careerReducer,
        gallery: galleryReducer,
        event: eventReducer,
        booking: bookingReducer,
        admin: adminReducer
    }
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;