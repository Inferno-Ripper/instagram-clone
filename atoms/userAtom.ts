import { atom } from 'recoil';

export interface IUser {
	email: string;
	displayName: string;
	photo: string;
	uid: string;
}

export const userRecoil: any = atom({
	key: 'user',
	default: null,
});
