import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = ({ toggleView }) => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <AdminNavbar toggleView={toggleView} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
