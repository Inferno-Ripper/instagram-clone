import React, { useEffect, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostSettings from './PostSettings';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import PostModal from './PostModal';
import { IUser, userRecoil } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import Comment from './Comment';
interface IPost {
	uid: string;
	postId: string;
	userName: string;
	profilePicture: string;
	image: string;
	caption: string;
	postedAt: any;
}

const Post = ({
	uid,
	postId,
	image,
	profilePicture,
	userName,
	caption,
	postedAt,
}: IPost) => {
	const [comments, setComments] = useState<any>([]);
	const [newComment, setNewComment] = useState<string>('');
	const [likes, setLikes] = useState<any>([]);
	const [isLiked, setIsLiked] = useState<boolean>(true);
	const [isPostBtnDisabled, setIsPostBtnDisabled] = useState<boolean>(true);
	const user = useRecoilValue<IUser>(userRecoil);

	// post modal
	const [isPostModal, setIsPostModal] = useState(false);
	const openModal = () => setIsPostModal(true);
	const closeModal = () => setIsPostModal(false);

	const commentRef = useRef<HTMLInputElement>(null);

	// fetch comments from firestore
	useEffect(() => {
		onSnapshot(
			query(
				collection(db, 'posts', postId, 'comments'),
				orderBy('timestamp', 'desc')
			),
			(snapshot) => {
				setComments(snapshot.docs);
			}
		);
	}, []);

	// fetch likes from firestore
	useEffect(() => {
		onSnapshot(query(collection(db, 'posts', postId, 'likes')), (snapshot) => {
			setLikes(snapshot.docs);
		});
	}, []);

	useEffect(() => {
		if (newComment) {
			setIsPostBtnDisabled(false);
		} else if (!newComment) {
			setIsPostBtnDisabled(true);
		}
	}, [newComment]);

	// add new comment
	const addComment = async (e: any) => {
		e.preventDefault();

		const commentToSend = newComment;

		setNewComment('');

		await addDoc(collection(db, 'posts', postId, 'comments'), {
			uid: user.uid,
			userName: user.displayName,
			profilePicture: user.photo,
			comment: commentToSend,
			timestamp: serverTimestamp(),
		});
	};

	useEffect(() => {
		// check if the user has liked the post
		const isLikedPost = likes.filter((like: any) => like?.id === user?.uid);

		// if the user has liked the post then set the like button to filled
		if (isLikedPost[0]?.id === user?.uid) {
			setIsLiked(true);
		}
		// else set the like button to unfilled
		else if (isLikedPost[0]?.id !== user?.uid) {
			setIsLiked(false);
		}
	}, [likes]);

	// like a post
	const likePost = async () => {
		if (isLiked) {
			await deleteDoc(doc(db, 'posts', postId, 'likes', user.uid));
		} else if (!isLiked) {
			await setDoc(doc(db, 'posts', postId, 'likes', user.uid), {
				userName: user.displayName,
			});
		}
	};

	return (
		<div className='flex items-center justify-center '>
			<PostModal
				isPostModal={isPostModal}
				setIsPostModal={setIsPostModal}
				closeModal={closeModal}
				profilePicture={profilePicture}
				userName={userName}
				caption={caption}
				image={image}
				postedAt={postedAt}
				comments={comments}
				addComment={addComment}
				newComment={newComment}
				isPostBtnDisabled={isPostBtnDisabled}
				setNewComment={setNewComment}
				likes={likes}
				likePost={likePost}
				isLiked={isLiked}
				uid={uid}
				postId={postId}
			/>

			<div className='w-[400px] sm:w-[500px]  dark:bg-dark-light border-gray-200 dark:border-dark-border border rounded-lg  bg-full-white h-auto'>
				{/* user info */}
				<div className='flex items-center justify-between p-2 border-b border-gray-200 dark:border-dark-border'>
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

					<PostSettings uid={uid} openModal={openModal} postId={postId} />
				</div>

				{/* image */}
				<div
					onClick={openModal}
					className='flex items-center justify-center bg-black border-b border-gray-200 dark:border-dark-border'
				>
					<img src={image} className='object-contain w-full h-[350px]' alt='' />
				</div>

				{/* post buttons */}
				<div className='flex items-center justify-between px-2 py-3'>
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

				{likes.length > 0 && (
					<p className='flex gap-2 px-2 pb-1 -my-1 font-bold'>
						{likes?.length}
						<span>{likes?.length === 1 ? 'like' : 'likes'}</span>
					</p>
				)}

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

					{comments.length > 2 && (
						<p
							onClick={openModal}
							className='p-2 pb-3 transition-all duration-300 cursor-pointer hover:text-white text-zinc-400'
						>
							View all {comments.length} comments
						</p>
					)}

					{/* comments */}
					{comments?.slice(0, 2)?.map((comment: any) => (
						<Comment
							key={comment.id}
							comment={comment}
							postId={postId}
							isPostModal={isPostModal}
						/>
					))}

					<p className='p-2 text-sm text-zinc-500'>
						{moment(postedAt?.toDate()).fromNow()}
					</p>
				</div>

				{/* add new comment */}
				<form
					className='flex items-center gap-4 px-6 py-4'
					onSubmit={addComment}
				>
					<SentimentSatisfiedAltIcon className=' icon' />

					<input
						maxLength={40}
						type='text'
						value={newComment}
						ref={commentRef}
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
	);
};

export default Post;
