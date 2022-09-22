import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from 'next-themes';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { useRecoilState } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import ChangeUserDataModal from './ChangeUserDataModal';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import PersonIcon from '@mui/icons-material/Person';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

export default function UserSettingsDropDownMenu() {
	const { theme, setTheme } = useTheme();
	const [user, setUser] = useRecoilState<IUser | null>(userRecoil);
	const [selectedFile, setSelectedFile] = React.useState<any>();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// user data modal
	const [isChangeUserDataModal, setIsChangeUserDataModal] =
		React.useState<boolean>(false);
	const openModal = () => setIsChangeUserDataModal(true);
	const closeModal = () => setIsChangeUserDataModal(false);
	const [changeUserData, setChangeUserData] = React.useState<string>('');

	const selectFileRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const changeProfilePicture = async () => {
			if (auth.currentUser || user) {
				// upload image to firebase storage
				const imgRef = ref(storage, `user/${user?.uid}/profile-picture`);

				await uploadBytes(imgRef, selectedFile).then(async (snapshot) => {
					// after the image is uploaded to firebase storage get the download url
					const downloadURL = await getDownloadURL(snapshot.ref);

					// and then updata the post and add the image to post
					if (auth?.currentUser) {
						updateProfile(auth?.currentUser, {
							photoURL: downloadURL,
						})
							.then(() => {
								setUser((prev: any) => {
									return { ...prev, photo: downloadURL };
								});
							})
							.catch((error) => {
								// An error occurred
								// ...
							});

						// UPDATE PROFILE PICTURE IN ALL POSTS POSTED BY THE CURRENT USER
						getDocs(
							query(collection(db, 'posts'), where('uid', '==', user?.uid))
						).then((querySnapshot) => {
							querySnapshot.forEach((post) => {
								const postRef = doc(db, 'posts', post.id);
								updateDoc(postRef, {
									profilePicture: downloadURL,
								});
							});
						});

						// UPDATE THE CURRENT USER PROFILE PICTURE POSTS COMMENTS

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

											// update the current user's profile picture with the update comment reference
											updateDoc(updateCommentRef, {
												profilePicture: downloadURL,
											});
										});
									});
								});
							});
						});
					}
				});
			}
		};
		if (selectedFile) {
			changeProfilePicture();
		}
	}, [selectedFile]);

	return (
		<>
			<input
				type='file'
				hidden
				// only accept images
				accept='image/*'
				onChange={(event: any) => {
					const file: any = event.target.files[0];

					if (file && file.type.substr(0, 5) === 'image') {
						setSelectedFile(file);
					} else {
						// clears the selected file
						// setSelectedFile(null);
					}
				}}
				ref={selectFileRef}
			/>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Tooltip title='Account settings'>
					<IconButton
						onClick={handleClick}
						size='small'
						// sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<SettingsIcon
							className={`${
								anchorEl ? 'rotate-45' : ''
							} text-2xl text-gray-800 cursor-pointer transition-all duration-300 hover:text-black dark:text-white`}
						/>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						border:
							theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
						backgroundColor: theme === 'dark' ? '#242526' : '#FFFFFF',
						color: theme === 'dark' ? 'white' : 'black',

						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
							borderTop:
								theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
							borderLeft:
								theme === 'dark' ? '1px solid #393A3B' : '1px solid lightgray',
							backgroundColor: theme === 'dark' ? '#242526' : '#FFFFFF',
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem
					onClick={() => {
						setChangeUserData('userName');
						openModal();
					}}
					className='flex items-center gap-4 w-60 group dark:hover:bg-dark-dark'
				>
					<PersonIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Change User Name
				</MenuItem>

				<MenuItem
					onClick={() => selectFileRef?.current?.click()}
					className='flex items-center gap-4 w-60 group dark:hover:bg-dark-dark'
				>
					<InsertPhotoIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Change Profile Picture
				</MenuItem>

				<MenuItem
					onClick={() => {
						setChangeUserData('email');
						openModal();
					}}
					className='flex items-center gap-4 w-60 group dark:hover:bg-dark-dark'
				>
					<EmailIcon />
					Change Email Address
				</MenuItem>

				<MenuItem
					onClick={() => {
						setChangeUserData('password');
						openModal();
					}}
					className='flex items-center gap-4 w-60 group dark:hover:bg-dark-dark'
				>
					<PasswordIcon className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Change Password
				</MenuItem>

				<Divider className='bg-gray-200 dark:bg-dark-border ' />

				<MenuItem
					className='flex items-center gap-4 w-60 group dark:hover:bg-dark-dark'
					onClick={() => {
						setUser(null);
						signOut(auth);
					}}
				>
					<Logout className='text-gray-800 dark:text-white dark:group-hover:text-white group-hover:text-black' />
					Logout
				</MenuItem>
			</Menu>

			<ChangeUserDataModal
				isChangeUserDataModal={isChangeUserDataModal}
				closeModal={closeModal}
				changeUserData={changeUserData}
				setChangeUserData={setChangeUserData}
			/>
		</>
	);
}
