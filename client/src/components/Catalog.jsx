import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import Header from "../layout/Header";

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading, error, allBorrowedBooks, message } = useSelector(
    (state) => state.borrow
  );

  const [filter, setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-
    ${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

    const formattedTime = `${String(date.getHours()).
      padStart(2, "0")}
      :${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
      ).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-
    ${String(date.getMonth() + 1).
        padStart(2, "0")}-${String(date.getFullYear())}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });
  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });
  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading]);
  return (
    <>
      <main className="relative flex flex-col p-6 pt-28 min-h-screen bg-gray-100">
  <Header />

  {/* Page Title */}
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-800">
      Catalog
    </h1>
    <p className="text-gray-500">
      Manage borrowed and overdue books
    </p>
  </div>

  {/* Filter Buttons */}
  <div className="mb-6 flex flex-wrap gap-3">
    <button
      onClick={() => setFilter("borrowed")}
      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
      ${
        filter === "borrowed"
          ? "bg-slate-600 text-white shadow-md"
          : "bg-white border border-gray-300 hover:bg-gray-100"
      }`}
    >
      Borrowed Books
    </button>

    <button
      onClick={() => setFilter("Overdue")}
      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
      ${
        filter === "Overdue"
          ? "bg-slate-600 text-white shadow-md"
          : "bg-white border border-gray-300 hover:bg-gray-100"
      }`}
    >
      Overdue Borrowers
    </button>
  </div>

  {/* Content */}
  <div className="flex-1">
    {booksToDisplay.length > 0 ? (
      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            ...
          </table>
        </div>
      </div>
    ) : (
      <div className="flex h-[55vh] flex-col items-center justify-center rounded-xl bg-white shadow-lg">

        <h2 className="text-3xl font-semibold text-gray-700">
          No {filter === "borrowed" ? "borrowed" : "overdue"} books found
        </h2>

        <p className="mt-3 text-gray-500">
          Books will appear here once users borrow them.
        </p>
      </div>
    )}
  </div>
</main>
      {
        returnBookPopup &&
        (<ReturnBookPopup bookId={borrowedBookId} email={email} />)
      }
    </>
  );
};

export default Catalog;