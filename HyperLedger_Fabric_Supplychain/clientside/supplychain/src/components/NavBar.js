import React  from "react";
import {Link} from "react-router-dom";

function Navbar(props){

    return(
        <nav className="navbar">

            {/* { props.User === 'admin' &&  */
             <div className="links">
                <h4><Link  to = "/register"> Register</Link></h4>
            </div>
            }
            <div className="links">
            {/* { (iprops.UserRole === 'producer' || props.User === 'admin')&&  */
                 <h4><Link  to = "/producer"> Producer</Link></h4>
            }
            </div>

            <div className="links">
            {/* { (props.UserRole === 'shipper'  || props.User === 'admin')&&  */
                <h4><Link   to = "/shipper"> Shipper</Link></h4>
            }
            </div>
                    
            <div className="links">
            {/* { (props.UserRole === 'retailer'  || props.User === 'admin')&&  */
                <h4><Link to = "/retailer"> Retailer</Link></h4>
            }
            </div>
                    
            <div className="links">
            {/* { (props.User === 'admin' || props.UserRole === 'customer') &&  */
                <h4><Link  to = "/customer"> Customer</Link></h4>
            }
            </div>

            <div className="links">
            {/* { (props.User === 'admin' || props.UserRole === 'regulator') &&  */
                <h4><Link to = "/regulator"> Regulator</Link></h4>
            }
            </div>

           
        </nav>
    )
}

export default Navbar;