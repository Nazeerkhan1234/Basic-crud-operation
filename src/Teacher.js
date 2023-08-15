import { useEffect, useState } from "react";

function Teacher() {
  const [Teacher, setTeacher] = useState([{}]);
  const [payload, setPayload] = useState({
    data: {
      name: "khan bhai",
    },
  });
  const [name, changName] = useState("");

  //useEffect Hooks
  useEffect(() => {
    fetch("http://localhost:1337/api/teachers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data)
        let newObj = data.data.map((cv, idx, arr) => {
          return {
            id: cv.id,
            name: cv.attributes.name,
            createdAt: cv.attributes.createdAt,
          };
        });
        // console.log(newObj)
        setTeacher(newObj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let getData = () => {
    fetch(`http://localhost:1337/api/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let setName = (e) => {
    // console.log(e.target.value);
    changName(e.target.value);
    setPayload({
      ...payload,
      data: {
        name: document.querySelector("input#exampleInputEmail1").value,
      },
    });
  };
  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setName(e);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              getData();
            }}
          >
            Submit
          </button>
        </form>
        <br />
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">createdAt</th>
            </tr>
          </thead>
          <tbody>
            {Teacher.map((cv, idx, arr) => {
              return (
                <tr key={idx}>
                  <td>{cv.id}</td>
                  <td>{cv.name}</td>
                  <td>{cv.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Teacher;
