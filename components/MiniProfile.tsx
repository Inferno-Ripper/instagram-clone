import Image from 'next/image';
import React from 'react';

const MiniProfile = () => {
	return (
		<div className='flex items-center justify-between '>
			<div className='flex items-center gap-5'>
				<Image
					priority
					src='https://cdn.pixabay.com/photo/2019/06/04/16/07/mountains-4251750_1280.jpg'
					objectFit='fill'
					height={'60px'}
					width={'60px'}
					alt='profile picture'
					className='rounded-full'
				/>
				<div className=''>
					<p className='font-medium '>user_name</p>
					<p className='text-zinc-500 '>real name</p>
				</div>
			</div>

			<button className='text-[14px] font-bold text-light-blue hover:text-blue-700 transition-all duration-300'>
				Switch
			</button>
		</div>
	);
};

export default MiniProfile;
