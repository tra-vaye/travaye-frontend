import styled from 'styled-components';
import { Button } from '../../components/UI/Buttons';
import { Card, StarContainer } from '../AddedLocations';
import MaryLandImg from '../../assets/maryland-mall.png';
import { FourStars } from '../../components/UI/svgs/svgs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	useLazyPlanATripQuery,
	useGetLocationsQuery,
} from '../../redux/Api/locationApi';
import { useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader';
import Progress from '../../components/UI/Progress';

const Locations = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	console.log({state});
	const { data: locations } = useGetLocationsQuery({
		page: 1,
    	count: 10,
		categories: state.category
			.map((category) => category.toLowerCase().replace(/\s+/g, "-"))
			.join(","),
	});
	const [planATrip, { isLoading, data }] = useLazyPlanATripQuery();
	useEffect(() => {
		planATrip(state)
			.unwrap()
			.then((res) => {
				console.log(res, data);
			})
			.catch((err) => {});
	}, [state]);

	const [addedLocations, setAddedLocations] = useState(
		JSON.parse(localStorage.getItem('location')) || []
	);

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
						<Card key={i}>
							<div className="w-full grid grid-cols-3">
								<div className="d-flex colmd-6">
									<img
										src={e?.business.businessLocationImages[0]}
										alt=""
										className="img-fluid w-[230px] h-[120px]"
									/>
									<div>
										<p>{e?.business.businessName}</p>
										<h5>{e?.business.locationDescription}</h5>
										<h6>{e?.business.businessCategory}</h6>
									</div>
								</div>
								<StarContainer className="d-flex  align-items-center colmd-3">
									<i>{FourStars}</i>
								</StarContainer>

								<div className="flex colmd-3 align-items-center justify-end w-full">
									<p className="me-3">{e?.budgetClass.label}</p>
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
													localStorage.setItem(
														'location',
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
