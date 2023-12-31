import React, { useState, useEffect, useRef } from "react";
import "./AssessmentResultView.css";
import { useLocation, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { API } from "aws-amplify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import ResultDetails from "./ResultDetails";
import {
  calculateStage,
  getResultText,
} from "../../shared/utils/assessmentResult";
import { getPrognosUserAnswer } from "../../graphql/queries";
import { getAssessmentAnswersWithPhoneNumber } from "../../shared/api/assessment.js";
import AssessmentPhone from "./AssessmentPhone";
import { MedicalConditions } from "../../shared/enum/assessmentResultOptions";
import ResultHeader from "./ResultHeader";
import ChartResult from "./ChartResult";

ChartJS.register(ArcElement, Tooltip, Legend);

function AssessmentResultView() {
  const chartRef = useRef();
  const { NORMAL, INDETERMINATE, REVERSIBLE_DEMENTIA, DEPRESSION, ALZHEIMERS } =
    MedicalConditions;
  // eslint-disable-next-line
  const [stages, setStages] = useState({
    reversibleDimensia: 0,
    depression: 0,
    alzheimer: 0,
  });
  const [resultText, setResultText] = useState([]);
  const [healthCondition, setHealthCondition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [assessmentAnswers, setAssessmentAnswers] = useState(null);
  const [assessmentAnswersLoading, setIsAssessmentAnswersLoading] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [smallChunk] = useState("It is less likely but possible");
  const [bigChunk] = useState("It is most likely but not diagnostic");

  // get the id from the url through react router
  const { id } = useParams();
  const location = useLocation();
  const pageID = location.pathname.split("/")[2];

  useEffect(() => {
    fetchSubmittedAnswers();
  }, [id]);

  const fetchSubmittedAnswers = async () => {
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

      const { identifiedCondition, score } = calculateStage(userAnswers);
      [stages.reversibleDimensia, stages.depression, stages.alzheimer] = score;
      setHealthCondition(identifiedCondition);
      setResultText(getResultText(userAnswers));
      setAssessmentAnswers(userAnswers);
    } catch (err) {
      setIsAssessmentAnswersLoading(false);
      throw Error(err.errors[0].message);
    }
  };

  const handleChange = (newValue) => {
    setPhoneNumber(newValue);
  };

  const onSubmitHandler = async (values) => {
    setIsLoading(true);
    try {
      const response = await getAssessmentAnswersWithPhoneNumber(
        pageID,
        values.phoneNumber.replace(" ", ""),
      );
      if (!response.length) {
        message.error("Your Assessment does not exist", [5]);
        setIsLoading(false);
        return;
      }
      const answers = JSON.parse(response[0].answers);
      setResultText(getResultText(answers));
      const { identifiedCondition, score } = calculateStage(userAnswers);
      [stages.reversibleDimensia, stages.depression, stages.alzheimer] = score;
      setHealthCondition(identifiedCondition);
      setAssessmentAnswers(answers);
      setPhoneNumber(null);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      message.error("Something went wrong", [5]);
    }
  };

  const data = {
    labels: [
      "Irreversible condition",
      "Reversible condition (depression)",
      "Reversible condition (other)",
    ],
    datasets: [
      {
        label: [
          "Irreversible condition",
          "Reversible condition (depression)",
          "Reversible condition (other)",
        ],
        data: [stages.alzheimer, stages.depression, stages.reversibleDimensia],
        backgroundColor: [
          "rgba(56, 163, 199, 0.2)",
          "rgba(119, 3, 252, 0.2)",
          "rgba(146, 69, 204, 0.2)",
        ],
        borderColor: [
          "rgba(56, 163, 199, 1)",
          "rgba(119, 3, 252, 1)",
          "rgba(146, 69, 204, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line
          label: function (tooltipItem) {
            return null;
          },
        },
      },
    },
  };

  return (
    <div className="background-gradient md:py-[60px] md:px-[120px]">
      {assessmentAnswers && assessmentAnswersLoading ? (
        // This is for INDETERMINED case (score 4-6)
        healthCondition === INDETERMINATE ? (
          <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
            <div className="p-[30px] m-0 md:px-[80px]">
              <ResultDetails
                conditionalText={resultText}
                diseaseType={INDETERMINATE}
              />
            </div>
          </div>
        ) : // NORMAL
        healthCondition === NORMAL ? (
          <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
            <div className="p-[30px] m-0 md:px-[80px]">
              <ResultDetails diseaseType={NORMAL} />
            </div>
          </div>
        ) : healthCondition === ALZHEIMERS ? (
          <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
            <h1 className="text-2xl text-center">Your Assessment Result</h1>
            <p className="mt-4 text-sm text-center md:text-xl">
              The results below indicate the likelihood which condition you
              might fall in
            </p>
            <ChartResult
              chartRef={chartRef}
              data={data}
              options={options}
              stages={stages}
            />
            <ResultHeader showMessage={true} />

            {/* result text */}
            <div className="p-[30px] m-0 md:px-[80px]">
              <ResultDetails
                conditionalText={resultText}
                diseaseType={ALZHEIMERS}
              />
            </div>
          </div>
        ) : healthCondition === DEPRESSION ||
          healthCondition === REVERSIBLE_DEMENTIA ? (
          <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
            <h1 className="text-2xl text-center">Your Assessment Result</h1>
            <p className="mt-4 text-sm text-center md:text-xl">
              The result below suggest what conditions <i>might</i> explain your
              symptoms, but a diagnosis requires a clinical evaluation.
            </p>
            {/* dementia stage text */}
            <ChartResult
              chartRef={chartRef}
              data={data}
              options={options}
              stages={stages}
            />
            <ResultHeader showMessage={true} />

            {/* result text */}
            <div className="p-[30px] m-0 md:px-[80px]">
              <ResultDetails
                conditionalText={resultText}
                diseaseType={DEPRESSION}
              />
            </div>
          </div>
        ) : (
          ""
        )
      ) : assessmentAnswersLoading ? (
        <div className="flex justify-center bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      {!assessmentAnswersLoading ? (
        <AssessmentPhone
          onSubmit={onSubmitHandler}
          loading={isLoading}
          phoneNumber={phoneNumber}
          onChange={handleChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default AssessmentResultView;
