import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { IUser, userRecoil } from '../atoms/userAtom';
import { db, ref, storage } from '../firebase';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import Lottie from 'react-lottie-player';
import instagramLogoLoading from '../instagram-logo-loading.json';

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

export default function NewPostModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setSelectedFile(null);
		setShowPostPreview(false);
		setPreviewImage('');
		setCaption('');
	};
	const [selectedFile, setSelectedFile] = React.useState<any>();
	const [showPostPreview, setShowPostPreview] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [previewImage, setPreviewImage] = React.useState<string>();
	const [caption, setCaption] = React.useState<string>();
	const [captionError, setCaptionError] = React.useState<boolean>();
	const user: IUser = useRecoilValue(userRecoil);

	const selectFileRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (selectedFile) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};

			reader.readAsDataURL(selectedFile);
		} else {
			// clears the selected file
			// setPreviewImage('');
		}
	}, [selectedFile]);

	const uploadPost = async () => {
		if (!caption) {
			setCaptionError(true);

			setTimeout(() => {
				setCaptionError(false);
			}, 3000);
			return;
		}

		// set loading to true
		setLoading(true);

		// upload post to firebase firestore
		const postDocRef = await addDoc(collection(db, 'posts'), {
			uid: user?.uid,
			userName: user?.displayName,
			profilePicture: user?.photo,
			caption,
			timestamp: serverTimestamp(),
		});

		// upload image to firebase storage
		const imgRef = ref(storage, `posts/${postDocRef.id}/image`);

		await uploadBytes(imgRef, selectedFile).then(async (snapshot: any) => {
			// after the image is uploaded to firebase storage get the download url
			const downloadURL = await getDownloadURL(snapshot.ref);

			// and then updata the post and add the image to post
			await updateDoc(doc(db, 'posts', postDocRef.id), {
				image: downloadURL,
			});
		});

		// close modal and set loading to false
		handleClose();
		setLoading(false);
	};

	return loading ? (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] '>
			<Lottie
				animationData={instagramLogoLoading}
				style={{ width: 350, height: 350 }}
				play
				loop
			/>
		</div>
	) : (
		<>
			<div>
				<AddBoxOutlinedIcon onClick={handleOpen} className='icon' />
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<Box
							sx={style}
							className='p-4 border w-[400px] sm:w-[500px] outline-none space-y-6 border-gray-200 rounded-lg dark:border-dark-border min-h-[300px]  dark:bg-dark-light bg-full-white'
						>
							{/* modal header */}
							<div className='flex items-center justify-center w-full pb-2 border-b-2 border-gray-200 dark:border-dark-border '>
								<p className='flex-1 text-lg font-semibold text-center pl-7'>
									Create New Post
								</p>
								<CloseIcon
									onClick={handleClose}
									className='text-2xl font-semibold text-black rounded cursor-pointer dark:text-white hover:text-white hover:bg-zinc-500'
								/>
							</div>

							{/* modal body */}
							<div className='flex flex-col items-center justify-center h-full gap-6 '>
								{selectedFile ? (
									<img
										src={previewImage}
										className='object-contain w-full max-h-[400px]'
										alt=''
									/>
								) : (
									<svg
										className='text-black cursor-pointer dark:text-white'
										aria-label='Icon to represent media such as images or videos'
										height='77'
										role='img'
										viewBox='0 0 97.6 77.3'
										width='96'
									>
										<path
											d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
											fill='currentColor'
										></path>
										<path
											d='M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
											fill='currentColor'
										></path>
										<path
											d='M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
											fill='currentColor'
										></path>
									</svg>
								)}

								{!showPostPreview && (
									<button
										onClick={() => {
											if (selectFileRef?.current) {
												selectFileRef?.current.click();
											}
										}}
										className='px-2 py-1 font-medium text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-600 '
									>
										{!selectedFile ? 'Select From Computer' : 'Change Image'}
									</button>
								)}
							</div>

							{/* selected image */}
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

							{/* post caption */}
							{selectedFile && (
								<textarea
									maxLength={70}
									rows={5}
									cols={80}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setShowPostPreview(true);
										}
									}}
									autoFocus
									disabled={showPostPreview}
									value={caption}
									onChange={(e) => setCaption(e.currentTarget.value)}
									placeholder={
										!captionError
											? 'Write a caption...'
											: 'Please Add A Caption'
									}
									className={`${
										captionError ? 'placeholder:text-red-500 animate-pulse' : ''
									} w-full h-20 p-2 overflow-scroll text-2xl bg-transparent outline-none resize-none hide-scrollbar`}
								></textarea>
							)}

							{selectedFile && (
								<>
									{showPostPreview && (
										<div className='flex'>
											<div className='flex items-center justify-start w-full '>
												<button
													onClick={() => setShowPostPreview(false)}
													className='text-lg font-bold transition-all duration-300 text-light-blue hover:scale-110'
												>
													Prev
												</button>
											</div>

											<button
												onClick={uploadPost}
												disabled={loading}
												className='flex items-center gap-4 px-6 py-1 font-medium text-white transition-all duration-300 bg-blue-500 rounded whitespace-nowrap disabled:bg-blue-600 hover:bg-blue-600 '
											>
												Post
											</button>
										</div>
									)}

									{!showPostPreview && (
										<div className='flex items-center justify-end w-full '>
											<button
												onClick={() => setShowPostPreview(true)}
												className='text-lg font-bold transition-all duration-300 text-light-blue hover:scale-110'
											>
												Next
											</button>
										</div>
									)}
								</>
							)}
						</Box>
					</Fade>
				</Modal>
			</div>
		</>
	);
}
