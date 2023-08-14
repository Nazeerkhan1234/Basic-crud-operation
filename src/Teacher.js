import { useEffect, useState } from "react";

function Teacher() {
  const [Teacher, setTeacher] = useState([{}]);

  //useEffect Hooks
  useEffect(() => {
    fetch("http://localhost:1337/api/teachers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let newObj = data.data.map((cv,idx,arr)=>{
          return {
            Id:cv.id,
            name:cv.attributes.name,
            createdAt:cv.attributes.createdAt
          }
        });
        // console.log(newObj)
        setTeacher(newObj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
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
                  <td>{cv.Id}</td>
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
