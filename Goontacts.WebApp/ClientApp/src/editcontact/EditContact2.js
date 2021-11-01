import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Data from "./schemas/DataSchemas";

const EditContact2 = () => {
  return (
    <Formik
      initialValues={Data.initialValues}
      validationSchema={Data.validationSchema}
      onSubmit={(values) =>{
        console.log("contactInfo", values); 
      }}>
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
    </Formik>
  )
}

export default EditContact2 