import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useRecoilState } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import { auth } from '../firebase';
import Link from 'next/link';

const MiniProfile = (): any => {
	const [user, setUser] = useRecoilState<IUser | any>(userRecoil);

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

				<Link href='/me'>
					<div className='max-w-[190px] cursor-pointer'>
						<p className='font-medium '>{displayName}</p>
						<p className='overflow-scroll text-sm text-zinc-500 hide-scrollbar'>
							{email}
						</p>
					</div>
				</Link>
			</div>

			<button
				onClick={() => {
					setUser(null);
					signOut(auth);
				}}
				className='text-[14px] font-bold text-light-blue hover:text-blue-700 transition-all duration-300'
			>
				Sign Out
			</button>
		</div>
	);
};

export default MiniProfile;
