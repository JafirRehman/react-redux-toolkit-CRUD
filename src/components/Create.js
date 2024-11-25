import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { apidata } from "../redux/slices";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});

  function changing(e) {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  function formsubmission(e) {
    e.preventDefault();
    dispatch(apidata(users));
    Navigate("/showallusers");
  }
  return (
    <div>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={formsubmission}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={changing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={changing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            onChange={changing}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            onChange={changing}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            onChange={changing}
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

export default Create;
