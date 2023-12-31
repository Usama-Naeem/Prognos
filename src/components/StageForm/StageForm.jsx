import React, { useEffect, useState } from "react";
import { Form } from "@formio/react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  saveQuestionnaireAnswers,
  getAllQuestionnaires,
  updatePatientAssessmentScore,
  updateCareGiverAssessmentScore,
} from "../../shared/api/assessment";
import { STAGE_FORM_IDENTIFIER } from "../../shared/constant";
import { GroupType } from "../../shared/enum/roles";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import "./StageFormStyles.css";
import { STAGE_CONDITIONS } from "../../shared/constant/FormBuilderConstants";
import { STAGE_RESULT_ROUTE } from "../../shared/constant/pageRoutes";

function StageForm() {
  // fetch query params from the url if any
  const urlParams = new URLSearchParams(window.location.search);
  const createdUserId = urlParams.get("userId");
  const role = urlParams.get("role");

  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireJSON, setQuestionnaireJSON] = useState(null);
  const [questionnaireId, setQuestionnaireId] = useState("");
  // eslint-disable-next-line
  const [userId, setUserId] = useState(createdUserId ? createdUserId : "");
  const navigate = useNavigate();
  const stagingUrlWithParams = `${window.location.pathname}${window.location.search}`;
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

  const submitHandler = async (answers) => {
    setIsLoading(true);
    try {
      // create answers in the dynamo
      const response = await saveQuestionnaireAnswers({
        userId: userId,
        questionnaireId: questionnaireId,
        answers: JSON.stringify(answers.data),
        keyIdentifier: STAGE_FORM_IDENTIFIER,
      });

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
      } = answers.data;

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

      const score = calculateAssessmentResult(weightageAnswers, weightages);
      if (role === GroupType.PATIENT) {
        await updatePatientAssessmentScore(
          userId,
          score,
          new Date().toISOString().substr(0, 10),
        );
      }

      if (role === GroupType.CARE_GIVER) {
        await updateCareGiverAssessmentScore(
          userId,
          score,
          new Date().toISOString().substr(0, 10),
        );
      }

      const answerId = response?.data?.createPrognosUserAnswer?.id;
      message.success("Thank you! Your assessment has been submitted", [4]);
      navigate(STAGE_RESULT_ROUTE(answerId));
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err, "\n\nAssessment Error\n\n");
      setIsLoading(false);
      message.error(`Cannot save the form due to ${err.message}`, [5]);
      message.error("please fill the form again", [5]);
      navigate(stagingUrlWithParams);
      throw Error(err.message);
    }
  };

  const calculateAssessmentResult = (weightageAnswers, weightagesOfAnswers) => {
    // Calculating score
    const result = Object.keys(weightageAnswers).reduce((acc, key) => {
      // eslint-disable-next-line
      if (weightagesOfAnswers.hasOwnProperty(key)) {
        const multipliedValue = (
          weightageAnswers[key] * weightagesOfAnswers[key]
        ).toFixed(1);
        acc[key] = parseFloat(multipliedValue);
      }
      return acc;
    }, {});
    const sum = Object.values(result).reduce((acc, val) => acc + val, 0);

    return (sum * 100).toFixed(0);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getAllQuestionnaires();
        const questionnaires = response.listPrognosQuestionnaires.items;
        const data = questionnaires.find(
          (item) => item.keyIdentifier === STAGE_FORM_IDENTIFIER,
        );
        setQuestionnaireId(data.id);

        const schema = {
          ...data,
          components:
            data.components.length !== 0
              ? JSON.parse(data.components)
              : data.components,
        };
        setQuestionnaireJSON(schema);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw Error(err.errors[0].message);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Spinner className={darkColorSpinner} />
        </div>
      ) : (
        <div id="stage-form">
          <div id="stage-form-wrapper">
            <Form onSubmit={submitHandler} form={questionnaireJSON}></Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StageForm;
