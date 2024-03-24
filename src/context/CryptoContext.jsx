import { createContext, useContext, useEffect, useState } from 'react';
import { fakeFetchAssets, fakeFetchData } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false
});

export function CryptoContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false);
	const [crypto, setCrypto] = useState([]);
	const [assets, setAssets] = useState([]);

	const mapAssets = (assets, crypto) => {
		return assets.map((asset) => {
			const coin = crypto.find((c) => c.id === asset.id);
			return {
				grow: asset.price < coin.price,
				growPersent: percentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset
			};
		});
	};

	const addAsset = (newAsset) => {
		setAssets((prev) => mapAssets([...prev, newAsset], crypto));
	};

	useEffect(() => {
		const preload = async () => {
			setIsLoading(true);
			const { result } = await fakeFetchData();
			const assets = await fakeFetchAssets();
			setCrypto(result);
			setAssets(mapAssets(assets, result));
			setIsLoading(false);
		};
		preload();
	}, []);

	return (
		<CryptoContext.Provider value={{ isLoading, crypto, assets, addAsset }}>
			{children}
		</CryptoContext.Provider>
	);
}

export default CryptoContext;

export function useCrypto() {
	return useContext(CryptoContext);
}
