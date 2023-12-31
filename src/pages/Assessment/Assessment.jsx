import React, { useState } from "react";
import AssessmentForm from "../../components/AssessmentForm/AssessmentForm";
import LogoutHeader from "../../components/Header/LogoutHeader";
import "../../components/AssessmentForm/AssessmentFormStyles.css";

function Assessment() {
  const urlParams = new URLSearchParams(window.location.search);
  const headerParam = urlParams.get("header");
  const [startAssessment, setStartAssessment] = useState(false);

  return (
    <div>
      {!headerParam && (
        <LogoutHeader
          className="fixed z-30 bg-darkColor"
          height="h-[60px]"
          logoWidth="w-[160px]"
          border=""
        />
      )}
      {startAssessment ? (
        <AssessmentForm />
      ) : (
        <div id="assessment-form">
          <div className="bg-white p-[20px] md:p-[60px] rounded-2xl max-w-[1280px] text-md md:text-[17px]">
            <p className="font-[500] text-center text-xl md:text-3xl">
              Brain Health Screening
            </p>
            <p>
              The following is for health promotion purposes only and is not a
              substitute for a medical evaluation. These questions help
              determine whether problems with memory, thinking, speech, or
              behavior indicate reversible or irreversible brain changes. We do
              not share your answers with anyone in an identifiable way.
            </p>
            <ol className="mt-4 list-decimal">
              <li className="pb-[7px]">
                Use the last 4 weeks as a reference unless otherwise indicated.
              </li>
              <li>
                If you are answering on behalf of a loved one, answer based on
                your observations. Don&apos;t guess what your loved one is
                thinking/feeling.
              </li>
            </ol>
            <p>
              This tool is for educational purposes only. It is not a medical
              diagnosis. If you are experiencing new, persistent, severe, or
              worsening problems with memory, thinking, speech, or behavior,
              reach out to a health care professional for a formal evaluation. A
              diagnosis is often required to secure access to resources.
            </p>
            <button
              className="bg-primaryColor block mt-[20px] md:mt-[40px] w-[180px] h-[40px] mx-auto text-white rounded-full"
              onClick={() => setStartAssessment(true)}
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment;
