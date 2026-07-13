import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { recordBorrowBook } from " .. /store/slices/borrowSlice";

const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook(email, bookId))
  };
  return (
    <div className="fixed inset-0 Dbg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-1g shadow-1g md:w-1/3">
        <div className="p-6">
          <h3 className="text-x1 font-bold mb-4">Record Book</h3>
          <form onSubmit={handleRecordBook}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                <input type="email"value={email} onChange={(e)=>setEmail(e.target.value)} />
                User Email
              </label>
            </div>
          </form>
        </div>
      </div >
    </div >


  );
};

export default RecordBookPopup;