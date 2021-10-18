import React, {useState} from 'react';
import FormErrors from '../common/FormErrors';


const EditContact = () => {
    const [contactInfo, setContactInfo] = useState({
        id:-1,
        firstName: '',
        lastName: '',
        phone: '',
        phoneLabel: '',
        email: '',
        emailLabel: '',
        formErrors: {
            firstName: '',
            lastName: '',
            phone: '',
            phoneLabel: '',
            email: '',
            emailLabel: ''
        },
        firstNameValid: false,
        lastNameValid: false,
        phoneValid: false,
        phoneLabelValid: false,
        emailValid: false,
        emailLabelValid: false,
        formValid: false
      });

      const handleChange = (e) => {
        let key = e.target.id;
        let val = e.target.value;
        console.log(key, val);
        setContactInfo((prevState) => ({...prevState,[key]:val}));
        validateField(key,val);
      }

      const handleClick = (e) => {
          console.log("Contact Info", contactInfo);
      }

      const validateField = (fieldName, value) => {
        let fieldValidationErrors = contactInfo.formErrors;
        let firstNameValid= contactInfo.firstNameValid;
        let lastNameValid= contactInfo.lastNameValid;
        let phoneValid= contactInfo.phoneValid;
        let phoneLabelValid= contactInfo.phoneLabelValid;
        let emailValid= contactInfo.emailValid;
        let emailLabelValid= contactInfo.emailLabelValid;

        switch(fieldName) {
            case 'firstName':
                firstNameValid = value.length >= 2;
                fieldValidationErrors.firstName = firstNameValid ? '': ' is required';
                break;
            case 'lastName':
                lastNameValid = value.length >= 2;
                fieldValidationErrors.lastName = lastNameValid ? '': ' is required';
                break;
            case 'phone':
                phoneValid = value.length >= 10;
                fieldValidationErrors.phone = phoneValid ? '': ' is invalid';
                break;
            case 'phoneLabel':
                phoneLabelValid = value.length >= 2;
                fieldValidationErrors.phoneLabel = phoneLabelValid ? '': ' is required';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'emailLabel':
                emailLabelValid = value.length >= 2;
                fieldValidationErrors.emailLabel = emailLabelValid ? '': ' is required';
                break;
            default:
                break;
        }
        var formValid = 
            firstNameValid &&
            lastNameValid &&
            phoneValid &&
            phoneLabelValid &&
            emailValid &&
            emailLabelValid;

        setContactInfo((prevState) => ({
            ...contactInfo,
            formErrors: {...fieldValidationErrors},
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            phoneValid: phoneValid,
            phoneLabelValid: phoneLabelValid,
            emailValid: emailValid,
            emailLabelValid: emailLabelValid,
            formValid: formValid
        }));
    }

    return (
        <div className="container px-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <FormErrors formErrors={contactInfo.formErrors} />
                    </div>
                </div>
            </div>
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
                        disabled={!contactInfo.formValid} 
                        >Submit</button>
                </div>
            </div>

        </div>
    );
}

export default EditContact;
