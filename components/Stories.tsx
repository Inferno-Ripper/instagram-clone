import React, { useEffect, useRef, useState } from 'react';
import Story from './Story';
import { faker } from '@faker-js/faker';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

interface IUser {
	userId: string;
	userName: string;
	avatar: string;
}

const Stories = () => {
	const [usersStories, setUsersStories] = useState<IUser[]>([]);

	const storiesScrollbar = useRef<HTMLDivElement>(null);

	const createRandomUser = (): IUser => {
		return {
			userId: faker.datatype.uuid(),
			userName: faker.name.firstName(),
			avatar: faker.image.avatar(),
		};
	};

	useEffect(() => {
		const usersStoriesArray: any[] = [];

		for (let i = 0; i < 20; i++) {
			usersStoriesArray.push(createRandomUser());
		}

		setUsersStories(usersStoriesArray);
	}, []);

	const scroll = (scrollOffset: number) => {
		if (storiesScrollbar && storiesScrollbar.current) {
			storiesScrollbar.current.scrollLeft += scrollOffset;
		}
	};

	return (
		<div
			ref={storiesScrollbar}
			className='hide-scrollbar  w-[400px] relative border rounded-lg h-28 sm:h-32 p-1 scroll-smooth overflow-scroll whitespace-nowrap border-gray-200 flex  items-center bg-full-white sm:w-[500px] dark:bg-dark-light dark:border-dark-border'
		>
			{/* left scroll button */}
			<div
				className='sticky left-0 z-40 rotate-90 cursor-pointer'
				onClick={() => scroll(-200)}
			>
				<ExpandCircleDownIcon className='transition-all duration-200 opacity-70 hover:scale-125 hover:opacity-100 ' />
			</div>

			{/* stories */}
			<div className='flex items-center gap-2'>
				{usersStories?.map(({ userId, userName, avatar }) => {
					return <Story key={userId} userName={userName} avatar={avatar} />;
				})}
			</div>

			{/* right scroll button */}
			<div
				className='sticky right-0 z-40 -rotate-90 cursor-pointer '
				onClick={() => scroll(200)}
			>
				<ExpandCircleDownIcon className='transition-all duration-200 opacity-70 hover:scale-125 hover:opacity-100' />
			</div>
		</div>
	);
};

export default Stories;
