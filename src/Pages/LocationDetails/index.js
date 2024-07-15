import { Box, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Maryland from '../../assets/mm-ticket-prices.png';
import Avatar from '../../assets/user-avatar.png';
import { AltButton, Button } from '../../components/UI/Buttons';
import Loader from '../../components/UI/Loader';
import {
	ArrowCloud,
	FiveStars,
	FourStars,
} from '../../components/UI/svgs/svgs';
import {
	useAddLocationToLikedLocationsMutation,
	useGetLocationByIdQuery,
	useReviewLocationMutation,
	useUnlikeLocationMutation,
} from '../../redux/Api/locationApi';
import classes from './LocationDetails.module.css';

import { Image, Input, notification } from 'antd';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useUserLoginMutation } from '../../redux/Api/authApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import { EffectCards, Navigation } from 'swiper';
const { TextArea } = Input;

const LocationDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const initialValues = {
		reviewDescription: '',
		pictures: [],
		reviewRating: 0,
		reviewerID: sessionStorage.getItem('user_id'),
		locationID: id,
	};
	const [values, setValues] = useState(initialValues);
	const [rating, setRating] = useState(2);

	const [location, setLocation] = useState({});
	const [addLocationToLikedLocations, { isLoading: likeLocationLoading }] = useAddLocationToLikedLocationsMutation();
	const [
		reviewLocation,
		{
			isLoading: reviewLoading,
			isError: reviewIsError,
			isSuccess,
			error: reviewError,
		},
	] = useReviewLocationMutation();

	const [unlike, { isLoading: unliking }] = useUnlikeLocationMutation();

	const userType = sessionStorage.getItem('userType');
	const userData = useSelector((state) => state.auth.user).payload;
	const { data, isError, error, isLoading } = useGetLocationByIdQuery({ id });

	useEffect(() => {
		if (data) {
			console.log(data);
			setLocation(data);
		}
		if (isError || reviewIsError) {
			notification.error({
				message: error?.error || reviewError?.error,
				duration: 3,
				placement: 'bottomRight',
			});
		}
		if (isSuccess) {
			notification.success({
				message: 'Review submitted successfully',
				duration: 3,
				placement: 'bottomRight',
			});
			setValues(initialValues);
		}
	}, [
		data,
		error?.error,
		isError,
		reviewError?.error,
		reviewIsError,
		isSuccess,
		setValues,
	]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		Object.entries(values).forEach(([key, value]) => {
			formData.append(key, value);
		});
		values.pictures.forEach((file) => {
			formData.append('pictures', file);
		});
		await reviewLocation(formData);
	};

	const handleAddClick = () => {
		addLocationToLikedLocations({ locationName: location._id });
	};

	const handleUnlike = (id) => {
		unlike({ locationName: id })
			.unwrap()
			.then((r) => {
				notification.success({
					message: 'Unliked',
					duration: 3,
				});
			})
			.catch((err) => {
				notification.error({
					message: 'An error occurred',
					duration: 3,
				});
			});
	};

	return (
		<div className={classes.location}>
			{isLoading || reviewLoading || likeLocationLoading ? (
				<Loader />
			) : (
				<>
					{/* {' '} */}
					<div className="row">
						<div className="col-md-6">
							<Swiper
								className=''
								slidesPerView={1}
								modules={[ Navigation ]}
								spaceBetween={20}
								loop={true}
								navigation
							>
								{
									location?.businessLocationImages?.map((imag, i) => (
										<SwiperSlide key={i}>
											<img src={imag} className='w-[28rem]' alt={`Poster ${i+1}`} />
										</SwiperSlide>
									))
								}
							</Swiper>
							<p>
								Please scroll/swipe to see additional images
							</p>
						</div>
						<div className={`col-md-6 ${classes.details}`}>
							<div>
								<h4>{location?.businessName}</h4>
								<h6>{location?.businessAddress}</h6>
								<h6>{location?.businessCategory?.split("-").join(" ")}</h6>
								<h6>{location?.businessRangeFrom}</h6>
								<h6>0{location?.businessTelephone}</h6>
							</div>

							<p className="my-3">{location?.businessDescription}</p>

							<div className="d-flex mb-3">
								{userData?.likedLocations?.find(
									(l) => l._id == location?._id
								) ? (
									<Button
										color="red"
										location={true}
										onClick={() => {
											handleUnlike(location._id);
										}}
									>
										Unlike
									</Button>
								) : (
									<Button
										color="green"
										location={true}
										onClick={handleAddClick}
									>
										Like location
									</Button>
								)}
								<Button
									onClick={() => navigate(`/location/map?address=${location?.businessAddress}&name=${location?.businessName}`)}
									location={true}
								>
									View on Google Maps
								</Button>
							</div>
						</div>
					</div>
					<div
						className={`${classes.reviewContainer} 
           				${userType === 'user' ? `row` : `flex justify-center`} mt-5 px-4 py-3`}
					>
						{userType === 'user' && (
							<div className="col-md-6">
								<form className="gap-4" onSubmit={handleFormSubmit}>
									<div className="flex flex-col gap-3 bg-white py-2 px-4 rounded-xl border-brandGreen border-[1px]">
										<Dropzone
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={true}
											onDrop={(acceptedFiles) => {
												// seValue("pictures", [...values.pictures, ...acceptedFiles]);
												setValues((prev) => ({
													...prev,
													pictures: [...values.pictures, ...acceptedFiles],
												}));
											}}
										>
											{({ getRootProps, getInputProps }) => (
												<Container>
													<section {...getRootProps()}>
														<input {...getInputProps()} />
														{values.pictures.length === 0 ? (
															<div>
																<i>{ArrowCloud}</i>
																<p>Drag and Drop Pictures here to Upload</p>
															</div>
														) : (
															values.pictures.map((file, index) => (
																<FlexBetween key={index}>
																	<Typography sx={{ marginRight: '5px' }}>
																		{file.name}
																	</Typography>
																</FlexBetween>
															))
														)}
													</section>
												</Container>
											)}
										</Dropzone>
										<div className="flex justify-between ">
											<Typography className="text-black font-black">
												Experience Rating
											</Typography>
											<Rating
												name="simple-controlled"
												value={values.locationRating}
												onChange={(event, newValue) => {
													console.log(newValue);
													setRating(newValue);
													setValues((prev) => ({
														...prev,
														reviewRating: newValue,
													}));
												}}
											/>
										</div>
										<TextArea
											rows="6"
											required
											name="reviewDescription"
											className="mt-2"
											placeholder="Share your experience here...."
											onChange={(e) => {
												setValues((prev) => ({
													...prev,
													[e.target.name]: e.target.value,
												}));
											}}
										></TextArea>
										<AltButton location={true} className="mb-4">
											Post Review
										</AltButton>
									</div>
								</form>
							</div>
						)}
						<ReviewContainer
							className={`${
								userType !== 'user' ? `w-full` : `px-3`
							} col-md-6  my-4 `}
						>
							<div className="d-flex justify-content-between mb-4 items-center mt-3">
								<ReviewH4 className="text-2xl font-bold">Reviews</ReviewH4>
								<div className="flex gap-2 md:gap-4 flex-col md:flex-row">
									<p className="text-black font-medium">Average Rating</p>{' '}
									<i>{FourStars}</i>
								</div>
							</div>
							<Review className={`flex flex-wrap gap-4`}>
								{location && location?.reviews?.length > 0 ? (
									location?.reviews?.map((review, i) => {
										console.log(review);
										return (
											<ReviewCard>
												<div>
													<div className="flex items-center justify-between mb-3">
														<ReviewUser>
															<img
																src={Avatar}
																className="img-fluid "
																alt="pfp"
															/>
															<p className="" style={{ color: '#009f57' }}>
																{review?.reviewerFullname}
															</p>
														</ReviewUser>
														<i>{FiveStars}</i>
													</div>

													<p>{review?.reviewDescription}</p>
												</div>
												<div>
													<div className="flex flex-wrap gap rounded-lg overflow-hidden mt-3 flex-container">
														<Image.PreviewGroup
															preview={{
																onChange: (current, prev) =>
																	console.log(
																		`current index: ${current}, prev index: ${prev}`
																	),
															}}
														>
															{review?.reviewImagePaths?.map((image, key) => {
																return (
																	<div className={`flex-[1_0_30%] `}>
																		<Image
																			src={image}
																			width={'100%'}
																			height={150}
																			className=" object-cover"
																		/>
																	</div>
																);
															})}
														</Image.PreviewGroup>
													</div>
												</div>
											</ReviewCard>
										);
									})
								) : (
									<p>No reviews yet</p>
								)}
							</Review>
						</ReviewContainer>
					</div>
				</>
			)}
		</div>
	);
};

export default LocationDetails;
const FlexBetween = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});
const Container = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	background: #fff;
	box-shadow: 4px 4px 32px 2px rgba(0, 0, 0, 0.08);
	border-radius: 10px;
	height: 20vh;
	padding: 15px;
	margin-top: 5%;
	p {
		text-align: center;
	}

	section {
		width: 100%;
		border: 3px solid #d9d9d9;
		border-radius: 8px;
		display: flex;
		align-items: flex-end;
		justify-content: center;

		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 5%;
		}
	}
`;

const ReviewContainer = styled.div``;
const ReviewH4 = styled.h4`
	color: #009f57;
`;
const Review = styled.div`
	max-height: 50vh;
	display: flex;
	overflow-y: auto;
	padding-right: 15px;
	::-webkit-scrollbar {
		width: 12px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #9d9d9d;
		border-radius: 8px;
	}

	::-webkit-scrollbar-track {
		background-color: #d9d9d9;
	}
`;
const ReviewCard = styled.div`
	background: #ffffff;
	border: 2px solid rgba(0, 159, 87, 0.5);
	border-radius: 10px;
	padding: 16px;
	margin-bottom: 16px;
	flex: 1;
	p {
		color: #9d9d9d;
		font-weight: 600;
		font-size: 15px;
		line-height: 24px;
	}
`;
const ReviewUser = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	img {
		width: 40px;
		height: 40px;
	}
`;
