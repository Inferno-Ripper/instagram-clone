import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeChanger: any = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return;

	const toggleTheme = (): void => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<div onClick={toggleTheme} className='w-full'>
			<button className='flex items-center w-full gap-4 border-none'>
				{theme === 'dark' ? (
					<>
						<LightModeIcon />
						<p>Light Mode</p>
					</>
				) : (
					<>
						<DarkModeIcon />
						<p>Dark Mode</p>
					</>
				)}
			</button>
		</div>
	);
};

export default ThemeChanger;
