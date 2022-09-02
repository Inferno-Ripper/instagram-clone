import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from 'next-themes';

const ITEM_HEIGHT = 48;

export default function PostSettings() {
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
		<div>
			<IconButton
				aria-label='more'
				id='long-button'
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreHorizIcon className='text-2xl text-gray-800 hover:text-black dark:text-white' />
			</IconButton>
			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '19ch',

						border:
							theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
						backgroundColor: theme === 'dark' ? '#242526' : '#FFFFFF',
						color: theme === 'dark' ? 'white' : 'black',
					},
				}}
			>
				<MenuItem
					className='flex gap-3 dark:hover:bg-dark-dark'
					onClick={handleClose}
				>
					<EditIcon />
					Edit Post
				</MenuItem>
				<MenuItem
					className='flex gap-3 dark:hover:bg-dark-dark '
					onClick={handleClose}
				>
					<DeleteIcon />
					Delete Post
				</MenuItem>
			</Menu>
		</div>
	);
}
