import React, { useState } from "react";
import SignIn from "./SignIn";

export const ApiClient = () => {
  const [formData, setFormData] = useState(null);

  const handleSubmitted = (data) => {
    setFormData(data);
    console.log('Form Data:', data); // Log the form data when it is set
  };

  return (
    <div>
      <SignIn onSubmit={handleSubmitted} />
      {formData && (
        <div>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
};
