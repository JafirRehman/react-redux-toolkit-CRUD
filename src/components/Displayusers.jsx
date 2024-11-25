import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { apiallusers, apideleteuser } from "../redux/slices";
import { Popup } from "./Popup";
import { Link } from "react-router-dom";
import "./Displayusers.css";

function Displayusers() {
  const [filter, setFilter] = useState("All");

  const [id, setId] = useState();
  const [pop, setPop] = useState(false);

  const dispatch = useDispatch();
  const jafir = useSelector((state) => state.ourslice);
  useEffect(() => {
    dispatch(apiallusers());
  }, [dispatch]);
  if (jafir.isLoading) {
    return <h1>Loading</h1>;
  }

  var ourbelovedusers;
  if (filter === "All") {
    ourbelovedusers = jafir.data;
  } else if (filter === "Men") {
    ourbelovedusers = jafir.data.filter((user) => user.gender === "Male");
  } else {
    ourbelovedusers = jafir.data.filter((user) => user.gender === "Female");
  }

  return (
    <>
      <div className="button-container">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Women")}>Women</button>
        <button onClick={() => setFilter("Men")}>Men</button>
      </div>

      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginTop: "50px",
        }}
      >
        {pop && <Popup id={id} setPop={setPop} />}
        {ourbelovedusers &&
          ourbelovedusers
            .filter((abc) => {
              if (jafir.requesteddata.length === 0) {
                return abc;
              } else {
                return abc.name
                  .toLowerCase()
                  .includes(jafir.requesteddata.toLowerCase());
              }
            })
            .map((user) => (
              <div key={user.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {user.email}
                  </h6>
                  <p className="card-text">{user.gender}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(user.id), setPop(true)]}
                  >
                    View
                  </button>
                  <Link className="card-link" to={`/updateuser/${user.id}`}>
                    Edit
                  </Link>
                  <button
                    className="card-link"
                    onClick={() => dispatch(apideleteuser(user.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Displayusers;
