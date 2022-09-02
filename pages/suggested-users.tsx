import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import SuggestionsProfile from '../components/SuggestionsProfile';
import Image from 'next/image';

interface IUser {
	userId: string;
	userName: string;
	avatar: string;
}

const suggestedUsers = () => {
	const [usersSuggestions, setUsersSuggestions] = useState<IUser[]>([]);

	useEffect(() => {
		const usersSuggestionsArray: any[] = [];

		for (let i = 0; i < 50; i++) {
			usersSuggestionsArray.push(createRandomUser());
		}

		setUsersSuggestions(usersSuggestionsArray);
	}, []);

	const createRandomUser = (): IUser => {
		return {
			userId: faker.datatype.uuid(),
			userName: faker.internet.userName(),
			avatar: faker.image.avatar(),
		};
	};

	return (
		<div>
			<Header />

			<div className=' min-h-[93vh]  flex flex-col gap-2 items-center  pt-6 text-black dark:text-white bg-dark-white dark:bg-dark-dark '>
				<p className='text-lg font-bold pl-1 min-w-[500px] w-[40%]'>
					Suggested
				</p>

				<div className='border overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-500 border-gray-200 p-4 rounded-lg   h-[75vh] min-w-[500px] w-[40%] dark:border-dark-border dark:bg-dark-light bg-full-white'>
					<div className='space-y-4 '>
						{usersSuggestions?.map(({ userId, userName, avatar }) => {
							return (
								<div
									className='flex items-center justify-between '
									key={userId}
								>
									<div className='flex gap-5'>
										<Image
											priority
											src={avatar}
											objectFit='fill'
											height={'50px'}
											width={'50px'}
											alt='profile picture'
											className='rounded-full cursor-pointer '
										/>
										<p className='text-[15px] font-bold cursor-pointer'>
											{userName}
										</p>
									</div>

									<button className='px-6 py-1 font-bold tracking-wide text-white transition-all duration-300 rounded-md hover:scale-105 hover:bg-blue-600 bg-light-blue'>
										Follow
									</button>
								</div>
							);
						})}
					</div>
				</div>

				<div className='flex flex-col gap-4 mt-4'>
					<div className='flex gap-4 '>
						<p className='suggested-users-page-link'>ABOUT</p>
						<p className='suggested-users-page-link'>HELP</p>
						<p className='suggested-users-page-link'>PRESS</p>
						<p className='suggested-users-page-link'>API</p>
						<p className='suggested-users-page-link'>JOBS</p>
						<p className='suggested-users-page-link'>PRIVACY</p>
						<p className='suggested-users-page-link'>TERMS</p>
					</div>
				</div>

				<div className='flex gap-4'>
					<p className='suggested-users-page-link'>LOCATIONS</p>
					<p className='text-sm font-normal no-underline suggested-users-page-link'>
						LANGUAGE
					</p>
				</div>

				<p className=' text-zinc-300 dark:text-zinc-500'>
					© {new Date().getFullYear()} Inferno Ripper
				</p>
			</div>
		</div>
	);
};

export default suggestedUsers;
