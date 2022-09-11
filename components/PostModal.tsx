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
import FavoriteIcon from '@mui/icons-material/Favorite';

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
	likes,
	likePost,
	isLiked,
}: any) {
	const commentRef = React.useRef<HTMLInputElement>(null);

	return (
		<div>
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
						className='p-0 flex flex-col md:flex-row w-[80vw] h-[720px] items-center border-none outline-none  dark:bg-dark-light bg-full-white rounded-lg'
					>
						{/* post image large screen size*/}
						<div className='items-center justify-center hidden w-full h-full bg-black rounded-tl-lg rounded-bl-lg md:flex '>
							<img
								src={image}
								className='object-contain w-full h-full'
								alt=''
							/>
						</div>

						<div className='flex items-center justify-between w-full p-2 border-b border-gray-200 md:hidden dark:border-dark-border'>
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
						<div className='flex items-center justify-center w-full bg-black border-b border-gray-200 md:hidden dark:border-dark-border'>
							<img
								src={image}
								className='object-contain w-full h-[300px]'
								alt=''
							/>
						</div>

						{/* post buttons small screen size*/}
						<div className='flex items-center justify-between w-full px-2 py-3 md:hidden'>
							<div className='flex items-center gap-5'>
								{isLiked ? (
									<FavoriteIcon
										className='text-red-500 dark:text-red-500 icon'
										onClick={likePost}
									/>
								) : (
									<FavoriteBorderIcon className='icon' onClick={likePost} />
								)}
								<ChatBubbleOutlineRoundedIcon
									onClick={() => commentRef?.current?.focus()}
									className='icon'
								/>
								<SendOutlinedIcon className='mb-2 text-2xl -rotate-45 icon' />
							</div>

							<BookmarkBorderIcon className='icon ' />
						</div>

						{/* post likes small screen size*/}
						{likes?.length > 0 && (
							<p className='flex w-full gap-2 px-2 pb-1 -my-1 font-bold md:hidden '>
								{likes?.length}
								<span>{likes?.length === 1 ? 'like' : 'likes'}</span>
							</p>
						)}

						{/* post info small screen size*/}
						<div className='w-full border-b border-gray-200 md:hidden dark:border-dark-border'>
							<div className='flex items-center justify-between p-2 lg:hidden'>
								<p className='text-sm text-zinc-400'>
									{moment(postedAt?.toDate()).fromNow()}
								</p>

								<p className='text-sm transition-all duration-300 cursor-pointer hover:text-white text-zinc-400'>
									{comments?.length} comments
								</p>
							</div>
						</div>

						<div className='flex flex-col w-full md:w-1/2 md:h-full h-2/5 '>
							{/* post info */}
							<div className='items-center justify-between hidden w-full p-2 border-b border-gray-200 md:flex md:items-start dark:border-dark-border'>
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
								<div className='flex-1 w-full max-h-[200px] md:max-h-full overflow-scroll overflow-x-hidden  scrollbar-thin scroll-smooth scrollbar-thumb-zinc-500'>
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

									{comments?.map((comment: any) => (
										<div key={comment.id}>
											<div className='flex items-center justify-between px-2 py-2 break-words '>
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
														<div>
															<p className='font-bold whitespace-nowrap'>
																{comment.data().userName}
															</p>
														</div>
														<p className='pr-2 break-all'>
															{comment.data().comment}
														</p>
													</div>
												</div>

												<FavoriteBorderIcon className='text-[16px] cursor-pointer hover:text-zinc-500 transition-all duration-100' />
											</div>

											<p className='px-2 -mt-2 text-xs whitespace-nowrap text-zinc-500'>
												{moment(
													comment?.data()?.timestamp?.toDate()
												)?.fromNow()}
											</p>
										</div>
									))}
								</div>

								{/* post buttons */}
								<div className='items-center justify-between hidden px-2 py-3 border-t border-gray-200 md:flex dark:border-dark-border '>
									<div className='flex items-center gap-5'>
										{isLiked ? (
											<FavoriteIcon
												className='text-red-500 dark:text-red-500 icon'
												onClick={likePost}
											/>
										) : (
											<FavoriteBorderIcon className='icon' onClick={likePost} />
										)}
										<ChatBubbleOutlineRoundedIcon
											onClick={() => commentRef?.current?.focus()}
											className='icon'
										/>
										<SendOutlinedIcon className='mb-2 text-2xl -rotate-45 icon' />
									</div>

									<BookmarkBorderIcon className='icon ' />
								</div>

								<div className='hidden px-2 md:block'>
									{/* post likes small screen size*/}
									{likes?.length > 0 && (
										<p className='hidden w-full gap-2 px-2 pb-1 -my-1 font-bold md:flex '>
											{likes?.length}
											<span>{likes?.length === 1 ? 'like' : 'likes'}</span>
										</p>
									)}
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
										ref={commentRef}
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
