import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoinInfoModal';

export default function AppHeader() {
	const [select, setSelect] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [coin, setCoin] = useState(null);
	const [drawer, setDrawer] = useState(false);

	const handleSelect = (value) => {
		setCoin(crypto.find((coin) => coin.id === value));
		setIsModalOpen(true);
	};
	const { crypto } = useSelector((state) => state.crypto);

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === '/') {
				setSelect((prev) => !prev);
			}
		};
		document.addEventListener('keypress', keypress);
		return () => document.removeEventListener('keypress', keypress);
	}, []);

	const headerStyle = {
		width: '100%',
		textAlign: 'center',
		height: 60,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	};
	return (
		<Layout.Header style={headerStyle}>
			<Select
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
				style={{ width: 250 }}
				value='press / to open'
				onChange={handleSelect}
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon
				}))}
				optionRender={(option) => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.label}
						/>
						{option.data.label}
					</Space>
				)}
			/>
			<Button onClick={() => setDrawer(true)} type='primary'>
				Add Asset
			</Button>

			<Modal
				open={isModalOpen}
				onOk={() => setIsModalOpen(false)}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<CoinInfoModal coin={coin} />
			</Modal>
			<Drawer
				width={600}
				destroyOnClose
				title='Add asset'
				onClose={() => setDrawer(false)}
				open={drawer}
			>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Layout.Header>
	);
}
