import React, { useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { CloudUpload } from '../svgs/svgs';
import { useGetStatesQuery, useLazyGetLgaQuery } from '../../../redux/Api/geoApi';
import { Select } from 'antd';
import { useGetBudgetsQuery, useGetCategoriesQuery } from '../../../redux/Api/locationApi';
import { Button } from '../Buttons';

const AdvertModal = ({ onClick}) => {
    const [advertForm, setAdvertForm] = useState({
        advertImages: [],
        advertState: '',
        advertLGA: '',
        advertBudget: 'Select Range',
        advertCategory: [],
        advertPlan: 'Select Advert Plan'
    });

    const { data: states } = useGetStatesQuery();
    const { data: budgets } = useGetBudgetsQuery();
    const [getLga, { data: lga }] = useLazyGetLgaQuery();
    const { data: categories } = useGetCategoriesQuery();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(AdvertForm);
    }

    const handleChange = (field, value) => {
		setAdvertForm((prevInfo) => ({
			...prevInfo,
			[field]: value,
		}));
	};

    const handleLocationImagesFileDrop = (acceptedFiles, field) => {
		// console.log(acceptedFiles);
		setAdvertForm((prevInfo) => ({
			...prevInfo,
			[field]: [...advertForm.advertImages, ...acceptedFiles],
		}));
	};
    // console.log(categories);

    return (
        <Modal onClick={onClick} alignRight={true} type='ad'>
            <h3 className='-mt-8 !text-xl font-bold mb-3'>Create Advert</h3>
            <AdvertForm onSubmit={handleSubmit}>
                <section>
                    <h5>Step 1</h5>
                    <label>Please upload pictures of your event.</label>
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={true}
                        onDrop={(acceptedFiles) =>
                            handleLocationImagesFileDrop(
                            acceptedFiles,
                            "advertImages"
                            )
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section {...getRootProps()}>
                            <input {...getInputProps()} />
                            <FileUpload>
                                {advertForm.advertImages.length === 0 ? (
                                `Upload Event Pictures`
                                ) : (
                                <div className="flex gap-3 flex-wrap">
                                    {advertForm.advertImages.map(
                                    (file, index) => (
                                        <div className='flex gap-1 items-center flex-wrap' key={index}>
                                        <p className='mr-1'>
                                            {file.name}
                                        </p>
                                        </div>
                                    )
                                    )}
                                </div>
                                )}
                                <i>{CloudUpload}</i>
                            </FileUpload>
                            </section>
                        )}
                    </Dropzone>
                </section>
                <section>
                    <h5>Step 2</h5>
                    <label>Please Select a Location</label>
                    <div className='md:flex gap-3'>
                        <select className='flex-1' value={advertForm.advertState} onChange={(e) => {
                            getLga({ state: e.target.value.toUpperCase() });
                            handleChange("advertState", e.target.value);
                        }}>
                            <option value='' disabled>State</option>
                            {
                                states?.map(state => (
                                    <option value={state.value} key={state.value}>{state.label}</option>
                                ))
                            }
                        </select>
                        <select className='flex-1' value={advertForm.advertState} onChange={(e) => handleChange("advertLGA", e.target.value)}>
                            <option value='' disabled>LGA</option>
                            {
                                lga?.map(lg => (
                                    <option value={lg.value} key={lg.value}>{lg.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </section>
                <section className='flex gap-3'>
                    <div className='flex-1'>
                        <h5>Step 3</h5>
                        <label>Please select a Price range</label>
                        <select value={advertForm.advertBudget} onChange={(e) => handleChange("advertBudget", e.target.value)}>
                            {
                                budgets?.map(budg => (
                                    <option key={budg._id} value={budg._id}>{budg.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex-1'>
                        <h5>Step 4</h5>
                        <label>Please Select a Category of Special Events</label>
                        <select value={advertForm.advertBudget} onChange={(e) => handleChange("advertBudget", e.target.value)}>
                            {
                                categories?.map(cate => (
                                    <option key={cate._id} value={cate.value}>{cate.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </section>
                <section className='flex gap-3'>
                    <div className='w-1/2'>
                        <h5>Step 5</h5>
                        <label>Please Select an Advert Plan</label>
                        <select value={advertForm.advertBudget} onChange={(e) => handleChange("advertBudget", e.target.value)}>
                            {
                                categories?.map(cate => (
                                    <option key={cate._id} value={cate.value}>{cate.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </section>
                <div>
                    <Button color="green" type="submit" className='!px-9 !py-2 mx-auto mt-8'>
                        Post
                    </Button>
                </div>
            </AdvertForm>
        </Modal>
    )
}

const AdvertForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;

    h5 {
        font-size: 18px;
        font-weight: 700;
        color: #009F57;
        margin-bottom: 4px;
    }

    label {
		display: block;
		margin-bottom: 6px;
		font-size: 16px;
        color: black;
        font-weight: 400;
	}
	input, select, textarea {
		outline: none;
		display: block;
		width: 100%;
		background: #ffffff;
		border: 2px solid #CCFFE8;
		border-radius: 5px;
        color: #9D9D9D;
		padding: 4px 10px;
	}
`

const FileUpload = styled.div`
	display: block;
	width: 100%;
	background: #ffffff;
	text-align: center;
	color: #e9a309;
	border: 2px solid rgba(0, 159, 87, 0.25);
	border-radius: 5px;
	padding: 0 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
`;


export default AdvertModal