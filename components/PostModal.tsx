import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PostSettings from './PostSettings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import moment from 'moment';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function PostModal({
	isPostModal,
	closeModal,
	profilePicture,
	userName,
	caption,
	image,
	postedAt,
	comments,
	addComment,
	newComment,
	isPostBtnDisabled,
	setNewComment,
}: any) {
	return (
		<div>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={isPostModal}
				onClose={closeModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isPostModal}>
					<Box
						sx={style}
						className='p-0 flex flex-col lg:flex-row w-[80vw] h-[820px] items-center border-none outline-none  dark:bg-dark-light bg-full-white rounded-lg'
					>
						{/* post image large screen size*/}
						<div className='items-center justify-center hidden w-full h-full bg-black rounded-tl-lg rounded-bl-lg lg:flex '>
							<img
								src={image}
								className='object-contain w-full h-full'
								alt=''
							/>
						</div>

						<div className='flex items-center justify-between w-full p-2 border-b border-gray-200 lg:hidden dark:border-dark-border'>
							<div className='flex gap-2 cursor-pointer'>
								{profilePicture ? (
									<img
										className='w-10 h-10 mr-1 rounded-full'
										src={profilePicture}
									/>
								) : (
									<AccountCircleIcon className='w-12 h-12 text-gray-500 ' />
								)}
								<p className='pt-2 font-medium tracking-wide justify-self-start'>
									{userName}
								</p>
							</div>

							<PostSettings />
						</div>

						{/* post image small screen size*/}
						<div className='flex items-center justify-center w-full bg-black border-b border-gray-200 lg:hidden dark:border-dark-border'>
							<img
								src={image}
								className='object-contain w-full h-[300px]'
								alt=''
							/>
						</div>

						{/* post buttons small screen size*/}
						<div className='flex items-center justify-between w-full px-2 py-3 lg:hidden'>
							<div className='flex items-center gap-5'>
								<FavoriteBorderIcon className='icon' />
								<ChatBubbleOutlineRoundedIcon className='icon' />
								<SendOutlinedIcon className='mb-2 text-2xl -rotate-45 icon' />
							</div>

							<BookmarkBorderIcon className='icon ' />
						</div>

						{/* post likes small screen size*/}
						<p className='w-full px-2 text-sm font-bold lg:hidden'>
							95835 Likes
						</p>

						{/* post info small screen size*/}
						<div className='w-full border-b border-gray-200 lg:hidden dark:border-dark-border'>
							<div className='flex items-center justify-between p-2 lg:hidden'>
								<p className='py-2 text-sm text-zinc-400'>
									{moment(postedAt?.toDate()).fromNow()}
								</p>

								<p className='text-sm transition-all duration-300 cursor-pointer hover:text-white text-zinc-400'>
									{comments.length} comments
								</p>
							</div>
						</div>

						<div className='flex flex-col justify-between w-full lg:w-1/2 lg:h-full h-2/5 '>
							{/* post info */}
							<div className='items-center justify-between hidden w-full p-2 border-b border-gray-200 lg:flex lg:items-start dark:border-dark-border'>
								<div className='flex gap-2 cursor-pointer'>
									{profilePicture ? (
										<img
											className='w-10 h-10 mr-1 rounded-full'
											src={profilePicture}
										/>
									) : (
										<AccountCircleIcon className='w-12 h-12 -ml-1 text-gray-500 ' />
									)}
									<p className='pt-2 font-medium tracking-wide justify-self-start'>
										{userName}
									</p>
								</div>

								<PostSettings />
							</div>

							<div className='flex flex-col justify-between w-full h-full overflow-scroll overflow-x-hidden scrollbar-thin scroll-smooth scrollbar-thumb-zinc-500'>
								<div className='flex-1 w-full overflow-scroll overflow-x-hidden scrollbar-thin scroll-smooth scrollbar-thumb-zinc-500'>
									<div className='flex items-start w-full gap-2 p-2'>
										{profilePicture ? (
											<img
												className='hidden w-10 h-10 mr-1 rounded-full md:flex'
												src={profilePicture}
											/>
										) : (
											<AccountCircleIcon className='hidden w-12 h-12 -ml-1 text-gray-500 md:flex ' />
										)}
										<p className='font-bold tracking-wide justify-self-start'>
											{userName}
										</p>

										<p className='overflow-scroll hide-scrollbar max-h-[70px] '>
											{caption}
										</p>
									</div>

									{comments.map((comment: any) => (
										<div className='flex items-center justify-between px-2 py-2 break-words'>
											<div className='flex items-center gap-2 '>
												{comment.data().profilePicture ? (
													<img
														className='hidden w-10 h-10 mr-1 rounded-full sm:flex'
														src={comment.data().profilePicture}
													/>
												) : (
													<AccountCircleIcon className='hidden w-12 h-12 -ml-1 text-gray-500 sm:flex ' />
												)}
												<div className='flex gap-2 '>
													<p className='font-bold whitespace-nowrap'>
														{comment.data().userName}
													</p>

													<p className='pr-2 break-all'>
														{comment.data().comment}
													</p>
												</div>
											</div>

											<FavoriteBorderIcon className='text-[16px] cursor-pointer hover:text-zinc-500 transition-all duration-100' />
										</div>
									))}
								</div>

								{/* post buttons */}
								<div className='items-center justify-between hidden px-2 py-3 border-t border-gray-200 lg:flex dark:border-dark-border '>
									<div className='flex items-center gap-5'>
										<FavoriteBorderIcon className='icon' />
										<ChatBubbleOutlineRoundedIcon className='icon' />
										<SendOutlinedIcon className='mb-2 text-2xl -rotate-45 icon' />
									</div>

									<BookmarkBorderIcon className='icon ' />
								</div>

								<div className='hidden px-2 lg:block'>
									<p className='text-sm font-bold '>95835 Likes</p>
									<p className='py-2 text-sm text-zinc-400'>
										{moment(postedAt?.toDate()).fromNow()}
									</p>
								</div>

								{/* add new comment */}
								<form
									className='flex items-center justify-center gap-4 px-6 py-3 border-t border-gray-200 h-14 justify-self-end dark:border-dark-border '
									onSubmit={addComment}
								>
									<SentimentSatisfiedAltIcon className=' icon' />

									<input
										maxLength={40}
										type='text'
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										placeholder='Add A Comment...'
										className='flex-1 text-lg bg-transparent border-none outline-none placeholder:text-sm focus:text-black dark:focus:text-white text-zinc-500'
									/>

									<button
										type='submit'
										disabled={isPostBtnDisabled}
										className='font-bold disabled:text-cyan- disabled:opacity-30 text-light-blue'
									>
										Post
									</button>
								</form>
							</div>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
