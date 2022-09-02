import React from 'react';
import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
	return (
		<main className='flex pt-5 justify-center min-h-[93vh] h-auto text-black dark:text-white bg-dark-white dark:bg-dark-dark '>
			<section className='flex flex-col gap-5'>
				<Stories />
				<Posts />
			</section>

			<section>
				{/* mini profile */}
				{/* suggestions */}
			</section>
		</main>
	);
};

export default Feed;
