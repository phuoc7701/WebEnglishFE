import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserLayout = ({ toggleView }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar toggleView={toggleView} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
