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
    console.log("Selected Book ID:", bookId);

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
      <main className="relative min-h-screen bg-gray-100 p-6 pt-28">
        <Header />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Catalog
          </h1>
          <p className="mt-1 text-gray-500">
            View and manage borrowed and overdue books.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setFilter("borrowed")}
            className={`w-full sm:w-64 rounded-lg border-2 py-3 font-semibold transition-all duration-300
          ${filter === "borrowed"
                ? "border-black bg-slate-600 text-white shadow-md"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            Borrowed Books
          </button>

          <button
            onClick={() => setFilter("Overdue")}
            className={`w-full sm:w-64 rounded-lg border-2 py-3 font-semibold transition-all duration-300
          ${filter === "Overdue"
                ? "border-black bg-slate-600 text-white shadow-md"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            Overdue Borrowers
          </button>
        </div>

        {/* Table / Empty State */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-600 text-white">
                  <tr>
                    <th className="px-5 py-4 text-left">ID</th>
                    <th className="px-5 py-4 text-left">Username</th>
                    <th className="px-5 py-4 text-left">Email</th>
                    <th className="px-5 py-4 text-left">Price</th>
                    <th className="px-5 py-4 text-left">Due Date</th>
                    <th className="px-5 py-4 text-left">Date & Time</th>
                    <th className="px-5 py-4 text-center">Return</th>
                  </tr>
                </thead>

                <tbody>
                  {booksToDisplay.map((book, index) => (
                    <tr
                      key={index}
                      className="border-b transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">{index + 1}</td>

                      <td className="px-5 py-4 font-medium">
                        {book?.user?.name}
                      </td>

                      <td className="px-5 py-4">
                        {book?.user?.email}
                      </td>

                      <td className="px-5 py-4">
                        ₹{book.book.price}
                      </td>

                      <td className="px-5 py-4">
                        {formatDate(book.dueDate)}
                      </td>

                      <td className="px-5 py-4">
                        {formatDateAndTime(book.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          {book.returnDate ? (
                            <FaSquareCheck
                              className="h-6 w-6 text-green-600"
                            />
                          ) : (
                            <PiKeyReturnBold
                              onClick={() => {
                                console.log("Borrow Record:", book);
                                console.log("Book Object:", book.book);

                                openReturnBookPopup(
                                  book.book.id,
                                  book.user.email)
                              }}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex h-[55vh] items-center justify-center rounded-xl bg-white shadow-lg">
            <h3 className="text-center text-3xl font-semibold text-gray-600">
              No {filter === "borrowed" ? "borrowed" : "overdue"} books found!!
            </h3>
          </div>
        )}
      </main>

      {returnBookPopup && (
        <ReturnBookPopup
          bookId={borrowedBookId}
          email={email}
        />
      )}
    </>
  );
};
export default Catalog;