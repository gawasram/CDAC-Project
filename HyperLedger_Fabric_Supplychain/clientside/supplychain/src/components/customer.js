import React, { useState}  from "react";
import axios from 'axios';
import {  Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Customer(props){

    const [currentctx, setcurrentctx] = useState('none');
    const [orderId, setorderId] = useState();
    const [Result, setResult] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    function handleView(e) {
        setIsLoading(true);
        e.preventDefault();
        axios.get('http://localhost:3001/orders/history', {
            params: {
                ogname: props.UserOrg,
                username: props.User,
                userrole: props.UserRole,
                orderId: orderId
            }
        }).then((response) => {
            setIsLoading(false);
            Result.length=0;
            if(response.data.length > 0)
                setcurrentctx('View list');
            for (let i = 0; i < response.data.length; i++) {
                Result.push(response.data[i]);
            }
            setorderId('');
            
        });
    }

    return(
        <div >

            <button  className="button" onClick={() => setcurrentctx('View Order') }>View Order</button>
            {isloading && 
                <Spinner animation="border" role="status" variant="light">
                </Spinner>
            } 
            { (currentctx === 'View Order') && 
                <form onSubmit={handleView}>
                    <div className="input-container-submit">
                        <label> Order ID</label>
                        <input className="input-box"  type="text" value ={orderId} required onChange={(e) => setorderId(e.target.value)}/>
                    </div>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            }
            { currentctx === 'View list' && 
                <div >
                    <br></br>
                    <table className="order-list">
                        <thead>
                            <tr className="order-list-header">
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Producer ID</th>
                                <th>Shipper ID</th>
                                <th>Tracking Info</th>
                                <th>Retailer ID</th>
                                <th>Modified By</th>
                                <th>TimeStamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                Result.map((item) => (
                                    <tr key={item.Value.ID}>
                                        <td>{item.Value.ID}</td>
                                        <td>{item.Value.currentState}</td>
                                        <td>{item.Value.productId}</td>
                                        <td>{item.Value.quantity}</td>
                                        <td>{item.Value.price}</td>
                                        <td>{item.Value.producerId}</td>
                                        <td>{item.Value.shipperId}</td>
                                        <td>{item.Value.trackingInfo}</td>
                                        <td>{item.Value.retailerId}</td>
                                        <td>{item.Value.modifiedBy}</td>
                                        <td>{item.Timestamp}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}


export default Customer;