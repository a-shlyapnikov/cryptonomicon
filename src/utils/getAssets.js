export function getAssetsFromLS() {
	const data = localStorage.getItem('assets');
	const assets = data ? JSON.parse(data) : [];
	return assets;
}