import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md bg-white   rounded">
        <Outlet /> {/* Login or Signup goes here */}
      </div>
    </div>
  );
};

export default PublicLayout;
