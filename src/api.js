import { cryptoAssets, cryptoData } from './data';

export const fakeFetchData = () => {
	return new Promise((res) => {
		setTimeout(() => {
			res(cryptoData);
		}, 2000);
	});
};

export const fakeFetchAssets = () => {
	return new Promise((res) => {
		setTimeout(() => {
			res(cryptoAssets);
		}, 2000);
	});
};

