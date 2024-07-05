// src/pages/ComingSoon/ComingSoon.jsx
import logo from '../../assets/LoginVector.svg';

const ComingSoon = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white text-primary-500'>
      <img src={logo} alt='Yushi' className='w-72 h-72 mb-8 rounded-2xl' />
      <h1 className='text-4xl font-bold mb-4'>Feature in Progress: Thanks for Your Patience!</h1>
      <p className='text-xl'>This feature is currently under development. We appreciate your understanding!</p>
    </div>
  );
};

export default ComingSoon;