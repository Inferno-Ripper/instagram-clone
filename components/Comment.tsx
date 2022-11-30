import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { IUser, userRecoil } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';

const Comment = ({ comment, postId, isPostModal }: any) => {
	const [isCommentLiked, setIsCommentLiked] = useState<boolean>(false);
	const [commentLikes, setCommentLikes] = useState<any>([]);
	const user = useRecoilValue<IUser>(userRecoil);

	// like a comment
	const likeComment = async () => {
		if (isCommentLiked) {
			setIsCommentLiked(false);

			await deleteDoc(
				doc(db, 'posts', postId, 'comments', comment.id, 'likedBy', user.uid)
			);
		} else if (!isCommentLiked) {
			setIsCommentLiked(true);

			await setDoc(
				doc(db, 'posts', postId, 'comments', comment.id, 'likedBy', user.uid),
				{
					userName: user.displayName,
				}
			);
		}
	};

	// fetch comment likes from firestore
	useEffect(() => {
		onSnapshot(
			query(collection(db, 'posts', postId, 'comments', comment.id, 'likedBy')),
			(snapshot) => {
				setCommentLikes(snapshot.docs);
			}
		);
	}, []);

	useEffect(() => {
		commentLikes?.filter((doc: any) =>
			doc.id === user.uid ? setIsCommentLiked(true) : setIsCommentLiked(false)
		);
	}, [commentLikes]);

	return (
		<div className='flex items-center justify-between px-2 py-1'>
			<div>
				<div className='flex items-center gap-2'>
					{isPostModal &&
						(comment.data().profilePicture ? (
							<img
								className='hidden w-10 h-10 mr-1 rounded-full sm:flex'
								src={comment.data().profilePicture}
							/>
						) : (
							<AccountCircleIcon className='hidden w-12 h-12 -ml-1 text-gray-500 sm:flex ' />
						))}

					<p className='font-bold'>{comment.data().userName}</p>

					<p>{comment.data().comment}</p>
				</div>

				<div className='flex gap-2 mt-1'>
					<p className='pl-2 text-xs cursor-pointer whitespace-nowrap text-zinc-500 hover:text-white'>
						{moment(comment?.data()?.timestamp?.toDate())?.fromNow()}
					</p>

					<p className='pr-2 text-xs cursor-pointer whitespace-nowrap text-zinc-500 hover:text-white'>
						Likes {commentLikes.length}
					</p>
				</div>
			</div>

			{isCommentLiked ? (
				<FavoriteIcon
					className='text-red-500 text-[16px] cursor-pointer  transition-all duration-100'
					onClick={likeComment}
				/>
			) : (
				<FavoriteBorderIcon
					className='text-[16px] cursor-pointer hover:text-zinc-500 transition-all duration-100'
					onClick={likeComment}
				/>
			)}
		</div>
	);
};

export default Comment;
