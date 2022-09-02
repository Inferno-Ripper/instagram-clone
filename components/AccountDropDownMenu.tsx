import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ThemeChanger from './ThemeChanger';
import { useTheme } from 'next-themes';

export default function AccountDropDownMenu() {
	const { theme, setTheme } = useTheme();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Tooltip title='Account settings'>
					<IconButton
						onClick={handleClick}
						size='small'
						// sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<AccountCircleOutlinedIcon className='text-black text-3xl  lg:text-3xl transition-all duration-[250]  cursor-pointer  dark:text-white' />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						border:
							theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
						backgroundColor: theme === 'dark' ? '#242526' : '#FFFFFF',
						color: theme === 'dark' ? 'white' : 'black',

						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
							borderTop:
								theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
							borderLeft:
								theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
							backgroundColor: theme === 'dark' ? '#242526' : '#FFFFFF',
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem className='flex items-center w-56 gap-4 group dark:hover:bg-dark-dark'>
					<AccountCircleOutlinedIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Profile
				</MenuItem>

				<MenuItem className='flex items-center w-56 gap-4 group dark:hover:bg-dark-dark'>
					<BookmarkBorderOutlinedIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Saved
				</MenuItem>

				<MenuItem className='flex items-center w-56 gap-4 group dark:hover:bg-dark-dark'>
					<SettingsIcon />
					Settings
				</MenuItem>

				<MenuItem className='flex items-center w-56 gap-4 group dark:hover:bg-dark-dark'>
					<ChangeCircleIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Switch Account
				</MenuItem>

				<MenuItem className='flex items-center gap-4 group dark:hover:bg-dark-dark'>
					<ThemeChanger />
				</MenuItem>

				<Divider />

				<MenuItem className='flex items-center w-56 gap-4 group dark:hover:bg-dark-dark'>
					<Logout className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
