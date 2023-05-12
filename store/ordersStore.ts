import { create } from 'zustand';
import axios from 'axios';
import {
	CreateOrderFromMainPagePayload,
	CreateOrderPayload,
	TOrder,
} from '@/types/orders';
import { useMessageStore } from '@/store/messageStore';
import { useLkStore } from '@/store/lkStore';
import getConfig from '@/utils/getConfig';

const axiosInstance = axios.create({
	baseURL: `${getConfig().apiUrl}`,
	withCredentials: true,
});

interface IOrdersStore {
	orders: TOrder[];
	error: string;
	isCreateOrderModalOpen: boolean;
	createOrder: (data: CreateOrderPayload) => Promise<any>;
	createOrderFromMainPage: (
		data: CreateOrderFromMainPagePayload,
	) => Promise<any>;
	setIsCreateOrderModalOpen: (isCreateOrderModalOpen: boolean) => void;
	updateOrder: (data: Record<string, any>) => Promise<any>;
	setError: (error: string) => void;
	isLoading: boolean;
}

export const useOrdersStore = create<IOrdersStore>((set) => ({
	orders: [],
	error: '',
	isCreateOrderModalOpen: false,
	isLoading: false,
	createOrder: async (data) => {
		set({ isLoading: true });

		const formData = new FormData();
		if (data.image?.[0]) {
			formData.append('image', data.image[0]?.originFileObj || '');
		}
		if (data.description) {
			formData.append('description', data.description);
		}
		formData.append('name', data.name);

		try {
			await axiosInstance.post('/orders/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (e) {
			console.log(e);
		}

		set({ isLoading: false, isCreateOrderModalOpen: false });
	},
	createOrderFromMainPage: async (data) => {
		set({ isLoading: true });

		try {
			await axiosInstance.post('/orders/createFromMain', data);
			useMessageStore
				.getState()
				.setType(
					'success',
					'Заказ успешно создан. Ожидайте звонок нашего менеджера!',
				);
		} catch (e) {
			console.log(e);
		}

		set({ isLoading: false });
	},
	updateOrder: async (data) => {
		set({ isLoading: true });

		const formData = new FormData();

		if (data._id) {
			formData.append('_id', data._id);
		}
		if (data.image?.[0]) {
			formData.append('image', data.image[0]?.originFileObj || '');
		}
		if (data.description) {
			formData.append('description', data.description);
		}
		if (data.name) {
			formData.append('name', data.name);
		}
		if (data.status) {
			formData.append('status', data.status);
		}
		if (data.price) {
			formData.append('price', data.price);
		}
		if ('isMainPageFixed' in data) {
			formData.append('isMainPageFixed', JSON.stringify(data.isMainPageFixed));
		}

		try {
			await axiosInstance.post('/lk/orders', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			await useLkStore.getState().getOrders();
		} catch (e) {
			console.log(e);
		}

		set({ isLoading: false });
	},
	setIsCreateOrderModalOpen: (isCreateOrderModalOpen) => {
		set({ isCreateOrderModalOpen });
	},
	setError: (error: string) => {
		set({ error });
	},
}));
