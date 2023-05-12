import { create } from 'zustand';
import { NoticeType } from 'antd/es/message/interface';

interface IMessageStore {
	type: NoticeType | null;
	setType: (type: NoticeType | null, message: string) => void;
	message: string;
}

export const useMessageStore = create<IMessageStore>((set) => ({
	type: null,
	message: '',
	setType: (type, message) => set({ type, message }),
}));
