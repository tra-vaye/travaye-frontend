import React, { useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { Button } from '../Buttons'
import TextArea from 'antd/es/input/TextArea';

const supportObject = {
    newLocation: '',
    newFeature: '',
    complaint: ''
}

const SupportModal = ({ onClick, username }) => {
    const [supportForm, setSupportForm] = useState(supportObject);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(supportForm);
    }

    const handleChange = (field, value) => {
		setSupportForm((prevInfo) => ({
			...prevInfo,
			[field]: value,
		}));
	};

    return (
        <Modal onClick={onClick} alignRight={true}>
            <h3 className='-mt-8 !text-xl font-bold'>Chat Support</h3>
            <p className='text-justify text-black font-normal mt-6'>
                Hello <span className='italic'>{username}!</span>
            </p>
            <p className='text-justify text-black font-normal mb-8'>
                Welcome to the Travaye admin support system. Please check the questions below. One scenario should cater for your need.
            </p>
            <SupportForm onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newLocation">
                        Suggest a New Location for Travaye
                    </label>
                    <input
                        id="newLocation"
                        placeholder='Enter Location'
                        value={supportForm.newLocation}
                        onChange={(e) => handleChange("newLocation", e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="newFeature">
                        Suggest an addition to existing features
                    </label>
                    <TextArea
                        placeholder="Enter suggestion"
                        rows="3"
                        name="newFeature"
                        value={supportForm.newFeature}
                        onChange={(e) => handleChange("newFeature", e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="complaint">
                        Make a compaint
                    </label>
                    <TextArea
                        placeholder="Type here"
                        rows="3"
                        name="complaint"
                        value={supportForm.complaint}
                        onChange={(e) => handleChange("complaint", e.target.value)}
                    />
                </div>
                <Button color="green" type="submit" className='!px-9 !py-2 mx-auto'>
                    Submit
                </Button>
            </SupportForm>
        </Modal>
    )
}

const SupportForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
		display: block;
		margin-bottom: 6px;
		font-weight: 600;
		font-size: 16px;
        color: black;
	}
	input, textarea {
		outline: none;
		display: block;
		width: 100%;
		background: #ffffff;
		border: 2px solid #CCFFE8;
		border-radius: 5px;
        color: #9D9D9D;

		/* margin-bottom: 16px; */
		padding: 4px 10px;
	}
`

export default SupportModal