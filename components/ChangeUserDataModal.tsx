import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useRecoilState } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import Loading from './Loading';

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

export default function ChangeUserDataModal({
	isChangeUserDataModal,
	closeModal,
	changeUserData,
}: any) {
	const [newValue, setNewValue] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isError, setIsError] = React.useState<string>('');
	const [user, setUser] = useRecoilState<IUser>(userRecoil);

	const displayError = (error: string) => {
		setIsError(error);

		setTimeout(() => {
			setIsError('');
		}, 5000);
	};

	const changeUserName = (e: any) => {
		e.preventDefault();

		if (!newValue || newValue === user?.displayName) return;

		if (changeUserData === 'userName' || newValue) {
			if (auth.currentUser) {
				setLoading(true);

				updateProfile(auth?.currentUser, {
					displayName: newValue,
				})
					.then(() => {
						if (newValue) {
							setUser((prev) => {
								return { ...prev, displayName: newValue };
							});

							// UPDATE USER NAME IN ALL POSTS POSTED BY THE CURRENT USER
							getDocs(
								query(collection(db, 'posts'), where('uid', '==', user?.uid))
							).then((querySnapshot) => {
								querySnapshot.forEach((post) => {
									const postRef = doc(db, 'posts', post.id);
									updateDoc(postRef, {
										userName: newValue,
									});
								});
							});

							// UPDATE ALL COMMENTS POSTED BY THE CURRENT USER IN ALL POSTS

							// get all the posts from firebase
							getDocs(collection(db, 'posts')).then((querySnapshot) => {
								// loop over all the posts
								querySnapshot.forEach((requestedDoc) => {
									// go inside posts > current post > comments, and get all the comments.
									getDocs(
										collection(db, 'posts', requestedDoc.id, 'comments')
									).then((commentsQuerySnapshot) => {
										// loop over all the comments
										commentsQuerySnapshot.forEach((commentsRequestedDoc) => {
											let updateComments: any = [];

											updateComments.push(commentsRequestedDoc);

											// filter the comments where the comment uid equals to user uid
											updateComments = updateComments.filter(
												(documentFilter: any) =>
													documentFilter.data().uid === user?.uid
											);

											// loop over all the comments inside the updateComments array
											updateComments.forEach((commentDoc: any) => {
												// go inside posts ? current post > comments > current comment
												const updateCommentRef = doc(
													db,
													'posts',
													requestedDoc.id,
													'comments',
													commentDoc.id
												);

												// update user name with the update comment reference
												updateDoc(updateCommentRef, {
													userName: newValue,
												});
											});
										});
									});
								});
							});

							setLoading(false);
							setNewValue('');
							closeModal();
						}
					})
					.catch((error) => {
						displayError(error.message);
						console.log(error);
					});
			}
		}
	};

	const changeEmail = (e: any) => {
		e.preventDefault();

		if (!newValue || newValue === user?.email) return;

		if (changeUserData === 'email' || newValue) {
			if (auth.currentUser) {
				setLoading(true);

				updateEmail(auth?.currentUser, newValue)
					.then(() => {
						if (newValue) {
							setUser((prev) => {
								return { ...prev, email: newValue };
							});

							setLoading(false);
							setNewValue('');
							closeModal();
						}
					})
					.catch((error) => {
						if (error.code === 'auth/requires-recent-login') {
							displayError('Please Sign In Again');
							setNewValue('');
							setLoading(false);
						}
					});
			}
		}
	};

	const changePassword = (e: any) => {
		e.preventDefault();

		if (changeUserData === 'password' || newValue) {
			if (auth.currentUser) {
				setLoading(true);

				updatePassword(auth?.currentUser, newValue)
					.then(() => {
						if (newValue) {
							setLoading(false);
							setNewValue('');
							closeModal();
						}
					})
					.catch((error) => {
						if (error.code === 'auth/requires-recent-login') {
							displayError('Please Sign In Again');
							setNewValue('');
							setLoading(false);
						}
					});
			}
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						open={isChangeUserDataModal}
						onClose={closeModal}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={isChangeUserDataModal}>
							<Box
								sx={style}
								className='flex items-center justify-center bg-white border border-gray-200 rounded-lg outline-none dark:bg-dark-light dark:border-dark-border'
							>
								<div>
									{changeUserData === 'userName' ? (
										<form className='space-y-4'>
											<h1 className='pl-1 text-xl font-medium'>
												Change User Name
											</h1>

											<input
												className='h-10 px-4 border-none rounded-lg outline-none w-80 focus:text-black dark:focus:text-white bg-[#EFEFEF] dark:bg-[#4E4F50]  text-zinc-400'
												placeholder='Enter New User Name'
												value={newValue}
												onChange={(e: any) => setNewValue(e.target.value)}
											/>

											<div className='flex justify-center'>
												<button
													type='submit'
													onClick={changeUserName}
													disabled={!newValue || newValue === user?.displayName}
													className='flex items-center justify-center w-40 gap-2 px-6 py-1 font-semibold tracking-wide text-white transition-all duration-300 rounded-md disabled:cursor-not-allowed disabled:scale-100 disabled:bg-blue-400 whitespace-nowrap hover:scale-105 hover:bg-blue-600 bg-light-blue'
												>
													Submit
												</button>
											</div>
										</form>
									) : changeUserData === 'email' ? (
										<form className='space-y-4'>
											<h1 className='pl-1 text-xl font-medium'>
												Change Email Address
											</h1>

											<input
												type='email'
												className='h-10 px-4 border-none rounded-lg outline-none w-80 focus:text-black dark:focus:text-white bg-[#EFEFEF] dark:bg-[#4E4F50]  text-zinc-400'
												placeholder='Enter New Email Address'
												value={newValue}
												onChange={(e: any) => setNewValue(e.target.value)}
											/>

											<div className='flex justify-center'>
												<button
													type='submit'
													onClick={changeEmail}
													disabled={!newValue || newValue === user?.email}
													className='flex items-center justify-center w-40 gap-2 px-6 py-1 font-semibold tracking-wide text-white transition-all duration-300 rounded-md disabled:cursor-not-allowed disabled:scale-100 disabled:bg-blue-400 whitespace-nowrap hover:scale-105 hover:bg-blue-600 bg-light-blue'
												>
													Submit
												</button>
											</div>

											{/* error message */}
											<p
												className={`${
													isError ? 'block' : 'hidden'
												} p-2 -my-6 font-bold  text-red-800 bg-red-300 flex items-center justify-center min-h-[40px] transition-all duration-300 rounded`}
											>
												{isError}
											</p>
										</form>
									) : changeUserData === 'password' ? (
										<form className='space-y-4'>
											<h1 className='pl-1 text-xl font-medium'>
												Change Password
											</h1>

											<input
												type='password'
												className='h-10 px-4 border-none rounded-lg outline-none w-80 focus:text-black dark:focus:text-white bg-[#EFEFEF] dark:bg-[#4E4F50]  text-zinc-400'
												placeholder='Enter New Password'
												value={newValue}
												onChange={(e: any) => setNewValue(e.target.value)}
											/>

											<div className='flex justify-center'>
												<button
													type='submit'
													onClick={changePassword}
													disabled={!newValue}
													className='flex items-center justify-center w-40 gap-2 px-6 py-1 font-semibold tracking-wide text-white transition-all duration-300 rounded-md disabled:cursor-not-allowed disabled:scale-100 disabled:bg-blue-400 whitespace-nowrap hover:scale-105 hover:bg-blue-600 bg-light-blue'
												>
													Submit
												</button>
											</div>

											{/* error message */}
											<p
												className={`${
													isError ? 'block' : 'hidden'
												} p-2 -my-6 font-bold  text-red-800 bg-red-300 flex items-center justify-center min-h-[40px] transition-all duration-300 rounded`}
											>
												{isError}
											</p>
										</form>
									) : (
										<div></div>
									)}
								</div>
							</Box>
						</Fade>
					</Modal>
				</div>
			)}
		</>
	);
}
