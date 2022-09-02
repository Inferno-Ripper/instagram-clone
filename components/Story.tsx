import Image from 'next/image';
import React, { FC } from 'react';

interface IUser {
	userName: string;
	avatar: string;
}

const Story: FC<IUser> = ({ userName, avatar }): JSX.Element => {
	return (
		<div className='flex flex-col items-center w-20 h-full gap-1 py-2 overflow-hidden cursor-pointer'>
			<div className='flex items-center justify-center p-[4px] border-red-400 border-2 rounded-full hover:scale-105 transition-all duration-300'>
				<Image
					className='rounded-full '
					width={55}
					height={55}
					layout='fixed'
					src={avatar}
					alt=''
				/>
			</div>
			<p className='text-sm '>{userName}</p>
		</div>
	);
};

export default Story;
