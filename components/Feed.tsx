import React, { useEffect, useState } from 'react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import SuggestionsProfile from './SuggestionsProfile';
import { faker } from '@faker-js/faker';
import Link from 'next/link';

interface IUser {
	userId: string;
	userName: string;
	avatar: string;
	followedBy: string;
}

const Feed = () => {
	const [usersSuggestions, setUsersSuggestions] = useState<IUser[]>([]);

	useEffect(() => {
		const usersSuggestionsArray: any[] = [];

		for (let i = 0; i < 5; i++) {
			usersSuggestionsArray.push(createRandomUser());
		}

		setUsersSuggestions(usersSuggestionsArray);
	}, []);

	const createRandomUser = (): IUser => {
		return {
			userId: faker.datatype.uuid(),
			userName: faker.internet.userName(),
			avatar: faker.image.avatar(),
			followedBy: `Followed By ${faker.name.fullName()}, ${faker.name.fullName()}`,
		};
	};

	return (
		<main className='flex gap-10 pt-6  justify-center min-h-[93vh] h-auto text-black dark:text-white bg-dark-white dark:bg-dark-dark '>
			{/* stories and posts section */}
			<section className='flex flex-col gap-2'>
				<Stories />
				<Posts />
			</section>

			{/* mini profile and users suggestions section */}
			<section className='flex-col hidden gap-6 mt-6 lg:flex w-80'>
				<MiniProfile />

				<div className='flex items-center justify-between '>
					<p className='font-bold text-zinc-500'>Suggestions For You</p>

					<Link href='/suggested-users'>
						<p className='hover:scale-110 pt-1 transition-all duration-300 text-[14px] font-bold cursor-pointer hover:underline underline-offset-4  '>
							See All
						</p>
					</Link>
				</div>

				<div className='space-y-4'>
					{usersSuggestions?.map(({ userId, userName, avatar, followedBy }) => {
						return (
							<SuggestionsProfile
								key={userId}
								userName={userName}
								avatar={avatar}
								followedBy={followedBy}
							/>
						);
					})}
				</div>

				<div className='space-y-4'>
					<p className='text-[14px] text-zinc-300 dark:text-zinc-500'>
						<span className='cursor-pointer hover:underline'> About</span> ·
						<span className='cursor-pointer hover:underline'> Help</span> ·
						<span className='cursor-pointer hover:underline'> Press</span> ·
						<span className='cursor-pointer hover:underline'> API</span> ·
						<span className='cursor-pointer hover:underline'> Jobs</span> ·
						<span className='cursor-pointer hover:underline'> Privacy</span> ·
						<span className='cursor-pointer hover:underline'> Terms</span> ·
						<span className='cursor-pointer hover:underline'> Locations</span> ·
						<span className='cursor-pointer hover:underline'> Language</span> ·
					</p>

					<p className=' text-zinc-300 dark:text-zinc-500'>
						© {new Date().getFullYear()} Inferno Ripper
					</p>
				</div>
			</section>
		</main>
	);
};

export default Feed;
