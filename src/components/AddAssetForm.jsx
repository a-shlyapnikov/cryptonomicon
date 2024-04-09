import {
	Button,
	DatePicker,
	Divider,
	Form,
	InputNumber,
	Result,
	Select,
	Space
} from 'antd';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import CoinInfo from './CoinInfo';

const validateMessages = {
	required: '${label} is required',
	types: {
		number: '${label} is not valid number'
	},
	number: {
		range: '${label} must be between ${min} and ${max}'
	}
};

export default function AddAssetForm({ onClose }) {
	const [form] = Form.useForm();
	const [coin, setCoin] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const { crypto } = useSelector((state) => state.crypto);
	const { addAsset } = useActions();
	const assetRef = useRef();
	console.log(addAsset);

	const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date()
		};
		assetRef.current = newAsset;
		addAsset(newAsset);
		setSubmitted(true);
	};

	const handleAmountChange = (value) => {
		const price = form.getFieldValue('price');
		form.setFieldsValue({
			total: +(value * price).toFixed(2)
		});
	};
	const handlePriceChange = (value) => {
		const amount = form.getFieldValue('amount');
		form.setFieldsValue({
			total: +(amount * value).toFixed(2)
		});
	};

	if (submitted) {
		return (
			<Result
				status='success'
				title='New Asset added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Close
					</Button>
				]}
			/>
		);
	}

	if (!coin) {
		return (
			<Select
				style={{ width: '100%' }}
				onSelect={(v) => setCoin(crypto.find((coin) => coin.id === v))}
				placeholder='Select coin'
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
		);
	}

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{
				span: 4
			}}
			wrapperCol={{
				span: 10
			}}
			style={{
				maxWidth: 600
			}}
			initialValues={{
				price: +coin.price.toFixed(2)
			}}
			onFinish={onFinish}
		>
			<CoinInfo coin={coin} />

			<Divider />

			<Form.Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0
					}
				]}
				validatemessages={validateMessages}
			>
				<InputNumber
					placeholder='Enter coin amount'
					onChange={handleAmountChange}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label='Price' name='price'>
				<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item label='Date & Time ' name='date'>
				<DatePicker showTime />
			</Form.Item>

			<Form.Item label='Total' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Add asset
				</Button>
			</Form.Item>
		</Form>
	);
}
