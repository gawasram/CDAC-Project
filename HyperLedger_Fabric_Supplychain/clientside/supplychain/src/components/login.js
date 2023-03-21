import React, { useState}  from "react";
import axios from 'axios';
import '../App.css';
import {  Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
import Register from "./register";




function Login({setUser,setUserRole,setUserOrg}) {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [organization, setorganization] = useState('org1');   
    const orgOptions = [
        { label: 'Organisation 1', value: 'org1' },
        { label: 'Organisation 2', value: 'org2' },
        { label: 'Organisation 3', value: 'org3' },
      ]; 
    //   const navigate = useNavigate();

    
    function  handleLogin(e) {
        // console.log("login ")
        e.preventDefault();
        setIsLoading(false);
        // console.log("login ", username,
        // password,
        // organization)

        setUser('TestUser');
        setUserRole('admin');
        setUserOrg(organization);
        

        //set token when login successfull
        // const response = await axios.get('localhost:3001/users/login', {
        //     username: username,
        //     password: password,
        //     organization: organization
        // })
        // axios.get('localhost:3001/users/login', {
        //     params: {
        //        username: username,
        //        password: password,
        //        organization: organization
        //     }
          

            // }).then((response) => {

            //     console.log("not login")
            //     setIsLoading(false);
            //     if(!response.data.status){
            //         alert(response.data.error.message);
            //         setusername('');
            //         setpassword('');
            //         setorganization('org1');
            //     } 
            //     else{
                    // setUser(response.data.user);
                    // setUserRole(response.data.role);
                    // setUserOrg(organization);
            //     }

            // });
    }
    
    return(
        <div className="app">
            {isloading && 
                <Spinner animation="border" role="status" variant="light">
                </Spinner>
            } 
            <div className="login-form">
                <div className="title">Sign In</div>
  
                <div className="form">
                    <form  onSubmit={handleLogin}>
                        <div className="input-container">
                            <label>Username </label>
                            <input className="input-box"  type="text" value = {username} required onChange={(e) => setusername(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input className="input-box"  type="password" value = {password} required onChange={(e) => setpassword(e.target.value)}/>
                        </div>
                            
                        <div className="input-container">
                            <label>Organisation </label>
                            <select className="input-box"  value ={organization} onChange={(e) => setorganization(e.target.value)}>
                                {orgOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="button-container">
        
                            <input type="submit" />
                        </div>
                        {/* <button type = "submit" onClick={Register} >login</button> */}
                        {/* <button type="button" class = "" onClick={} */}
                    </form>    
                </div>
            </div>
        </div>
    )
}
export default Login;