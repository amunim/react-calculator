import React, { useEffect, useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  
  return (
    <>
      <div className="w-full h-full bg-sky-100 absolute">
      </div>
      <div className='flex flex-col justify-center h-[100%] w-[100%] absolute' >
        <Calculator />
        <div className='author text-lg'>
          <p className='text-center mt-2'>Coded and Developed By</p>
          <p className='text-center text-[#00264d]'>Abdul Munim</p>
        </div>
      </div>
    </>
  );
}

export default App;
