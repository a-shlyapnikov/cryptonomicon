import { Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrypto } from '../../redux/slices/cryptoSlice';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import AppSider from './AppSider';

export default function AppLayout() {
	const { isLoading } = useSelector((state) => state.crypto);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCrypto());
	}, []);

	if (isLoading) {
		return <Spin fullscreen />;
	}
	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	);
}
