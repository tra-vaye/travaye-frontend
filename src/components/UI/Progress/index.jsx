import React from 'react'

const Progress = ({ step }) => {
  return (
    <div className="w-[23rem]">
        <div className="flex justify-between mb-2">
            <h5 className="text-lg">Progress</h5>
            <p className="!text-[#9D9D9D] text-lg">{step}/3</p>
        </div>
        <div className={`h-2.5 w-full relative bg-[#9D9D9D] rounded-[2.8rem] after:content:[''] after:bg-[#E9A309] ${step === 3 ? 'after:w-full' : `after:w-${Number(step)}/3`} after:absolute after:left-0 after:h-full after:rounded-[2.8rem]`} />
    </div>
  )
}

export default Progress