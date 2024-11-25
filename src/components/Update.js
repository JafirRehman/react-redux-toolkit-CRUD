import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiupdateuser } from "../redux/slices";
import { useNavigate } from "react-router-dom";

export const Update = () => {
  const [usertoupdate, setUsertoupdate] = useState();

  const { id } = useParams();
  const gettingallusers = useSelector((state) => state.ourslice.data);

  useEffect(() => {
    if (id) {
      const findinguser = gettingallusers.find((user) => user.id === id);
      setUsertoupdate(findinguser);
    }
  }, []);
  function updatingolduser(e) {
    setUsertoupdate({ ...usertoupdate, [e.target.name]: e.target.value });
  }

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  function submitupdateduser(e) {
    e.preventDefault();
    dispatch(apiupdateuser(usertoupdate));
    Navigate("/showallusers");
  }
  return (
    <div>
      <h2 className="my-2">Edit User</h2>
      <form className="w-50 mx-auto my-5" onSubmit={submitupdateduser}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={usertoupdate && usertoupdate.name}
            onChange={updatingolduser}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={usertoupdate && usertoupdate.email}
            onChange={updatingolduser}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={usertoupdate && usertoupdate.age}
            onChange={updatingolduser}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={usertoupdate && usertoupdate.gender === "Male"}
            onChange={updatingolduser}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={usertoupdate && usertoupdate.gender === "Female"}
            onChange={updatingolduser}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
