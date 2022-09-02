import React from 'react';
import Stories from './Stories';

const Feed = () => {
	return (
		<main className='flex pt-12 justify-center min-h-[93vh] text-black dark:text-white bg-dark-white dark:bg-dark-dark '>
			<section>
				<Stories />
				{/* posts */}
			</section>

			<section>
				{/* mini profile */}
				{/* suggestions */}
			</section>
		</main>
	);
};

export default Feed;
