// src/components/Layout.jsx

import FindSessionButton from './FindSessionButton';

const Layout = ({ children, deviceId }) => {
  return (
    <div className="layout">
      <main>{children}</main>
      <footer>
        <FindSessionButton deviceId={deviceId} />
      </footer>
    </div>
  );
};

export default Layout;
