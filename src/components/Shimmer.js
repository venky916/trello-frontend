import React from 'react';

const Shimmer = () => {
    return (
        <div className='bg-black p-4 rounded-lg'>
            <div className='animate-pulse space-y-4'>
                <div className='bg-gray-700 h-6 w-3/4 rounded'></div>
                <div className='bg-gray-700 h-4 w-1/2 rounded'></div>
                <div className='bg-gray-700 h-4 w-1/3 rounded'></div>
                <div className='flex space-x-2 justify-between items-center'>
                    <div className='bg-gray-700 h-8 w-1/4 rounded'></div>
                    <div className='bg-gray-700 h-8 w-1/4 rounded'></div>
                </div>
            </div>
        </div>
    );
};

export default Shimmer;
