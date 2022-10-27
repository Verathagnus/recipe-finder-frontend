import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import galleryReducer from './gallery/gallerySlice';
// import bookingReducer from './booking/bookingSlice';
import adminReducer from './admin/adminSlice';
import recipeReducer from './recipe/recipeSlice';
import ingredientReducer from './ingredient/ingredientSlice';

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        gallery: galleryReducer,
        recipe: recipeReducer,
        ingredient: ingredientReducer,
    }
});
 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;