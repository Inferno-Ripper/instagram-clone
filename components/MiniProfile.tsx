import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';

const MiniProfile = (): any => {
	const user = useRecoilValue<IUser>(userRecoil);

	if (!user) return;

	const { email, displayName, photo } = user;

	return (
		<div className='flex items-center justify-between '>
			<div className='flex items-center gap-5'>
				{photo ? (
					<img
						src={photo}
						alt='profile picture'
						className='rounded-full w-[50px] h-[50px]'
					/>
				) : (
					<AccountCircle className='text-gray-500 rounded-full cursor-pointer w-14 h-14' />
				)}
				<div className='max-w-[190px] '>
					<p className='font-medium '>{displayName}</p>
					<p className='overflow-scroll text-sm text-zinc-500 hide-scrollbar'>
						{email}
					</p>
				</div>
			</div>

			<button className='text-[14px] font-bold text-light-blue hover:text-blue-700 transition-all duration-300'>
				Switch
			</button>
		</div>
	);
};

export default MiniProfile;
