import styled from 'styled-components';
import { Button } from '../../components/UI/Buttons';
import { Card, StarContainer } from '../AddedLocations';
import MaryLandImg from '../../assets/maryland-mall.png';
import { FourStars } from '../../components/UI/svgs/svgs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	useLazyPlanATripQuery,
	useGetLocationsQuery,
	useGetCategoriesQuery,
} from '../../redux/Api/locationApi';
import { useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader';
import Progress from '../../components/UI/Progress';
import { Rate } from 'antd';

const Locations = () => {
	const [addedLocations, setAddedLocations] = useState(
		JSON.parse(localStorage.getItem('location')) || []
	);
	const { state } = useLocation();
	const navigate = useNavigate();
	// console.log(state);
	// const { data: locations } = useGetLocationsQuery({
	// 	page: 1,
    // 	count: 10,
	// 	categories: state.category
	// 		.map((category) => category.toLowerCase().replace(/\s+/g, "-"))
	// 		.join(","),
	// });
	const { data: categories } = useGetCategoriesQuery();
	const [planATrip, { isLoading, data }] = useLazyPlanATripQuery();

	useEffect(() => {
		planATrip(state)
			.unwrap()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {});
	}, [state]);

	console.log();

	return (
		<>
			{isLoading && <Loader />}
			<Container>
				<div className="d-flex justify-content-between mt-5 align-items-center ">
					<h3>Locations</h3>
					<Progress step={2} />
				</div>
				<div>
					{data?.data.map((e, i) => (
						<Card key={e._id}>
							<div className="w-full grid grid-cols-8 items-center content-center">
								<div className="d-flex items-center col-span-3">
									<img
										src={e?.business.businessLocationImages[0]}
										alt=""
										className="img-fluid w-[230px] h-[100px] rounded-xl"
									/>
									<div>
										<p className='text-lg mb-1'>{e?.business.businessName}</p>
										<h5 className='text-[#9D9D9D] mb-2'>{e?.business.businessAddress}</h5>
										<h6 className='mb-0'>{categories?.find(cat => cat?.value === e?.locationCategory.replace('&', '%26'))?.label}</h6>
									</div>
								</div>
								<StarContainer className="d-flex align-items-center justify-center col-span-2">
									<Rate value={e?.locationRating || 3} disabled />
								</StarContainer>


								<div className="flex align-items-center justify-end w-full col-span-3">
									<p className="me-3 mb-0">{e?.budgetClass.label}</p>
									{!addedLocations.find(
										(location) => location._id == e._id
									) && (
										<Button
											onClick={() => {
												const currentLocations =
													JSON.parse(localStorage.getItem('location')) || [];
												if (currentLocations?.some((obj) => obj._id === e?._id))
													return;
												else {
													localStorage.setItem('location',
														JSON.stringify([
															...currentLocations,
															{
																...e,
															},
														])
													);
													setAddedLocations([...addedLocations, e]);
												}
											}}
											color="green"
										>
											Add Location
										</Button>
									)}

									<Button onClick={() => navigate(`/location/${e?._id}`)}>
										Preview
									</Button>
								</div>
							</div>
						</Card>
					))}
				</div>
				<div className='flex justify-end mt-8'>
					<Button onClick={() => navigate('/added-locations')}>
						View Added Locations
					</Button>
				</div>
			</Container>
		</>
	);
};

export default Locations;

const Container = styled.div`
	h4 {
		text-align: center;
		font-weight: 700;
		font-size: 25px;
		color: #009f57;
	}
	p {
		font-weight: 700;
		display: inline-block;
		font-size: 15px;
		color: #000000;
	}
	h6 {
		font-weight: 600;
		font-size: 16px;
		color: #e9a309;
	}

	padding: 0 7%;
	h3 {
		color: #009f57;
		font-weight: 700;
		font-size: 28px;
	}
	button {
		transform: scale(0.9);
	}
`;
