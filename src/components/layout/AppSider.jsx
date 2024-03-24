import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { capitalize } from '../../utils';
const siderStyle = {
	padding: '1rem'
};

export default function AppSider() {
	// const { assets } = useContext(CryptoContext);
	const { assets } = useSelector((state) => state.crypto);

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map((asset) => (
				<Card key={asset.id} style={{ marginBottom: '1rem' }}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='%'
					/>
					<List
						size='small'
						dataSource={[
							{
								title: 'Total Profit',
								value: asset.totalProfit,
								withTag: true
							},
							{ title: 'Asset amount', value: asset.amount, isPlain: true }
						]}
						renderItem={(item) => (
							<List.Item>
								<span>{item.title}</span>
								<span>
									{item.withTag && (
										<Tag color={asset.grow ? 'green' : 'red'}>
											{asset.growPersent}%
										</Tag>
									)}
									{item.isPlain && item.value.toFixed(2)}
									{!item.isPlain && (
										<Typography.Text type={asset.grow ? 'success' : 'danger'}>
											{item.value.toFixed(2)}$
										</Typography.Text>
									)}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	);
}