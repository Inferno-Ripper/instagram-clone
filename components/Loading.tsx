import Lottie from 'react-lottie-player';
import instagramLogoLoading from '../instagram-logo-loading.json';

export default function Loading(): any {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: instagramLogoLoading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div className='flex z-[9999] fixed top-0 left-0 bg-transparent items-center justify-center w-screen h-screen'>
			<Lottie
				animationData={instagramLogoLoading}
				style={{ width: 200, height: 200 }}
				play
				loop
			/>
		</div>
	);
}
