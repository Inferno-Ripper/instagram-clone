import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import PostSettings from './PostSettings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import moment from 'moment';
interface IPost {
	uid: string;
	userName: string;
	profilePicture: string;
	image: string;
	caption: string;
	postedAt: any;
}

const Post = ({
	uid,
	image,
	profilePicture,
	userName,
	caption,
	postedAt,
}: IPost) => {
	const [newComment, setNewComment] = useState<string>();
	const [isPostBtnDisabled, setIsPostBtnDisabled] = useState<boolean>(true);

	useEffect(() => {
		if (newComment) {
			setIsPostBtnDisabled(false);
		} else if (!newComment) {
			setIsPostBtnDisabled(true);
		}
	}, [newComment]);

	return (
		<div className='w-[500px] dark:bg-dark-light border-gray-200 dark:border-dark-border border rounded-lg  bg-full-white h-auto'>
			{/* user info */}
			<div className='flex items-center justify-between p-2 border-b border-gray-200 dark:border-dark-border'>
				<div className='flex gap-2 cursor-pointer'>
					{profilePicture ? (
						<img className='w-10 h-10 mr-1 rounded-full' src={profilePicture} />
					) : (
						<AccountCircleIcon className='w-12 h-12 text-gray-500 ' />
					)}
					<p className='pt-2 font-medium tracking-wide justify-self-start'>
						{userName}
					</p>
				</div>

				<PostSettings />
			</div>

			{/* image */}
			<div className='flex items-center justify-center bg-black border-b border-gray-200 dark:border-dark-border'>
				<img src={image} className='object-contain w-full h-[350px]' alt='' />
			</div>

			{/* post buttons */}
			<div className='flex items-center justify-between px-2 py-3'>
				<div className='flex items-center gap-5'>
					<FavoriteBorderIcon className='icon' />
					<ChatBubbleOutlineRoundedIcon className='icon' />
					<SendOutlinedIcon className='mb-2 text-2xl -rotate-45 icon' />
				</div>

				<BookmarkBorderIcon className='icon ' />
			</div>

			{/* post info */}
			<div className='border-b border-gray-200 dark:border-dark-border'>
				<div className='flex items-start gap-2 p-2'>
					<p className='font-bold tracking-wide justify-self-start'>
						{userName}
					</p>

					<p className='overflow-scroll hide-scrollbar max-h-[70px] '>
						{caption}
					</p>
				</div>

				<p className='p-2 text-sm text-zinc-500'>
					{moment(postedAt?.toDate()).fromNow()}
				</p>
			</div>

			{/* comment */}
			<div className='flex items-center gap-4 px-6 py-4'>
				<SentimentSatisfiedAltIcon className=' icon' />

				<input
					type='text'
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder='Add A Comment...'
					className='flex-1 text-lg bg-transparent border-none outline-none placeholder:text-sm focus:text-black dark:focus:text-white text-zinc-500'
				/>

				<button
					disabled={isPostBtnDisabled}
					className='font-bold disabled:text-cyan- disabled:opacity-30 text-light-blue'
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default Post;
