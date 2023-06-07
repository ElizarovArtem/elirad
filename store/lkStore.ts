import { create } from 'zustand';
import axios from 'axios';
import * as querystring from 'querystring';
import { TGetOrdersFilter, TOrder } from '@/types/orders';
import getConfig from '@/utils/getConfig';

const axiosInstance = axios.create({
	baseURL: `${getConfig().apiUrl}/lk`,
	withCredentials: true,
});

interface ILkStore {
	orders: TOrder[];
	answer: {
		message: {
			role: string;
			content: string;
		};
		finish_reason: string;
		index: number;
	}[];
	messages: string[];
	getOrders: (filter?: TGetOrdersFilter) => Promise<any>;
	chat: (message: string) => Promise<any>;
	chatLoading: boolean;
}

export const useLkStore = create<ILkStore>((set, getState) => ({
	orders: [],
	answer: [],
	messages: [],
	chatLoading: false,
	getOrders: async (filter) => {
		const response = await axiosInstance.get(
			'/orders?' + querystring.stringify(filter),
		);

		set({ orders: response.data.data });
	},
	chat: async (message) => {
		set({ messages: [...getState().messages, message], chatLoading: true });

		const response = await axios.get(
			`${getConfig().apiUrl}/chatGpt/chat?message=${getState().messages.join(
				';',
			)}`,
		);

		set({ answer: response.data.data, chatLoading: false });
	},
}));
