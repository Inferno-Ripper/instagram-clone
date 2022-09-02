import React from 'react';
import Post from './Post';

const Posts = () => {
	return (
		<div className='flex flex-col gap-8 pb-8'>
			<Post
				id='1'
				userName='The'
				userImage='user image'
				image='https://cdn.pixabay.com/photo/2019/06/04/16/07/mountains-4251750_1280.jpg'
				caption='Lorem ipsum dolor sit amet consectetur,  Omnis minima sed sequi maiores nemo nisi delectus quia aspernatur atque non.'
				postedAt='2 HOUR AGO'
			/>
			<Post
				id='2'
				userName='Inferno'
				userImage='user image'
				image='https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_1280.jpg'
				caption='my first post'
				postedAt='1 HOUR AGO'
			/>
			<Post
				id='3'
				userName='Ripper'
				userImage='user image'
				image='https://cdn.pixabay.com/photo/2022/08/24/17/11/windmill-7408365_1280.jpg'
				caption='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis minima sed sequi maiores nemo nisi delectus quia aspernatur atque non.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis minima sed sequi maiores nemo nisi delectus quia aspernatur atque non.'
				postedAt='2 HOUR AGO'
			/>
		</div>
	);
};

export default Posts;
