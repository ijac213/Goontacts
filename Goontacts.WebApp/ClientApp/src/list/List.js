import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const List = () => {
    const [contactResult, setContactResult] = useState({
      contactItemList: [], 
      pageNo:1,
      pageSize:5,
      recCount:0
    });

    useEffect(() => {
        axios.get(`api/contact?pageSize=${contactResult.pageSize}&pageNo=${contactResult.pageNo}`)
            .then(resp => {
                console.log(resp);
                setContactResult(resp.data);
            });
    }, [contactResult.pageNo,contactResult.pageSize]);
 
    const handleSelectChange = e => {
      var oldPageCount = Math.ceil(contactResult.recCount/contactResult.pageSize);
      var newPageCount = Math.ceil(contactResult.recCount/e.target.value);
      var maxPageNo = contactResult.pageNo;
      if (oldPageCount>newPageCount && contactResult.pageNo>newPageCount){
        maxPageNo=newPageCount;
      }
      setContactResult({
        ...contactResult,
        pageSize: e.target.value,
        pageNo: maxPageNo
      });
    }

  return (
    <div className="container"> 
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Contacts</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
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
                contactResult.contactItemList.map((elem, idx) => {
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
      <div className="row">
        <div className="col-6">
            <button 
              onClick={e=>setContactResult({...contactResult, pageNo: 1})}
              disabled={contactResult.pageNo<=1}
              >First</button>
            <button
              onClick={e=>setContactResult({...contactResult, pageNo: contactResult.pageNo-1})}
              disabled={contactResult.pageNo<=1}
            >Prev</button>
            <span 
              style={{paddingLeft:"5px",paddingRight:"5px"}}>Page {contactResult.pageNo} of {Math.ceil(contactResult.recCount/contactResult.pageSize)}</span>
            <button
              onClick={e=>setContactResult({...contactResult, pageNo: contactResult.pageNo+1})}
              disabled={contactResult.pageNo>= Math.ceil(contactResult.recCount/contactResult.pageSize)}
            >Next</button>
            <button 
              onClick={e=>setContactResult({...contactResult, pageNo: Math.ceil(contactResult.recCount/contactResult.pageSize)})}
              disabled={contactResult.pageNo>= Math.ceil(contactResult.recCount/contactResult.pageSize)}>Last</button>
        </div>
        <div className="col-6">
            <div className="d-flex justify-content-end">
              <label style={{paddingRight:"5px"}}>Row Count</label>
              <select 
                onChange={handleSelectChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
        </div>
      </div>
    </div>
  );
}

export default List;