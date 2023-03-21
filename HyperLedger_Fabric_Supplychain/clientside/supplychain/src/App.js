import { useState } from "react";
import './App.css';
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import React, { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import Producer from "./components/producer";
import Shipper from "./components/shipper";
import Retailer from "./components/retailer";
import Customer from "./components/customer";
import Regulator from "./components/regulator";
import Login from "./components/login";
import Register from "./components/register";
import AdminHome from "./components/AdminHome"


function App() {
    const [User, setUser] = useState();
    const [UserRole, setUserRole] = useState();
    const [UserOrg, setUserOrg] = useState();

    if (!User) {
        return <Login setUser={setUser} setUserRole={setUserRole} setUserOrg={setUserOrg} />
    }

    return (
        
<BrowserRouter>
            <div className="app-home">
                <div className="content">
                    {
                        UserRole === "admin" ? 
                              
                                <Routes>
                                    <Route path="/" element={<AdminHome User={User} UserRole={UserRole} UserOrg={UserOrg} />}>
                                    <Route path="register" element={<Register User={User} UserRole={UserRole} UserOrg={UserOrg} />}/>
                                    <Route path="producer" element={< Producer User={User} UserRole={UserRole} UserOrg={UserOrg} />} />
                                    <Route path="shipper" element={<Shipper User={User} UserRole={UserRole} UserOrg={UserOrg} />}/>
                                    <Route path="retailer" element={<Retailer User={User} UserRole={UserRole} UserOrg={UserOrg} />}/>
                                    <Route path="regulator" element={<Regulator User={User} UserRole={UserRole} UserOrg={UserOrg} /> }/>
                                    <Route path="customer" element={<Customer User={User} UserRole={UserRole} UserOrg={UserOrg} />}/>
                                    <Route path="login" element={<Login setUser={setUser} setUserRole={setUserRole} setUserOrg={setUserOrg} />}/>
                                    </Route>
                                </Routes>
                              
                        :(UserRole === "producer"
                            ? < Producer User={User} UserRole={UserRole} UserOrg={UserOrg} />
                        :(UserRole === "shipper" ? <Shipper User={User} UserRole={UserRole} UserOrg={UserOrg} /> 
                        :(UserRole === "retailer" ? <Retailer User={User} UserRole={UserRole} UserOrg={UserOrg} />
                        :(UserRole === "regulator" ? <Regulator User={User} UserRole={UserRole} UserOrg={UserOrg} /> 
                        :(UserRole === "customer" ? <Customer User={User} UserRole={UserRole} UserOrg={UserOrg} /> : "Wrong path")))))
                    }
                    
                </div>
            </div>
            </BrowserRouter>
    );
}

export default App;
