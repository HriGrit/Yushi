import logo from '../../assets/Logo.webp'

const Navbar = () => {
  return (
    <>
      <div className='bg-primary-700 h-16 flex items-center justify-between px-4'>
        <div className='flex items-center'>
          <img src={logo} alt='Logo' className='w-6 h-6 mr-4' />
          <h1 className='text-white text-lg font-bold'>Chats</h1>
        </div>
        {/* <img src='/icons/search.svg' alt='Search' className='w-6 h-6' /> */}
      </div>
    </>
  )
}

export default Navbar