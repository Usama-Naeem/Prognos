import React from "react";
import { MedicalConditions } from "../../shared/enum/assessmentResultOptions";

const { ALZHEIMERS, DEPRESSION, INDETERMINATE, NORMAL } = MedicalConditions;

function ResultDetails({ conditionalText, diseaseType }) {
  let finalText = [];
  const depression = [
    "Your screening results suggest you may have a reversible condition that explains your reported symptoms. Reversible conditions include abnormalities of blood, electrolytes, hormones, vitamins, infections, or depression. Alternatively, but less likely, your results suggest an irreversible condition, like mild cognitive impairment or dementia. Dementia is chronic, progressive, and interferes with independent function.",

    "It is important to distinguish between reversible and irreversible conditions. With the appropriate medical workup and treatment, reversible conditions may be curable or manageable without progression of disease. Irreversible conditions will progress.",

    "Our content on dementia is available to all users of our platform but most relevant to those who likely have mild cognitive impairment or dementia. Content is accessible after exiting the screening assessment and signing in to complete staging questions.",

    "The following comments refer specifically to your answers to the screening questions:",

    "If you/your loved one is having difficulty with recent memory, finding words, following instructions, paying attention, hand-eye coordination, finding your way, or socially appropriate behavior, especially if any of these symptoms are causing you not to function independently, you should have your symptoms further evaluated by a healthcare professional. This screening is for educational and health advocacy purposes only and does not replace a medical evaluation. ",
  ];

  const irreversible = [
    "Your screening results suggest you may have an irreversible condition that explains your reported symptoms, like mild cognitive impairment or dementia. Dementia is chronic, progressive, and interferes with independent function. Alternatively, your results suggest a reversible condition, including abnormalities of blood, electrolytes, hormones, vitamins, infections, or depression.",

    "It is important to distinguish between irreversible and reversible conditions. Irreversible conditions will progress. With the appropriate medical workup and treatment, reversible conditions may be curable or manageable without progression of disease.",

    "Our content on dementia is available to all users of our platform but most relevant to those who likely have mild cognitive impairment or dementia. Content is accessible after exiting the screening assessment and signing in to complete staging questions.",

    "The following comments refer specifically to your answers to the screening questions:",

    "If you/your loved one is having difficulty with recent memory, finding words, following instructions, paying attention, hand-eye coordination, finding your way, or socially appropriate behavior, especially if any of these symptoms are causing you not to function independently, you should have your symptoms further evaluated by a healthcare professional. This screening is for educational and health advocacy purposes only and does not replace a medical evaluation. ",
  ];

  const indeterminate = ["The cause of your symptoms is indeterminate."];

  const normal = [
    "Your answers suggest your symptoms may be normal. Many factors including stress, lack of sleep or exercise, poor diet, and recent illness can produce mild brain problems that will improve once those factors are corrected.",
  ];

  if (diseaseType === DEPRESSION)
    finalText = [...depression, ...conditionalText];

  if (diseaseType === ALZHEIMERS)
    finalText = [...irreversible, ...conditionalText];

  if (diseaseType === INDETERMINATE) finalText = [...indeterminate];

  if (diseaseType === NORMAL) finalText = [...normal];

  return (
    <>
      <h3>Result Explanation</h3>
      <div className="text-[18px]">
        {finalText?.map((item, index) => (
          <p className="text-[18px]" key={index}>
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default ResultDetails;
