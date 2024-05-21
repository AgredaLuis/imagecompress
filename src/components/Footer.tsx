import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col justify-center items-center w-full py-14 px-4 md:px-14 lg:px-32  bg-gray-700 text-white">
            <div className='w-[80%] h-px bg-gray-500 my-4 rounded-lg'></div>
            <div className="text-center py-4">
                Made for the common good - <a href="https://antuan01.com/" className="font-semibold text-blue-200 hover:text-blue-600">AntuanLabs</a>
            </div>
        </footer>
    );
};

export default Footer;
