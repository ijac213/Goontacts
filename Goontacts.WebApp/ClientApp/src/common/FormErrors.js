import React from "react";

const FormErrors = (formErrors) => {
  var errorList = formErrors.formErrors;
  return (
    <div className='formErrors'>
      {Object.keys(errorList).map((fieldName, i) => {
        if(errorList[fieldName].length > 0){
          return (
            <p key={i}>{fieldName} {errorList[fieldName]}</p>
          )        
        } else {
          return '';
        }
      })}
    </div>
  )
}

export default FormErrors;