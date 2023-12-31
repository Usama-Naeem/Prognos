import React from "react";

const ApiErrorMessage = ({ errorMessage }) => (
  <>
    <div className="self-start">
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
    </div>
  </>
);

export default ApiErrorMessage;
