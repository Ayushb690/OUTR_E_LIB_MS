import React from "react";
import { useSelector } from "react-redux";
import { data } from "react-router-dom";

const Users = () => {
  const { users } = useSelector(state => state.user)

  const formatDate = (timeStamp) => {
    console.log(typeof timeStamp)
    const date = new Date(timeStamp);
    console.log(typeof data)
  }
  return <></>;
};

export default Users;
