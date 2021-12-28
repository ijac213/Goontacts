import { useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Data from "./schemas/DataSchemas";
import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const {id} = useParams();
  const isAddMode = !id;
  const history = useHistory();
  
  const onSubmit = (fields, {setStatus, setSubmitting}) => {
    setStatus();
    if (isAddMode){
      createContact(fields, setSubmitting);
    } else {
      updateContact(fields, setSubmitting);
    }
  }
  
  const createContact = (fields, setSubmitting) => {
    console.log("Create Contact", fields);
    axios.post("/api/contact",fields)
      .then(resp => {
        console.log("Create Contact", resp);
        history.goBack();
      })
      .catch(err => {
        console.log("Create Contact", err);
        setSubmitting(false);
      })
  }

  const updateContact = (fields, setSubmitting) => {
    console.log("Update Contact", fields);
    axios.put("/api/contact", fields)
      .then(resp => {
        console.log("Update contact", resp);
        history.goBack();
      })
      .catch(err => {
        console.log("Update contact", err);
        setSubmitting(false);
      })
  }

  return(
    <Formik
      initialValues={Data.initialValues}
      validationSchema={Data.validationSchema}
      onSubmit={onSubmit}>
      {
        function Render({errors, touched,isSubmitting,setFieldValue}) {
          const [contactInfo, setContactInfo] = useState({
            id:-1,
            firstName: '',
            lastName: '',
            phone: '',
            phoneLabel: '',
            email: '',
            emailLabel: '',
          });
          useEffect(() => {
            if (!isAddMode) {
              axios.get(`/api/contact/${id}`)
                .then(resp => {
                  console.log("Response from fetching contact info", resp);
                  let contactInfo = resp.data;
                  const fields = ["id","firstName","lastName","phone","phoneLabel","email","emailLabel"];
                  fields.forEach (field => setFieldValue(field, contactInfo[field], false));
                  setContactInfo(contactInfo);
                })
                .catch(err => console.log('Error While Fetching Contact Info', err));
            }
          },[]);

          return (
            <Form className="form">
            <div className="container px-4">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="firstName"/>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="lastName"/>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="phone">Phone Number</label>
                  <Field name="phone" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="phone"/>
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneLabel">Phone Label</label>
                  <Field name="phoneLabel" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="phoneLabel"/>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="email"/>
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailLabel">Email Label</label>
                  <Field name="emailLabel" type="text" className="form-control"/>
                  <span style={{color:"red"}}>
                    <ErrorMessage name="emailLabel"/>
                  </span>
                </div>
              </div>
              <button type="submit">Submit</button>
            </div>
          </Form>
          )

        }
      }
    </Formik>
  )
}

export default Contact;