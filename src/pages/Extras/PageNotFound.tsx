// src/pages/NotFound/NotFound.jsx
import logo from '../../assets/Login.webp';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-light-500 text-white'>
      <img src={logo} alt='Yushi' className='w-96 h-72 mb-8' />
      <h1 className='text-4xl font-bold mb-4'>Error 404 - Page Not Found</h1>
      <p className='text-xl'>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;