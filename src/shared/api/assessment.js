import { API } from "aws-amplify";
import {
  listPrognosQuestionnaires,
  getPrognosQuestionnaire,
  listPrognosPatients,
  listPrognosCaregivers,
  getPrognosUserAnswer,
  listPrognosUserAnswers,
  listPrognosAdmins,
  listPrognosCHWS,
} from "../../graphql/queries";
import {
  createPrognosPatients,
  createPrognosCaregivers,
  createPrognosUserAnswer,
  createPrognosCareGivertoPatient,
  updatePrognosPatients,
  updatePrognosCaregivers,
} from "../../graphql/mutations";
import { GroupType } from "../enum/roles";

export const getAllQuestionnaires = async () => {
  try {
    const response = await API.graphql({
      query: listPrognosQuestionnaires,
      authMode: "API_KEY",
    });
    return response.data;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const getQuestionnaireData = async (id) => {
  try {
    const response = await API.graphql({
      query: getPrognosQuestionnaire,
      variables: { id: id },
      authMode: "API_KEY",
    });
    return response.data;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const createPrognosPatient = async (data) => {
  try {
    const response = await API.graphql({
      query: createPrognosPatients,
      variables: { input: data },
      authMode: "API_KEY",
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const createPrognosCaregiver = async (data) => {
  try {
    const response = await API.graphql({
      query: createPrognosCaregivers,
      variables: { input: data },
      authMode: "API_KEY",
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const saveQuestionnaireAnswers = async (data) => {
  try {
    const response = await API.graphql({
      query: createPrognosUserAnswer,
      variables: { input: data },
      authMode: "API_KEY",
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const getUserQuestionnaireAnswer = async (userId, questionnaireId) => {
  try {
    const answers = await API.graphql({
      query: listPrognosUserAnswers,
      variables: {
        filter: {
          and: [
            {
              userId: { eq: userId },
            },
            {
              questionnaireId: { eq: questionnaireId },
            },
          ],
        },
      },
      authMode: "API_KEY",
    });
    return answers;
  } catch (error) {
    throw Error(err.errors[0].message);
  }
};

export const emailOrPhoneExist = async (data) => {
  const filteration = {
    or: [
      { email: { eq: data.email.toLowerCase() } },
      { phoneNumber: { eq: data.phoneNumber } },
    ],
  };

  try {
    // if the user is a caregiver
    const responseCaregiver = await API.graphql({
      query: listPrognosCaregivers,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });

    // if the user is a patient
    const responsePatient = await API.graphql({
      query: listPrognosPatients,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });

    // if the user is Admin
    const responseAdmin = await API.graphql({
      query: listPrognosAdmins,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });

    // if the user is Community Health Worker
    const responseCHW = await API.graphql({
      query: listPrognosCHWS,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });

    // if the CHW email or phone number already exist
    const exist =
      responseCaregiver.data.listPrognosCaregivers.items.length ||
      responsePatient.data.listPrognosPatients.items.length ||
      responseAdmin.data.listPrognosAdmins.items.length ||
      responseCHW.data.listPrognosCHWS.items.length
        ? true
        : false;
    return exist;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const getAssessmentAnswersWithPhoneNumber = async (id, phoneNumber) => {
  try {
    const responseCaregiver = await API.graphql({
      query: listPrognosUserAnswers,
      variables: {
        filter: {
          id: { eq: id },
          userPhoneNumber: { eq: phoneNumber },
        },
      },
      authMode: "API_KEY",
    });
    return responseCaregiver.data.listPrognosUserAnswers.items;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const getQuestionnaireAnswers = async (id) => {
  try {
    const response = await API.graphql({
      query: getPrognosUserAnswer,
      variables: { id: id },
      authMode: "API_KEY",
    });
    return response.data.getPrognosUserAnswer;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const createCaregiverToPatientAssossiation = async (
  patientID,
  caregiverID,
) => {
  try {
    const response = await API.graphql({
      query: createPrognosCareGivertoPatient,
      variables: {
        input: {
          prognosCaregiversId: caregiverID,
          prognosPatientsId: patientID,
        },
      },
      authMode: "API_KEY",
    });
    return response.data.createPrognosCareGivertoPatient;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const updatePatientAssessmentScore = async (patientID, score, date) => {
  try {
    const response = await API.graphql({
      query: updatePrognosPatients,
      variables: {
        input: {
          id: patientID,
          assessmentScore: score,
          lastAssessmentDate: date,
        },
      },
      authMode: "API_KEY",
    });
    return response.data.updatePrognosPatients;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const updateCareGiverAssessmentScore = async (
  careGiverID,
  score,
  date,
) => {
  try {
    const response = await API.graphql({
      query: updatePrognosCaregivers,
      variables: {
        input: {
          id: careGiverID,
          assessmentScore: score,
          lastAssessmentDate: date,
        },
      },
      authMode: "API_KEY",
    });
    return response.data.updatePrognosCaregivers;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};
