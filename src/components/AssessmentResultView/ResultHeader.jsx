import React from "react";
import AppStoreComponent from "../app-store-component";

const ResultHeader = ({ showMessage }) => (
  <div className="p-[30px] m-0 md:px-[80px]">
    {showMessage && <h3>Your results are explained below</h3>}
    {showMessage && (
      <p>
        Based on your assessment, if the likelihood of dementia is moderate to
        high, consider the tailored content and community to help you tackle
        dementia on our app. Download our app now to access those personalized
        insights.
      </p>
    )}
    <AppStoreComponent />
    <br />
    {showMessage && (
      <p>
        This tool is for educational purposes only. It is not a medical
        diagnosis. If you are experiencing new, persistent, severe, or worsening
        problems with memory, thinking, speech, or behavior, reach out to a
        health care professional for a formal evaluation. A diagnosis is often
        required to secure access to resources.
      </p>
    )}
  </div>
);

export default ResultHeader;
