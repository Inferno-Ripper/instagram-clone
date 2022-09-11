import { onAuthStateChanged } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import Header from '../components/Header';
import { auth, db } from '../firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import MiniPost from '../components/MiniPost';

const me: NextPage = () => {
	const router = useRouter();
	const [user, setUser] = useRecoilState<IUser | any>(userRecoil);
	const [userPosts, setUserPosts] = useState<any>();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			// The signed-in user info.
			if (user) {
				const { displayName, email, uid, photoURL: photo } = user;

				setUser({ displayName, email, uid, photo });
			} else if (!user) {
				router.push('/signin');
			}
		});
	}, []);

	useEffect(() => {
		if (user) {
			onSnapshot(
				query(
					collection(db, 'posts'),
					where('userName', '==', user?.displayName)
				),
				(snapshot) => {
					setUserPosts(snapshot.docs);
				}
			);
		}
	}, [user]);

	return (
		<div className='min-h-screen min-w-screen bg-dark-white dark:bg-dark-dark'>
			<Header />

			<div className='flex flex-col items-center w-full h-full p-4 '>
				<div className='w-full xl:w-[70%] 2xl:w-[60%]'>
					{/* head of the page */}
					<div className='flex items-center gap-4 md:mb-10 md:gap-20 '>
						{user?.photo ? (
							<img
								className='w-20 h-20 mr-1 rounded-full xl:ml-20 md:w-44 md:h-44'
								src={user?.photo}
							/>
						) : (
							<AccountCircleIcon className='w-24 h-24 text-gray-500 xl:ml-20 md:w-48 md:h-48 ' />
						)}

						<div className='md:space-y-6 min-w-[200px] w-auto'>
							<div className='gap-4 space-y-4 md:items-center md:space-y-0 md:flex md:justify-between'>
								<div className='flex items-center justify-between'>
									<h1 className='text-2xl'>{user?.displayName}</h1>
									<SettingsIcon className='text-2xl text-gray-800 cursor-pointer md:hidden hover:text-black dark:text-white' />
								</div>

								<div className='flex items-center gap-4'>
									<button className='px-20 py-1 transition-all duration-300 border-2 border-gray-200 rounded-md md:px-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-dark-border'>
										Edit Profile
									</button>

									<SettingsIcon className='hidden text-2xl text-gray-800 cursor-pointer md:block hover:text-black dark:text-white' />
								</div>
							</div>

							<div className='hidden md:gap-6 md:flex'>
								<h1 className='font-bold '>
									42
									<span className='ml-1 text-gray-500'>posts</span>
								</h1>
								<h1 className='font-bold '>
									936
									<span className='ml-1 text-gray-500'>followers</span>
								</h1>
								<h1 className='font-bold '>
									68
									<span className='ml-1 text-gray-500'>following</span>
								</h1>
							</div>

							<div className='hidden md:block'>
								<h1 className='text-xl font-bold'>{user?.displayName}</h1>
								<h1 className='text-lg font-semibold cursor-pointer hover:text-light-blue'>
									{user?.email}
								</h1>
							</div>
						</div>
					</div>

					<div className='mt-4 mb-6 md:hidden'>
						<h1 className='text-xl font-bold'>{user?.displayName}</h1>
						<h1 className='text-lg font-semibold cursor-pointer hover:text-light-blue'>
							{user?.email}
						</h1>
					</div>

					<div className='flex items-center justify-around py-5 border-t border-b border-gray-200 md:hidden dark:border-dark-border'>
						<h1 className='flex flex-col items-center font-bold'>
							42
							<span className='text-gray-500'>posts</span>
						</h1>
						<h1 className='flex flex-col items-center font-bold'>
							936
							<span className='text-gray-500'>followers</span>
						</h1>
						<h1 className='flex flex-col items-center font-bold'>
							68
							<span className='text-gray-500'>following</span>
						</h1>
					</div>

					<div className='flex items-center justify-around py-5 border-gray-200 md:border-t dark:border-dark-border'>
						<div className='flex items-center gap-1 transition-all duration-300 cursor-pointer hover:text-light-blue'>
							<AppsIcon className='md:text-[20px] text-light-blue' />
							<p className='hidden text-black dark:text-white md:block dark:hover:text-light-blue hover:text-light-blue'>
								POSTS
							</p>
						</div>

						<div className='flex items-center gap-1 text-gray-500 transition-all duration-300 cursor-pointer hover:text-light-blue'>
							<OndemandVideoOutlinedIcon className='md:text-[20px]' />
							<p className='hidden md:block'>SAVED</p>
						</div>

						<div className='flex items-center gap-1 text-gray-500 transition-all duration-300 cursor-pointer hover:text-light-blue'>
							<AccountBoxOutlinedIcon className='md:text-[20px]' />
							<p className='hidden md:block'>TAGGED</p>
						</div>
					</div>
				</div>

				{/* main sectin of the page */}
				<div className='grid grid-cols-3 w-full xl:w-[70%] 2xl:w-[60%] h-full gap-2 md:gap-4 lg:gap-8'>
					{userPosts?.map((post: any) => (
						<MiniPost
							postId={post.id}
							key={post.id}
							postImage={post.data().image}
							userName={post.data().userName}
							profilePicture={post.data().profilePicture}
							image={post.data().image}
							caption={post.data().caption}
							postedAt={post.data().timestamp}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default me;