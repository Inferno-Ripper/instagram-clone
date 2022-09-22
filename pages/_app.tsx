import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light'>
			<RecoilRoot>
				<Loading />
				<Component {...pageProps} />
			</RecoilRoot>
		</ThemeProvider>
	);
}

export default MyApp;
