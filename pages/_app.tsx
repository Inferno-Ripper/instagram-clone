import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import Loading from '../components/Loading';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light'>
			<RecoilRoot>
				<NextNProgress color='#f87171' />
				<Component {...pageProps} />
			</RecoilRoot>
		</ThemeProvider>
	);
}

export default MyApp;
