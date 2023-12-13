import SessionTimeout from "./SessionTimeout";

const Layout = ({ children }) => {
  return (
    <div>
      <SessionTimeout />
      {children}
    </div>
  );
};

export default Layout;
