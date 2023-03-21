import React, { useState } from "react";
//import axios from "axios";
import "./register.css";
import '../App.css';
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import { useNavigate } from "react-router-dom";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterEnroll(e) {
    e.preventDefault();

    setIsLoading(false);
    setUsername("");
    setPassword("");
    setRole("");

    // axios({
    //   method: "post",
    //   url: "http://localhost:3001/users/enroll&register",
    //   data: {
    //     username: username,
    //     password: password,
    //     organization: props.UserOrg,
    //     role: role,
    //   },
    // })
    // .then((response) => {
    //   setIsLoading(false);
    //   if (!response.data.status) {
    //     alert(response.data.error.message);
    //     setUsername("");
    //     setPassword("");
    //     setRole("");
    //   } else {
    //     alert(response.data.message);
    //     setUsername("");
    //     setPassword("");
    //     setRole("");
    //   }
    // });
  }

  return (
    <div className="register-container">



      <br></br>
      <div className="input-container-submit">
        <label>Username</label>
        <input
          type="text"
          className="input-box"
        value={username}
         required
         onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container-submit">
        <label>Password</label>
        <input
          type="password"
          className="input-box"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container-submit">
        <label>Role</label>
        <input
          type="text"
          className="input-box"
        value={role}
        required
        onChange={(e) => setRole(e.target.value)}
        />
      </div>
      
      <input
        className="submit-button"
        type="submit"
        value="Submit"
        onClick={handleRegisterEnroll}
      />
    </div>
  );
}



export default Register;


