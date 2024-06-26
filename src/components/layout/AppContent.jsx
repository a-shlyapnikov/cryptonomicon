import { Layout, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AssetsTable from '../AssetsTable';
import PortfolioChart from '../PortfolioChart';
const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem'
};
export default function AppContent() {
	const { assets, crypto } = useSelector((state) => state.crypto);
	const isMounted = useRef(false);
	const cryptoPriceMap = crypto.reduce((acc, coin) => {
		acc[coin.id] = coin.price;
		return acc;
	}, {});

	useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(assets);
			localStorage.setItem('assets', json);
		}
		isMounted.current = true;
	}, [assets]);

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title style={{ textAlign: 'left', color: '#fff' }} level={3}>
				Portfolio: 
				{assets
					.map((asset) => asset.amount * cryptoPriceMap[asset.id])
					.reduce((acc, value) => acc + value, 0)
					.toFixed(2)}
				$
			</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	);
}
