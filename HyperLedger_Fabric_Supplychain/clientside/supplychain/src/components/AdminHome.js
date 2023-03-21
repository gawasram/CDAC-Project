import "./Styles.css"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";

function AdminHome(props){
	return <div className="home-container">
		<div className="side-panel">
			<div className="Navbar">
                <NavBar User={props.User} UserRole={props.UserRole} UserOrg={props.UserOrg} />
            </div>
		</div>
		<div className="main-body">
			<Outlet/>
		</div>
	</div>
}

export default AdminHome;