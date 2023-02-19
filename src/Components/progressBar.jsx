import React from 'react'
import ChecklistSvg from '../Assets/Icons/checklist.svg'

const ProgressBar = ({ progress }) => {
    if (progress) {
        return (
            <div className='flex gap-3'>
                <div className='w-full bg-[#EDEDED] rounded-full h-4'>
                    <div
                        className={`${progress <= 100 ? 'bg-[#01959F]' : 'bg-[#43936C]'} h-4 rounded-full`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                {progress <= 100 ? (
                    <span className='text-sm text-[#757575] leading-4'>{`${progress}%`}</span>
                ) : (
                    <img className='h-4' src={ChecklistSvg} alt='' />
                )}
            </div>
        )
    }
}

export default ProgressBar
