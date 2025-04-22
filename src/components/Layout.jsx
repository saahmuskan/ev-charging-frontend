import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <footer className="footer">
        <p>© 2025 EV Charging Station. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;