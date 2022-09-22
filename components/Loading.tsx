import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import instagramLogoLoading from '../instagram-logo-loading.json';

export default function Loading(): any {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = (url: any) => url !== router.asPath && setLoading(true);
		const handleComplete = (url: any) =>
			url === router.asPath && setLoading(false);

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		console.log('first');
		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: instagramLogoLoading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		loading && (
			<div className='flex z-[9999] items-center justify-center w-screen h-screen text-black dark:text-white bg-dark-white dark:bg-dark-dark'>
				<div className='spinner'>
					{' '}
					<Lottie height={500} width={500} options={defaultOptions} />
				</div>
			</div>
		)
	);
}
