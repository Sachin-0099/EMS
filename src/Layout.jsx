import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Ulinkitus</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/employees" className="block text-gray-700 hover:text-blue-600">Employees</Link>
          <Link to="/settings" className="block text-gray-700 hover:text-blue-600">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Employee Management System</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* This renders the active nested route */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
