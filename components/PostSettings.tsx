import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from 'next-themes';
import { useRecoilState } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ITEM_HEIGHT = 48;

export default function PostSettings({
	uid,
	openModal,
	isPostModal,
	closeModal,
	postId,
}: any) {
	const { theme, setTheme } = useTheme();
	const [user, setUser] = useRecoilState<IUser | any>(userRecoil);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const deletePost = () => {
		deleteDoc(doc(db, 'posts', postId));
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
				<MenuItem className=' dark:hover:bg-dark-dark' onClick={handleClose}>
					{uid === user.uid ? (
						<div className='flex gap-3 ' onClick={deletePost}>
							<DeleteIcon />
							<p>Delete Post</p>
						</div>
					) : (
						<div className='flex gap-3 '>
							<BookmarkAddOutlinedIcon />
							<p>Save Post</p>
						</div>
					)}
				</MenuItem>

				<MenuItem className=' dark:hover:bg-dark-dark' onClick={handleClose}>
					{!isPostModal ? (
						<div onClick={openModal} className='flex gap-3 '>
							<OpenInFullOutlinedIcon />
							<p>View Post</p>
						</div>
					) : (
						<div onClick={closeModal} className='flex gap-3 '>
							<CloseFullscreenOutlinedIcon />
							<p>Close Post</p>
						</div>
					)}
				</MenuItem>
			</Menu>
		</div>
	);
}
