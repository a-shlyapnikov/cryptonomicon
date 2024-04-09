import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addAsset } from '../redux/slices/cryptoSlice';


export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(
		() => bindActionCreators({ addAsset }, dispatch),
		[dispatch]
	);
};
