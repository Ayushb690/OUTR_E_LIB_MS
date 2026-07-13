import React, { useState, useMemo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Layout & Components
import Sidebar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Users from "../components/Users";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  

  // Helper to render the correct Dashboard based on role
  const renderDashboard = () => {
    return user?.role === "Admin" ? <AdminDashboard /> : <UserDashboard />;
  };

  // Logic to determine which main content to display
  const renderMainContent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return renderDashboard();
      case "Books":
        return <BookManagement />;
      case "Catalog":
        return user?.role === "Admin" ? <Catalog /> : renderDashboard();
      case "Users":
        return user?.role === "Admin" ? <Users /> : renderDashboard();
      case "My Borrowed Books":
        return <MyBorrowedBooks />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex">
      {/* Sidebar - Positioned fixed or absolute inside this container */}
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 w-full">
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden z-20 absolute right-6 top-4 sm:top-6">
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="flex justify-center items-center bg-slate-600 rounded-md h-10 w-10 text-white shadow-md hover:bg-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>

        {/* Dynamic Component Injection */}
        <div className="p-4 sm:p-8">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Home;