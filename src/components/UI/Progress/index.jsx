import React from 'react'
import styled from 'styled-components';

const Progress = ({ step }) => {
  const width = step === 3 ? '100%' : `${Math.round(100* step/3)}%`;

  return (
    <div className="w-[23rem]">
      <div className="flex justify-between mb-2">
        <h5 className="text-lg">Progress</h5>
        <p className="!text-[#9D9D9D] text-lg">{step}/3</p>
      </div>
      <Bar width={width} />
    </div>
  )
}

const Bar = styled.div`
  height: 10px;
  width: 100%;
  position: relative;
  background-color: #9d9d9d;
  border-radius: 40px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 48px;
    background-color: #e9a309;
    width: ${(props) => `${props.width}`};

  }
  
`

export default Progress