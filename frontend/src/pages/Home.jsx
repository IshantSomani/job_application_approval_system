import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar /> 
      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;