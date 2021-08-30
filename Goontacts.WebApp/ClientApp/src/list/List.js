import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


const List = () => {
    const [contactList, setContactList] = useState([]);

    useEffect(() => {
        axios.get(`api/contact`)
            .then(resp => {
                console.log(resp.data);
                setContactList(resp.data);
            });
    }, []);
 
  return (
    <div className="container"> 
      <div className="row">
        <div className="column">
          <h1 className="text-center">Contacts</h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {
                contactList.map((elem, idx) => {
                  return(
                    <tr key={idx}>
                      <td>{elem.id}</td>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>{elem.phoneNumber}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;