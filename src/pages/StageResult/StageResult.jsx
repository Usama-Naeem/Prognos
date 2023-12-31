import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Gauge } from "@ant-design/plots";
import { useParams } from "react-router-dom";
import { getPrognosUserAnswer } from "../../graphql/queries";
import { STAGE_CONDITIONS } from "../../shared/constant/FormBuilderConstants";
import { stages } from "../../shared/enum/stage";

const totalScore = 180;

const StageResult = () => {
  // user Id
  const { id } = useParams();

  const [percentAge, setPercentAge] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [color, setColor] = useState("#32CD32");
  const [isWarn, setIsWarn] = useState(false);
  const [weightages] = useState({
    attentionOrConcentration: 0.0618,
    balance: 0.5162,
    comprehension: 0.2373,
    delusionsAndParanoia: 0.209,
    eating: 0.1056,
    financialManagement: 0.837,
    hallucinations: 0.1312,
    mealPreperationOrCooking: 0.2881,
    socialInteractionOrWithdrawl: 0.0075,
    telephoneUse: 0.1984,
    writing: 0.5521,
  });

  const {
    MILD_COGNITIVE_IMPAIRMENT,
    MILD_DEMENTIA,
    MODERATE_DEMENTIA,
    SEVERE_DEMENTIA,
  } = stages;

  useEffect(() => {
    fetchUserSubmittedAnswers();
  }, [id]);

  const fetchUserSubmittedAnswers = async () => {
    try {
      const response = await API.graphql({
        query: getPrognosUserAnswer,
        variables: {
          id,
        },
        authMode: "API_KEY",
      });

      const userAnswers = JSON.parse(
        response?.data.getPrognosUserAnswer.answers,
      );
      // Destructuring 11 answers that have weightages
      const {
        attentionOrConcentration,
        balance,
        comprehension,
        delusionsAndParanoia,
        eating,
        financialManagement,
        hallucinations,
        mealPreperationOrCooking,
        socialInteractionOrWithdrawl,
        telephoneUse,
        writing,
      } = userAnswers;

      // Creating new object with only 11 answers
      const weightageAnswers = {};
      Object.assign(weightageAnswers, {
        attentionOrConcentration,
        balance,
        comprehension,
        delusionsAndParanoia,
        eating,
        financialManagement,
        hallucinations,
        mealPreperationOrCooking,
        socialInteractionOrWithdrawl,
        telephoneUse,
        writing,
      });

      // Assigning relevant weightage according to the selected option
      Object.keys(weightageAnswers).forEach((key) => {
        switch (weightageAnswers[key]) {
          case STAGE_CONDITIONS.LITTLE_TROUBLE:
            weightageAnswers[key] = 0.33;
            break;
          case STAGE_CONDITIONS.SOME_TROUBLE:
            weightageAnswers[key] = 0.66;
            break;
          case STAGE_CONDITIONS.ALOT_OF_TROUBLE:
            weightageAnswers[key] = 1;
            break;
          default:
            weightageAnswers[key] = 0;
        }
      });

      const values = Object.values(userAnswers);
      const assessmentResult = calculateAssessmentResult(
        weightageAnswers,
        weightages,
      );
      const unknownScore = calculateUnknownScore(values, assessmentResult);
      const patientCondtion = getColor(assessmentResult);
      setColor(patientCondtion);
      setUnknown(unknownScore);
      setPercentAge(assessmentResult);
    } catch (err) {
      throw Error(err.errors[0].message);
    }
  };

  const getColor = (score) => {
    if (score <= 50) return "#9ACD32";
    if (score > 50 && score <= 100) return "#FFD700";
    if (score > 100 && score <= 150) return "#FFA500";
    if (score > 150) return "#DC143C";
  };

  const calculateUnknownScore = (answers, assessmentResult) => {
    const counts = answers.filter((answer) => answer === "unknown").length;

    if (counts >= 15) setIsWarn(true);

    return (totalScore / assessmentResult) * counts;
  };

  const calculateAssessmentResult = (weightageAnswers, weightagesOfAnswers) => {
    // Calculating score
    const result = Object.keys(weightageAnswers).reduce((acc, key) => {
      // eslint-disable-next-line
      if (weightagesOfAnswers.hasOwnProperty(key)) {
        const multipliedValue =
          weightageAnswers[key] * weightagesOfAnswers[key];
        acc[key] = parseFloat(multipliedValue);
      }
      return acc;
    }, {});
    const sum = Object.values(result).reduce((acc, val) => acc + val, 0);

    return sum * 100;
  };
  const config = {
    range: {
      color: color,
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          switch (Number(v)) {
            case 0:
              // eslint-disable-next-line
              const MCI = "Mild Cognitive Impairment";
              // eslint-disable-next-line
              const MCIsplit = MCI.split(" ");
              return MCIsplit.map((word) => `${word}`).join("\n");
            case 0.33:
              return "Mild Dementia";
            case 0.66:
              // eslint-disable-next-line
              const MD = "Moderate Dementia";
              // eslint-disable-next-line
              const MDsplit = MD.split(" ");
              return MDsplit.map((word) => `${word}`).join("\n");
            case 0.99:
              // eslint-disable-next-line
              const SD = "Severe Dementia";
              // eslint-disable-next-line
              const SDsplit = SD.split(" ");
              return SDsplit.map((word) => `${word}`).join("\n");
            default:
              return "";
          }
        },
        offset: -40,
      },
      subTickLine: {
        count: 3,
      },
      tickInterval: 0.33,
    },
    statistic: {
      content: {
        offsetY: 36,
        formatter: ({ percent }) => {
          const result = percent * 180;
          if (result >= 0 && result <= 50) return MILD_COGNITIVE_IMPAIRMENT;
          if (result > 50 && result <= 100) return MILD_DEMENTIA;
          if (result > 100 && result <= 150) return MODERATE_DEMENTIA;
          if (result > 150) return SEVERE_DEMENTIA;
        },
        style: {
          color: "rgba(0,0,0,0.65)",
          fontSize: 20,
        },
      },
    },
  };
  return (
    <div className="background-gradient md:py-[60px] md:px-[120px]">
      <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
        <div className="text-center">
          <h3 className="pt-4">Your Staging Assessment Result</h3>
          <p className="pt-3 text-xl">
            If you have a chronic progressive condition like dementia, the results
            below suggest in lay <br /> terms what stage of disease best explains
            your symptoms. Formal staging requires a clinical evaluation.
          </p>
        </div>
        <div className="lg:h-96 md:h-64 sm:mb-24 md:">
          <Gauge
            range={{
              color: "#30BF78",
            }}
            percent={percentAge / 180}
            animation
            {...config}
            className="pt-0"
          />
        </div>

        <div className="m-10 lg:m-24 rounded-lg p-3">
          <p className="text-left text-[18px] ">
            Your dementia staging results can be helpful as an educational tool to
            suggest a category of concern for the symptoms reported. The purpose
            is to increase health literacy, health advocacy, and health promotion,
            to give you an idea of where you may be and where you may be headed,
            and to connect caregivers to each other and to a community health
            worker.
            <br />
            <br />
            The dial is a useful way to illustrate if and where you or your loved
            one is on this journey. Its correlation with clinical reasoning and
            validated clinical tools is exploratory only.
            <br />
            <br />
            The categories here include mild cognitive impairment (MCI), mild
            dementia, moderate dementia, and severe dementia. Some individuals
            with MCI may not progress to dementia. But 15-20% convert every year.
            By age 90, 1/3 of all seniors have dementia.
            <br />
            <br />
            There are many kinds of dementia. The most common dementia exhibits
            early short term memory changes. Others exhibit early changes in
            personality, language, balance, alertness, or hallucinations. But as
            any of the dementias progress, symptoms converge. For that reason, we
            have simplified our “categories of concern” to dementia in general.
            Our content library offers specific caregiver experiences and insights
            with the most common kinds of dementia.
            <br />
            <br />
            These staging results should not replace a medical evaluation. The
            earlier a clinical diagnosis of dementia, the earlier patients and
            their families can be reassured that treatable conditions have been
            ruled out, put together a care team, initiate measures to delay
            progression, and connect to resources.
            <br />
            <br />
            This tool is for educational purposes only. It is not a medical
            diagnoses. If you are experiencing new, persistent, severe or
            worsening problems with memory, thinking, speech, or behavior, reach
            out to a health care professional for a formal evaluation. A diagnosis
            is often required to secure access to resources.
          </p>
        </div>
        <br />
        <br />

        {isWarn && (
          <h5 className="flex justify-center pt-5">
            Due to lack of data, accuracy of provisonal staging may be compromised
          </h5>
        )}
      </div>
    </div>
  );
};

export default StageResult;
