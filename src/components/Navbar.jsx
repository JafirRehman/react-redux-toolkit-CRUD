import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getingrequesteddata } from "../redux/slices";
import { apiallusers } from "../redux/slices";

function Navbar() {
  const [searchdata, setSearchdata] = useState("");

  const totalusers = useSelector((state) => state.ourslice);
  const totallength = totalusers.data.length;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiallusers());
  }, [dispatch]);
  function lookfordata(e) {
    setSearchdata(e.target.value);
  }
  useEffect(() => {
    dispatch(getingrequesteddata(searchdata));
  }, [searchdata, dispatch]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand">RTK</p>

          <div className=" navbar-collapse">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Create Post
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/showallusers">
                  All Posts ({totallength})
                </a>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50 ml-auto"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={lookfordata}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
