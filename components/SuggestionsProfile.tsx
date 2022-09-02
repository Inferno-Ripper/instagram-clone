import Image from 'next/image';
import React from 'react';

interface IUser {
	userName: string;
	avatar: string;
}

const SuggestionsProfile = ({ userName, avatar }: IUser) => {
	return (
		<div className='flex items-center justify-between '>
			<div className='flex gap-5'>
				<Image
					priority
					src={avatar}
					objectFit='fill'
					height={'40px'}
					width={'40px'}
					alt='profile picture'
					className='rounded-full'
				/>
				<p className='text-[15px] font-bold'>{userName}</p>
			</div>

			<button className='text-[14px] font-bold text-light-blue'>Follow</button>
		</div>
	);
};

export default SuggestionsProfile;
