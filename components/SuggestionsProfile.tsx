import Image from 'next/image';
import React from 'react';

interface IUser {
	userName: string;
	avatar: string;
	followedBy: string;
}

const SuggestionsProfile = ({ userName, avatar, followedBy }: IUser) => {
	return (
		<div className='flex items-center justify-between '>
			<div className='flex gap-5'>
				<img
					src={avatar}
					alt='profile picture'
					className='w-10 h-10 rounded-full'
				/>
				<div className='flex flex-col max-w-[180px] overflow-hidden'>
					<p className='text-[15px] font-bold'>{userName}</p>
					<p className='text-xs text-gray-500 whitespace-nowrap'>
						{followedBy}
					</p>
				</div>
			</div>

			<button className='text-[14px] font-bold hover:text-blue-700 transition-all duration-300 text-light-blue'>
				Follow
			</button>
		</div>
	);
};

export default SuggestionsProfile;
