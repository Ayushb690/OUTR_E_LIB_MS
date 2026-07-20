import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import bookstack from "../assets/bookstack.png";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    // let numberOfUsers = users.filter((user) => user.role === "User");
    // let numberOfAdmins = users.filter((user) => user.role === "Admin");
    let numberOfUsers = (users || []).filter(
      (user) => user.role === "User"
    );

    let numberOfAdmins = (users || []).filter(
      (user) => user.role === "Admin"
    );
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    // let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
    //   (book) => book.returnDate === null
    // );
    // let numberOfTotalReturnedBooks = allBorrowedBooks.filter(
    //   (book) => book.returnDate !== null
    // );

    const borrowed = allBorrowedBooks || [];

    let numberOfTotalBorrowedBooks = borrowed.filter(
      (book) => book.returnDate === null
    );

    let numberOfTotalReturnedBooks = borrowed.filter(
      (book) => book.returnDate !== null
    );
    setTotalBooks((books || []).length);
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, books, allBorrowedBooks]);
  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-100 min-h-screen">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-8">

          {/* ================= LEFT PANEL ================= */}
          <div className="flex flex-col gap-6">

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">
                Borrow Statistics
              </h2>

              <div className="flex justify-center">
                <div className="w-64 h-64">
                  <Pie
                    data={data}
                    options={{
                      cutout: "60%",
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Legend Card */}
            <div className="bg-white rounded-xl shadow-md p-6">

              <div className="flex justify-center mb-5">
                <img
                  src={bookstack}
                  alt="Book Stack"
                  className="w-28 object-contain"
                />
              </div>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#424d4d]"></span>
                  <span>Total Borrowed Books</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#525b76]"></span>
                  <span>Total Returned Books</span>
                </div>

              </div>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="flex flex-col gap-8">

            {/* Top Section */}
            <div className="grid lg:grid-cols-[360px_1fr] gap-8">

              {/* Statistics Cards */}
              <div className="space-y-5">

                {/* Users */}
                <div className="bg-white rounded-xl shadow-md h-[120px] flex items-center p-5 gap-5 transition hover:shadow-lg">

                  <div className="bg-gray-200 w-20 h-20 rounded-xl flex justify-center items-center">
                    <img
                      src={usersIcon}
                      alt="Users"
                      className="w-8"
                    />
                  </div>

                  <div className="w-[2px] h-16 bg-black"></div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      {totalUsers}
                    </h2>

                    <p className="text-gray-500">
                      Total Users
                    </p>
                  </div>

                </div>

                {/* Books */}
                <div className="bg-white rounded-xl shadow-md h-[120px] flex items-center p-5 gap-5 transition hover:shadow-lg">

                  <div className="bg-gray-200 w-20 h-20 rounded-xl flex justify-center items-center">
                    <img
                      src={bookIcon}
                      alt="Books"
                      className="w-8"
                    />
                  </div>

                  <div className="w-[2px] h-16 bg-black"></div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      {totalBooks}
                    </h2>

                    <p className="text-gray-500">
                      Total Books
                    </p>
                  </div>

                </div>

                {/* Admins */}
                <div className="bg-white rounded-xl shadow-md h-[120px] flex items-center p-5 gap-5 transition hover:shadow-lg">

                  <div className="bg-gray-200 w-20 h-20 rounded-xl flex justify-center items-center">
                    <img
                      src={adminIcon}
                      alt="Admins"
                      className="w-8"
                    />
                  </div>

                  <div className="w-[2px] h-16 bg-black"></div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      {totalAdmin}
                    </h2>

                    <p className="text-gray-500">
                      Total Admins
                    </p>
                  </div>

                </div>

              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-md p-8 flex flex-col justify-center items-center text-center">

                <img
                  src={user?.avatar?.url}
                  alt="Avatar"
                  className="w-36 h-36 rounded-full object-cover border-4 border-gray-200"
                />

                <h2 className="text-2xl font-bold mt-5">
                  {user?.name}
                </h2>

                <p className="text-gray-500">
                  {user?.role}
                </p>

                <p className="text-gray-600 mt-5 max-w-md leading-7">
                  Welcome to your admin dashboard. Here you can manage all the settings and monitor the statistics.
                </p>

              </div>

            </div>

            {/* Bottom Quote Card */}
            <div className="hidden xl:flex bg-white rounded-xl shadow-md p-10 min-h-[220px] relative flex-col justify-center">

              <h2 className="text-2xl font-semibold leading-relaxed text-gray-800">
                "A library is not a luxury but one of the necessities of life.
                Knowledge grows when it is shared, and every book borrowed is a
                step toward a brighter future."
              </h2>

              <p className="absolute bottom-8 right-10 text-gray-500 text-lg">
                ~ OUTR E-Library Team
              </p>

            </div>

          </div>

        </div>
      </main>
    </>
  );
};
export default AdminDashboard;
