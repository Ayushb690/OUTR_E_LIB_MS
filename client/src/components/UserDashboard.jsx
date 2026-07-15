import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
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

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    );
    const numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

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
    <main className="relative flex-1 p-4 sm:p-6 pt-24 sm:pt-28">
      <Header />

      <div className="flex flex-col xl:flex-row gap-7 mt-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-7 flex-1 xl:flex-[4]">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-4 bg-white p-5 min-h-[110px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="w-[3px] bg-black self-stretch rounded-full"></span>
              <span className="bg-gray-300 h-16 w-16 shrink-0 flex justify-center items-center rounded-lg">
                <img src={bookIcon} alt="book-icon" className="w-7 h-7" />
              </span>
              <p className="text-base sm:text-lg font-semibold leading-snug">
                Your Borrowed Book List
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 min-h-[110px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="w-[3px] bg-black self-stretch rounded-full"></span>
              <span className="bg-gray-300 h-16 w-16 shrink-0 flex justify-center items-center rounded-lg">
                <img src={returnIcon} alt="return-icon" className="w-7 h-7" />
              </span>
              <p className="text-base sm:text-lg font-semibold leading-snug">
                Your Returned Book List
              </p>
            </div>
          </div>

          {/* Browse + logo */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-4 bg-white p-5 min-h-[110px] w-full rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="w-[3px] bg-black self-stretch rounded-full"></span>
              <span className="bg-gray-300 h-16 w-16 shrink-0 flex justify-center items-center rounded-lg">
                <img src={browseIcon} alt="browse-icon" className="w-7 h-7" />
              </span>
              <p className="text-base sm:text-lg font-semibold leading-snug">
                Let's browse the book inventory
              </p>
            </div>
            <img
              src={logo_with_title}
              alt="logo_with_title"
              className="hidden lg:block w-40 xl:w-48 shrink-0"
            />
          </div>

          {/* Quote */}
          <div className="bg-white p-6 sm:p-8 min-h-[180px] sm:min-h-52 flex-1 flex flex-col justify-center items-center text-center rounded-2xl shadow-sm relative">
            <h4 className="text-base sm:text-xl xl:text-2xl 2xl:text-3xl font-semibold leading-relaxed max-w-3xl">
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam,
              veniam totam cupiditate tenetur consequuntur cumque recusandae
              unde, possimus dolorum pariatur corporis nihil deleniti
              provident."
            </h4>
            <p className="text-gray-600 text-sm sm:text-base mt-4 self-end">
              ~ OUR E-Library Team
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center gap-7 xl:flex-[2] xl:max-w-sm w-full">
          <div className="bg-white w-full rounded-2xl shadow-sm p-5 flex items-center justify-center">
            <div className="w-full max-w-[260px]">
              <Pie data={data} options={{ cutout: 0 }} />
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 w-full bg-white rounded-xl shadow-sm">
            <img src={logo} alt="logo" className="w-auto h-12 2xl:h-16 shrink-0" />
            <span className="w-[2px] bg-slate-500 self-stretch"></span>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3 text-sm sm:text-base">
                <span className="w-3 h-3 rounded-full bg-[#424d4d] shrink-0"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3 text-sm sm:text-base">
                <span className="w-3 h-3 rounded-full bg-[#525b76] shrink-0"></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;