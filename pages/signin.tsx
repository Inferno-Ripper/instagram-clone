import Image from 'next/image';
import React, { useState } from 'react';
import Header from '../components/Header';
import AppleIcon from '@mui/icons-material/Apple';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { auth, provider } from './firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';

const Signin = () => {
	const [loginMethod, setLoginMethod] = useState<string>('login');
	const [displayname, setDisplayname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isError, setIsError] = useState<string>('');

	const displayError = (error: string) => {
		setIsError(error);

		setTimeout(() => {
			setIsError('');
		}, 5000);
	};

	const facebookLogin = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				console.log(user);
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;

				if (errorCode === 'auth/popup-closed-by-user') {
					displayError('Please Try Again');
				}
				// ...
			});
	};

	const login = (event: any) => {
		event.preventDefault();

		if (!email || !password) {
			return displayError('Please Fill All The Fields');
		}

		if (loginMethod === 'register') {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					if (auth?.currentUser) {
						updateProfile(auth?.currentUser, { displayName: displayname });
					}
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					if (errorCode === 'auth/invalid-email') {
						displayError('Invalid Email Address');
					}

					if (errorCode === 'auth/email-already-in-use') {
						displayError('Email Address Already In Use ');
					}

					console.log(errorCode);
					console.log(errorMessage);
				});
		} else if (loginMethod === 'login') {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					if (
						errorCode === 'auth/user-not-found' ||
						errorCode === 'auth/invalid-email'
					) {
						displayError('Invalid Email Address');
					}
					if (errorCode === 'auth/wrong-password') {
						displayError('Wrong Password');
					}

					console.log(errorCode);
					console.log(errorMessage);
				});
		}
	};

	return (
		<div className='flex flex-col w-screen h-screen gap-4 text-black bg-dark-white dark:bg-dark-dark dark:text-white'>
			<Header />
			<div className='flex flex-col items-center justify-center w-full h-full gap-4'>
				<div className='flex flex-col items-center h-auto gap-8 p-10 border border-gray-200 bg-full-white dark:border-dark-border dark:bg-dark-light w-96'>
					{/* instagram text / logo */}
					<svg
						role='img'
						viewBox='32 4 113 32'
						className='transition-all duration-300 cursor-pointer w-36 hover:scale-110'
					>
						<path
							d='M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z'
							fill='currentColor'
						></path>
					</svg>

					{/* input */}
					<form className='flex flex-col w-full gap-4 '>
						{/* display name */}
						{loginMethod === 'register' && (
							<input
								type='text'
								placeholder='Name'
								onChange={(e) => setDisplayname(e.currentTarget.value)}
								value={displayname}
								className='px-2 border border-gray-200 rounded outline-none dark:placeholder:text-zinc-500 placeholder:text-zinc-400 h-11 dark:bg-dark-dark dark:border-dark-border bg-dark-white'
							/>
						)}

						{/* email */}
						<input
							type='email'
							placeholder='Phone number, username, or email  '
							onChange={(e) => setEmail(e.currentTarget.value)}
							value={email}
							className='px-2 border border-gray-200 rounded outline-none dark:placeholder:text-zinc-500 placeholder:text-zinc-400 h-11 dark:bg-dark-dark dark:border-dark-border bg-dark-white'
						/>

						{/* passowrd */}
						<input
							type='password'
							onChange={(e) => setPassword(e.currentTarget.value)}
							value={password}
							placeholder='Password'
							className='px-2 border border-gray-200 rounded outline-none dark:placeholder:text-zinc-500 placeholder:text-zinc-400 h-11 dark:bg-dark-dark dark:border-dark-border bg-dark-white'
						/>

						<button
							onClick={login}
							type='submit'
							disabled={email.length === 0}
							className='mt-2 text-lg font-semibold tracking-wider text-white transition-all duration-300 bg-blue-600 rounded-lg disabled:bg-blue-500 h-9 hover:bg-blue-700'
						>
							{loginMethod === 'login' && 'Log In'}
							{loginMethod === 'register' && 'Sign up'}
						</button>
					</form>

					<p className='w-11/12  leading-[0.1px] text-center border-b-2 dark:border-zinc-500 border-zinc-300'>
						<span className='px-6 font-semibold dark:bg-dark-light bg-full-white dark:text-zinc-500 text-zinc-500'>
							OR
						</span>
					</p>

					<div className='flex items-center justify-center w-full gap-4'>
						<img
							className='h-5'
							src='/assets/images/facebook-logo.png'
							alt=''
						/>

						<p
							className='text-[#3A5897] font-bold cursor-pointer'
							onClick={facebookLogin}
						>
							{loginMethod === 'login'
								? 'Log in'
								: loginMethod === 'register'
								? 'Sign up'
								: ''}{' '}
							With Facebook
						</p>
					</div>

					<p className='cursor-pointer transition-all duration-300 hover:text-[#3A5897]'>
						Forgot Password?
					</p>

					{/* error message */}
					<p
						className={`${
							isError ? 'opacity-100' : 'opacity-0'
						} p-2 -my-6 font-bold  text-white bg-red-400 flex items-center justify-center h-8 transition-all duration-300 rounded`}
					>
						{isError}
					</p>
				</div>

				<div
					onClick={() => {
						setLoginMethod((prev) => (prev === 'login' ? 'register' : 'login'));
						setEmail('');
						setPassword('');
						setDisplayname('');
					}}
					className='flex items-center justify-center gap-1 p-4 text-center border border-gray-200 lg:p-6 bg-full-white dark:border-dark-border dark:bg-dark-light w-96'
				>
					{loginMethod === 'login' && (
						<>
							<p>Don't have an account?</p>
							<p className='text-[#3A5897] font-bold cursor-pointer'>Sign up</p>
						</>
					)}
					{loginMethod === 'register' && (
						<>
							<p>Already have an account?</p>
							<p className='text-[#3A5897] font-bold cursor-pointer'>Login</p>
						</>
					)}
				</div>

				<h2>Get The App.</h2>

				<div className='flex items-center justify-between w-96'>
					<div className='flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-lg cursor-pointer '>
						<AppleIcon className='w-10 h-10' />

						<div className='flex flex-col items-center '>
							<p className='text-xs pl-[2px]'>Download on the</p>
							<h1 className='-mt-1 text-xl font-semibold'>App Store</h1>
						</div>
					</div>

					<div className='flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-lg cursor-pointer '>
						<img
							src='assets/images/google-play.png'
							className='w-8 h-8'
							alt=''
						/>

						<div className='flex flex-col '>
							<p className='pl-[2px] text-xs'>GET IT ON</p>
							<h1 className='-mt-1 text-xl font-semibold '>Google Play</h1>
						</div>
					</div>
				</div>

				<p className='flex flex-wrap items-center justify-center gap-4 px-2'>
					<span className='page-link'>Meta</span>
					<span className='page-link'>About</span>
					<span className='page-link'>Blog</span>
					<span className='page-link'>Jobs</span>
					<span className='page-link'>Help</span>
					<span className='page-link'>API</span>
					<span className='page-link'>Privacy</span>
					<span className='page-link'>Terms</span>
					<span className='page-link'>Top</span>
					<span className='page-link'>Accounts</span>
					<span className='page-link'>Hashtags</span>
					<span className='page-link'>Locations</span>
					<span className='page-link'>Instagram</span>
					<span className='page-link'>Lite</span>
					<span className='page-link'>Contact</span>
					<span className='page-link'>Uploading</span>
					<span className='page-link'>&</span>
					<span className='page-link'>Non-Users</span>
				</p>

				<div className='flex items-center gap-4'>
					<p className='flex items-center hover:no-underline page-link'>
						English <KeyboardArrowDownIcon />
					</p>
					<p className=' text-zinc-500'>
						© {new Date().getFullYear()} Inferno Ripper
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signin;