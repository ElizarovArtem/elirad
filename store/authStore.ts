import { create } from 'zustand';
import * as publicIp from 'public-ip';
import axios, { AxiosError } from 'axios';
import { UserRoles } from '@/utils/constants';
import getConfig from '@/utils/getConfig';

const axiosInstance = axios.create({
	baseURL: `${getConfig().apiUrl}`,
	withCredentials: true,
});

interface IAuthStore {
	_id: string;
	name: string;
	phone: string;
	email: string;
	isLoading: boolean;
	role: UserRoles;
	isCodeSent: boolean;
	error: string | null;
	isAuthModalOpen: boolean;
	setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
	requestCode: (phone: string) => void;
	login: (code: string, phone: string) => Promise<any>;
	logout: () => void;
	setError: (error: string) => void;
	checkAuth: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
	_id: '',
	name: '',
	phone: '',
	email: '',
	role: UserRoles.UNAUTHORIZED,
	isAuthModalOpen: false,
	isLoading: false,
	isCodeSent: false,
	error: null,
	setIsAuthModalOpen: (isAuthModalOpen) => {
		set({ isAuthModalOpen });
	},
	requestCode: async (phone) => {
		set({ isLoading: true });
		try {
			const ip = await publicIp.publicIpv4();

			await axiosInstance.post(
				'/auth/request-code',
				{ phone },
				{
					headers: {
						'Content-type': 'application/json',
						ip: ip,
					},
				},
			);
			set({ isCodeSent: true });
		} catch (error) {
			set({ error: (error as Error).message });
		} finally {
			set({ isLoading: false });
		}
	},
	login: async (code, phone) => {
		set({ isLoading: true });
		try {
			const response = await axiosInstance.post(
				'/auth/login',
				{ code, phone },
				{
					headers: {
						'Content-type': 'application/json',
					},
				},
			);

			set({ ...response.data.data, isAuthModalOpen: false });
		} catch (error) {
			const errorBody = (error as AxiosError).message;
			set({ error: errorBody });
		} finally {
			set({ isLoading: false, isCodeSent: false });
		}
	},
	checkAuth: async () => {
		set({ isLoading: true });
		try {
			const response = await axiosInstance.get('/auth/check_auth');

			set({ ...response.data.data });
		} catch (error) {
			set({ error: (error as AxiosError).message });
		} finally {
			set({ isLoading: false });
		}
	},
	logout: async () => {
		set({ isLoading: true });
		try {
			await axiosInstance.post('/auth/logout');

			set({
				_id: '',
				name: '',
				phone: '',
				email: '',
				role: UserRoles.UNAUTHORIZED,
			});
		} catch (error) {
			set({ error: (error as AxiosError).message });
		} finally {
			set({ isLoading: false });
		}
	},
	setError: (error: string) => {
		set({ error });
	},
}));
