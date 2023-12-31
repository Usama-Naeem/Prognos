import { API, graphqlOperation } from "aws-amplify";
import { message } from "antd";
import { listPrognosQuestionnaireByOrder } from "../../graphql/queries";
import { createPrognosQuestionnaire } from "../../graphql/mutations";
import { initialState } from "../constant/FormBuilderConstants";
import { randomStrings } from "../utils";

export const getQuestionnaireByOrder = async () => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listPrognosQuestionnaireByOrder, {
        type: "assessment",
        sortDirection: "ASC",
      }),
      authMode: "API_KEY",
    });

    const questionnaireList = response
      ? response.data.listPrognosQuestionnaireByOrder.items
      : [];
    return questionnaireList;
  } catch (error) {
    throw Error(error.errors[0].message);
  }
};

export const createNewAssessment = async (
  assessmentName,
  prevAssessmentsInfo,
) => {
  const prevAssessmentNames = [];
  const prevAssessmentOrders = [];
  prevAssessmentsInfo
    .sort((a, b) => a.order - b.order)
    .map((assessment) => {
      prevAssessmentNames.push(assessment.name);
      prevAssessmentOrders.push(assessment.order);
      return null;
    });

  const highestOrder = prevAssessmentOrders[prevAssessmentOrders.length - 1];
  if (prevAssessmentNames.includes(assessmentName)) {
    message.warning("Assessment already exist with this name!");
    return false;
  }
  const input = {
    ...initialState,
    name: assessmentName,
    keyIdentifier: randomStrings(),
    order: highestOrder + 1,
  };
  try {
    const response = await API.graphql({
      query: createPrognosQuestionnaire,
      variables: {
        input,
      },
      authMode: "API_KEY",
    });
    message.success("New Assessment is created");
    return response;
  } catch (error) {
    throw Error(error.errors[0].message);
  }
};
