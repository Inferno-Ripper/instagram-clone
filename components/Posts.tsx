import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import Post from './Post';

const Posts = () => {
	const [posts, setPosts] = useState<any>();

	useEffect(() => {
		onSnapshot(
			query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setPosts(snapshot.docs);
			}
		);
	}, []);

	return (
		<div className='flex flex-col gap-4 pb-4'>
			{posts?.map((post: any) => {
				return (
					<Post
						key={post.id}
						postId={post.id}
						uid={post.data().uid}
						userName={post.data().userName}
						profilePicture={post.data().profilePicture}
						image={post.data().image}
						caption={post.data().caption}
						postedAt={post.data().timestamp}
					/>
				);
			})}
		</div>
	);
};

export default Posts;
