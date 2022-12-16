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
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PostModal from './PostModal';
import { useRecoilValue } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';

const MiniPost = ({
	postId,
	postImage,
	image,
	profilePicture,
	userName,
	caption,
	postedAt,
}: any) => {
	// post modal
	const [isPostModal, setIsPostModal] = useState(false);
	const openModal = () => setIsPostModal(true);
	const closeModal = () => setIsPostModal(false);
	const [comments, setComments] = useState<any>();
	const [newComment, setNewComment] = useState<string>('');
	const [likes, setLikes] = useState<any>();
	const [isLiked, setIsLiked] = useState<boolean>(true);
	const [isPostBtnDisabled, setIsPostBtnDisabled] = useState<boolean>(true);
	const user = useRecoilValue<IUser>(userRecoil);

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
		if (newComment) {
			setIsPostBtnDisabled(false);
		} else if (!newComment) {
			setIsPostBtnDisabled(true);
		}
	}, [newComment]);

	useEffect(() => {
		if (!likes) return;

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
		<div className='relative flex items-center justify-center bg-black cursor-pointer group'>
			<img
				src={postImage}
				// className='object-cover w-full h-44 md:h-56 lg:h-72'
				className='object-cover h-40 w-[300px] md:h-[280px] sm:h-52  group-hover:brightness-50  '
				alt=''
				onClick={openModal}
			/>

			<div
				className='absolute flex flex-col gap-4 font-bold opacity-0 md:gap-6 md:flex-row group-hover:opacity-100 item s-center inset-1/3 '
				onClick={openModal}
			>
				<div className='flex items-center gap-2 text-white'>
					<FavoriteIcon />
					<p className='text-white'>{likes?.length}</p>
				</div>

				<div className='flex items-center gap-2 text-white'>
					<ModeCommentIcon /> <p>{comments?.length}</p>
				</div>
			</div>

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
				postId={postId}
				uid={user.uid}
			/>
		</div>
	);
};

export default MiniPost;
