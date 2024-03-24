import { configureStore } from '@reduxjs/toolkit';
import crypto from './slices/cryptoSlice';
export const store = configureStore({
	reducer: {
		crypto
	}
});
