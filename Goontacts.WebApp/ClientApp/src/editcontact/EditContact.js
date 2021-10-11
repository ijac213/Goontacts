import React, {useState} from 'react';


const EditContact = () => {
    const [contactInfo, setContactInfo] = useState({
        id:-1,
        firstName: '',
        lastName: '',
        phone: '',
        phoneLabel: '',
        email: '',
        emailLabel: '',
      });

      const handleChange = (e) => {
        let key = e.target.id;
        let val = e.target.value;
        console.log(key, val);
        setContactInfo({...contactInfo,[key]:val});
      }

      const handleClick = (e) => {
          console.log("Contact Info", contactInfo);
      }

    return (
        <div className="container px-4">
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        className="form-control"
                        id="firstName"
                        onChange = {handleChange}
                        placeholder="First Name" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        className="form-control"
                        id="lastName"
                        onChange = {handleChange}
                        placeholder="Last Name" />
                </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text"
                        className="form-control"
                        id="phone"
                        onChange = {handleChange}
                        placeholder="Phone Number"/>
              </div>
              <div className="col-md-6">
                <label htmlFor="phoneLabel">Phone Label</label>
                <input type="text" 
                            className="form-control"
                            id="phoneLabel"
                            onChange = {handleChange}
                            placeholder="Phone Label" />
              </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                            className="form-control"
                            id="email"
                            onChange = {handleChange}
                            placeholder="Email" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="emailLabel">Email Label</label>
                    <input type="text"
                            className="form-control"
                            id="emailLabel"
                            onChange = {handleChange}
                            placeholder="Email Label" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-1">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleClick}
                        >Submit</button>
                </div>
            </div>

        </div>
    );
}

export default EditContact;
