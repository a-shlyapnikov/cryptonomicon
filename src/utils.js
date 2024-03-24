export const percentDifference = (assetPrice, marketPrice) => {
	return +(
		100 * Math.abs((assetPrice - marketPrice) / ((assetPrice, marketPrice) / 2))
	).toFixed(2);
};

export const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.substr(1);
};
