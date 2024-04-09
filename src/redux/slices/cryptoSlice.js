import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { percentDifference } from '../../utils/utils';
import { getAssetsFromLS } from '../../utils/getAssets';

export const fetchCrypto = createAsyncThunk(
	'crypto/fetchCryptoStatus',
	async () => {
		const res = await fetch('https://openapiv1.coinstats.app/coins', {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'X-API-KEY': 'hhIDDJkPKe1iS3JV0bg00VeSxdvhljGILIf1YdXFbNo='
			}
		});
		const data = await res.json();
		return data.result;
	}
);

const cryptoSlice = createSlice({
	name: 'crypto',
	initialState: {
		assets: getAssetsFromLS(),
		crypto: [],
		loading: true
	},
	reducers: {
		addAsset(state, action) {
			state.assets.push(action.payload);
			state.assets = state.assets.map((asset) => {
				const coin = state.crypto.find((c) => c.id === asset.id);
				return {
					grow: asset.price < coin.price,
					growPersent: percentDifference(asset.price, coin.price),
					totalAmount: asset.amount * coin.price,
					totalProfit: asset.amount * coin.price - asset.amount * asset.price,
					name: coin.name,
					...asset
				};
			});
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCrypto.pending, (state) => {
				state.crypto = [];
				state.loading = true;
			})
			.addCase(fetchCrypto.fulfilled, (state, action) => {
				(state.crypto = action.payload), (state.loading = false);
			})
			.addCase(fetchCrypto.rejected, (state) => {
				state.crypto = [];
				state.loading = false;
			});
	}
});

export const { addAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;
