import { Form } from "@formio/react";
import { message, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import {
  updatePrognosCaregivers,
  updatePrognosPatients,
} from "../../graphql/mutations";
import {
  listPrognosCaregivers,
  listPrognosPatients,
} from "../../graphql/queries";
import {
  // createCaregiverToPatientAssossiation,
  createPrognosCaregiver,
  createPrognosPatient,
  emailOrPhoneExist,
  getAllQuestionnaires,
  getQuestionnaireData,
  saveQuestionnaireAnswers,
} from "../../shared/api/assessment";
import {
  AwsDateFormat,
  getUserByEmail,
  updateUser,
} from "../../shared/api/filter";
import {
  addPatientOrCaregiverToCognitoGroup,
  createPatientOrCaregiverInCognito,
} from "../../shared/api/teamMemberInvite";
import Spinner from "../../shared/components/Spinner/Spinner";
import { ASSESSMENT_FORM_IDENTIFIER } from "../../shared/constant";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { EmailTemplates } from "../../shared/enum/email";
import { GroupType, ScreeningFormUserType } from "../../shared/enum/roles";
import { getPatientOrCaregiverDataObj } from "../../shared/utils";
import "./AssessmentFormStyles.css";
import { DASHBOARDHOME } from "../../shared/constant/pageRoutes";
import { EMAIL_OR_PHONE_NUMBER_EXISTS } from "../../shared/constant/error";

function AssessmentForm() {
  // fetch query params from the url if any
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");
  const createdUserId = urlParams.get("userID");
  const mobileAssessment = urlParams.get("mobile");

  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireJSON, setQuestionnaireJSON] = useState(null);
  const [percentageInterval, setPercentageInterval] = useState(0);
  const [questionnaireId, setQuestionnaireId] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [userId, setUserId] = useState(createdUserId ? createdUserId : "");
  const navigate = useNavigate();
  const assessmentUrlWithParams = `${window.location.pathname}${window.location.search}`;
  const userPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID;
  let questionnaireResponse = null;
  const nextPageHandler = async (values) => {
    const assessmentFor = values.submission.data?.assessmentFor;
    // update progress bar
    if (!values.submission.data.selectDementiaStage1) {
      setPercentage((prev) => prev + percentageInterval);
    } else {
      setPercentageInterval(50);
      setPercentage((prev) => prev + 50);
    }

    if (!values.submission.data.oftenForget) {
      if (!role || assessmentFor) {
        // check if the email and phone number already exist in our database before the third question
        if (values.submission.data.email) {
          const exist = await emailOrPhoneExist(values.submission.data);
          if (exist) {
            message.error(EMAIL_OR_PHONE_NUMBER_EXISTS, [5]);
            // first navigate to other url and then navigate to original url
            // This is a hacky way to reset the form as RN there's no way to reset the form
            // not that I know atleast
            navigate("/");
            navigate(-1);
            setPercentage(0);
          }
        }
      }
      if (
        role === GroupType.CARE_GIVER ||
        assessmentFor === ScreeningFormUserType.YOUR_LOVED_ONE
      ) {
        if (values.submission.data.otherEmail) {
          const data = {
            email: values.submission.data.otherEmail,
            phoneNumber: values.submission.data.otherPhoneNumber,
          };
          const exist = await emailOrPhoneExist(data);
          if (exist) {
            message.error("Email or phone number already exists", [5]);
            navigate("/");
            navigate(-1);
            setPercentage(0);
          }
        }
      }
    }
  };

  const prevPageHandler = (values) => {
    // update the progress bar
    if (!values.submission.data.selectDementiaStage1) {
      setPercentage((prev) => prev - percentageInterval);
    } else {
      setPercentage((prev) => prev - 50);
    }
  };

  const submitHandler = async (answers) => {
    setIsLoading(true);
    setPercentage(100);
    // create two users in dynamo first
    try {
      if (role === null) {
        const data = {
          email: answers.data.email,
          phoneNumber: answers.data.phoneNumber,
        };
        const exist = await emailOrPhoneExist(data);
        if (exist) {
          message.error(EMAIL_OR_PHONE_NUMBER_EXISTS, [5]);
          setIsLoading(false);
          setPercentage(0);
          navigate(DASHBOARDHOME);
          navigate(-1);
          return;
        }
      }

      /* if the user is coming from the mobile, it's means there's already an assosiation, so
         we don't create any user and same for patient as patient will always be created */
      if (!mobileAssessment && role !== GroupType.PATIENT) {
        // if the user is caregiver and fill his assessment/new
        if (answers.data?.otherEmail) {
          const [caregiverObj] = getPatientOrCaregiverDataObj(answers.data);
          // Commenting here the code of patient creation
          // const patientData = await createPrognosPatient(patientObj);
          // await createPatientOrCaregiverInCognito(patientObj, userPoolId);
          // await addPatientOrCaregiverToCognitoGroup(patientObj, userPoolId);

          // here add an email filter on answer.data.enail and get cgid from dynamo and update data on (dob,race,language)
          // Update caregiver DOB,race and language in dynamo
          if (userId) {
            const editUser = {
              id: userId,
              language: answers.data?.language,
              race: answers.data?.race,
              zipCode: answers.data?.zipCode,
            };
            await updateUser(editUser, updatePrognosCaregivers);
          }
          if (role !== GroupType.CARE_GIVER) {
            const response = await createPrognosCaregiver(caregiverObj);
            await createPatientOrCaregiverInCognito(caregiverObj, userPoolId);
            await addPatientOrCaregiverToCognitoGroup(caregiverObj, userPoolId);
            setUserId(response.data?.createPrognosCaregivers.id);
            // create assossiation for patient and caregiver
            // Commenting the code of association
            // await createCaregiverToPatientAssossiation(
            //   patientData.data?.createPrognosPatients.id,
            //   response.data?.createPrognosCaregivers.id,
            // );
          } else {
            // if the role is of caregiver, then set the id for that
            setUserId(createdUserId);
            // Commenting the code of association
            // await createCaregiverToPatientAssossiation(
            //   patientData.data?.createPrognosPatients.id,
            //   createdUserId,
            // );
          }
          // send email to patient and inform patient about assessment fill by caregiver
          if (answers.data.emailToLovedOne.sendEmailToLovedOne === true) {
            await API.post("apiEmailTransporter", "/sendEmail", {
              body: {
                toAddress: [answers.data.otherEmail.toLowerCase()],
                fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
                templateName: EmailTemplates.ASSESSMENT,
                templateData: {
                  name: `${answers.data.otherFirstName} ${answers.data.otherLastName}`,
                  careGiverName: `${answers.data.firstName} ${answers.data.lastName}`,
                },
              },
            });
          }
          // If caregiver filled patient assesment then in this case we need to store patient email and phone number in seprate column in answers table
          // create answers in the dynamo when caregiver fill assessment
          questionnaireResponse = await saveQuestionnaireAnswers({
            userId: userId,
            userEmail: answers.data.email,
            userPhoneNumber: answers.data.phoneNumber.replace(" ", ""),
            questionnaireId: questionnaireId,
            answers: JSON.stringify(answers.data),
            patientEmail: answers.data.otherEmail,
            patientPhoneNumber: answers.data.otherPhoneNumber.replace(" ", ""),
            keyIdentifier: ASSESSMENT_FORM_IDENTIFIER,
          });
          message.success("Thank you! Your assessment has been submitted", [4]);
          // only do this if the role is of caregiver
        } else {
          // If patient fill his own assessment
          const responseObj = getPatientOrCaregiverDataObj(answers.data, role);
          const exist = await emailOrPhoneExist(responseObj);
          if (exist) {
            let response;
            let userIdForQuestion;
            if (responseObj.role === GroupType.CARE_GIVER) {
              response = await getUserByEmail(
                responseObj.email,
                listPrognosCaregivers,
              );
              userIdForQuestion = response?.id;
              const editUser = {
                id: userIdForQuestion,
                language: answers.data?.language,
                race: answers.data?.race,
                zipCode: answers.data?.zipCode,
                gender: answers.data?.sex,
              };
              await updateUser(editUser, updatePrognosCaregivers);
            }
            if (responseObj.role === GroupType.PATIENT) {
              response = await getUserByEmail(
                responseObj.email,
                listPrognosPatients,
              );
              userIdForQuestion = response?.id;
              const editUser = {
                id: userIdForQuestion,
                language: answers.data?.language,
                race: answers.data?.race,
                zipCode: answers.data?.zipCode,
                gender: answers.data?.sex,
              };
              await updateUser(editUser, updatePrognosPatients);
            }

            questionnaireResponse = await saveQuestionnaireAnswers({
              userId: userIdForQuestion,
              userEmail: answers.data.email,
              userPhoneNumber: answers.data.phoneNumber.replace(" ", ""),
              questionnaireId: questionnaireId,
              answers: JSON.stringify(answers.data),
              keyIdentifier: ASSESSMENT_FORM_IDENTIFIER,
            });
            message.success("Thank you! Your assessment has been submitted", [
              4,
            ]);
          } else {
            Promise.all([
              await createPatientOrCaregiverInCognito(responseObj, userPoolId),
              await addPatientOrCaregiverToCognitoGroup(
                responseObj,
                userPoolId,
              ),
            ]);
            let userIdForQuestionnaire = null;
            if (answers.data.assessmentFor === ScreeningFormUserType.YOU) {
              const response = await createPrognosPatient(responseObj);
              userIdForQuestionnaire = response.data?.createPrognosPatients.id;
            }
            if (
              answers.data.assessmentFor ===
              ScreeningFormUserType.YOUR_LOVED_ONE
            ) {
              const response = await createPrognosCaregiver(responseObj);
              userIdForQuestionnaire =
                response.data?.createPrognosCaregivers.id;
            }
            // If patient filled his assessment, in this case we need to just store data in answers table as before
            // create answers in the dynamo when patient fill assessment
            questionnaireResponse = await saveQuestionnaireAnswers({
              userId: userIdForQuestionnaire,
              userEmail: answers.data.email,
              userPhoneNumber: answers.data.phoneNumber.replace(" ", ""),
              questionnaireId: questionnaireId,
              answers: JSON.stringify(answers.data),
              keyIdentifier: ASSESSMENT_FORM_IDENTIFIER,
            });
            message.success("Thank you! Your assessment has been submitted", [
              4,
            ]);
          }
        }
      } else {
        questionnaireResponse = await saveQuestionnaireAnswers({
          userId: userId,
          userEmail: answers.data.email,
          userPhoneNumber: answers.data.phoneNumber.replace(" ", ""),
          questionnaireId: questionnaireId,
          answers: JSON.stringify(answers.data),
          keyIdentifier: ASSESSMENT_FORM_IDENTIFIER,
        });
        // Update patient DOB,race and language in dynamo
        if (userId) {
          const editUser = {
            id: userId,
            language: answers.data?.language,
            race: answers.data?.race,
            zipCode: answers.data?.zipCode,
            gender: answers.data?.sex,
          };
          await updateUser(editUser, updatePrognosPatients);
        }
        message.success("Thank you! Your assessment has been submitted", [4]);
      }

      // update the user in cognito only if there's a user id in the url
      if (createdUserId) {
        if (role === GroupType.CARE_GIVER) {
          const editUser = {
            id: userId,
            status: "Confirmed",
          };
          await updateUser(editUser, updatePrognosCaregivers);
        } else {
          const editUser = {
            id: userId,
            status: "Confirmed",
          };
          await updateUser(editUser, updatePrognosPatients);
        }
      }
      // In case if user not select selectDementiaStage and data is undefined
      if (!answers.data.selectDementiaStage1) {
        // In case if user not select selectDementiaStage and data is undefined
        // sending email
        const questionId =
          questionnaireResponse.data?.createPrognosUserAnswer.id;
        const resultUrl = `${window.location.origin}/assessment-result/${questionId}`;

        // Lamdba function to send invitation email.
        await API.post("apiEmailTransporter", "/sendEmail", {
          body: {
            toAddress: [answers.data.email],
            fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
            templateName: EmailTemplates.RESULT,
            templateData: {
              name: `${answers.data.firstName} ${answers.data.lastName}`,
              link: resultUrl,
            },
          },
        });

        navigate(
          `/assessment-result/${questionnaireResponse.data?.createPrognosUserAnswer.id}`,
          { state: { answers } },
        );
      }
      // In case if user select doYouHaveAMedicalDiagnosisOfDementia No
      else {
        const date = AwsDateFormat();
        const userData = await getUserByEmail(
          answers.data.email,
          answers.data.assessmentFor === "yourLovedOne"
            ? listPrognosCaregivers
            : listPrognosPatients,
        );
        const userDynamoId = userData.id;
        if (answers.data.selectDementiaStage1 === "mildDementia") {
          const editUser = {
            id: userDynamoId,
            assessmentScore: (0.75 * 100).toFixed(0),
            lastAssessmentDate: date,
          };
          await updateUser(
            editUser,
            answers.data.assessmentFor === "yourLovedOne"
              ? updatePrognosCaregivers
              : updatePrognosPatients,
          );
        } else if (answers.data.selectDementiaStage1 === "moderateDementia") {
          const editUser = {
            id: userDynamoId,
            assessmentScore: (1.25 * 100).toFixed(0),
            lastAssessmentDate: date,
          };
          await updateUser(
            editUser,
            answers.data.assessmentFor === "yourLovedOne"
              ? updatePrognosCaregivers
              : updatePrognosPatients,
          );
        } else if (answers.data.selectDementiaStage1 === "severeDementia") {
          const editUser = {
            id: userDynamoId,
            assessmentScore: (1.75 * 100).toFixed(0),
            lastAssessmentDate: date,
          };
          await updateUser(
            editUser,
            answers.data.assessmentFor === "yourLovedOne"
              ? updatePrognosCaregivers
              : updatePrognosPatients,
          );
        } else if (
          answers.data.selectDementiaStage1 === "mildCognitiveImpairment"
        ) {
          const editUser = {
            id: userDynamoId,
            assessmentScore: (0.25 * 100).toFixed(0),
            lastAssessmentDate: date,
          };
          await updateUser(
            editUser,
            answers.data.assessmentFor === "yourLovedOne"
              ? updatePrognosCaregivers
              : updatePrognosPatients,
          );
        }
        navigate(
          `/result/${questionnaireResponse.data?.createPrognosUserAnswer.id}/${answers.data.assessmentFor}`,
        );
      }
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err, "\n\nAssessment Error\n\n");
      setIsLoading(false);
      message.error(`Cannot save the form due to ${err.message}`, [5]);
      message.error("please fill the form again", [5]);
      setPercentage(0);
      navigate(assessmentUrlWithParams);
      throw Error(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getAllQuestionnaires();
        const questionnaires = response.listPrognosQuestionnaires.items;
        const requiredId = questionnaires.find(
          (item) => item.keyIdentifier === ASSESSMENT_FORM_IDENTIFIER,
        ).id;
        setQuestionnaireId(requiredId);

        // getting the actual questionnaire through ID now
        const questionnaireData = await getQuestionnaireData(requiredId);
        const data = questionnaireData.getPrognosQuestionnaire;
        const schema = {
          ...data,
          components:
            data.components.length !== 0
              ? JSON.parse(data.components)
              : data.components,
        };
        setQuestionnaireJSON(schema);
        // figuring out the percentage interval
        setPercentageInterval(
          Math.ceil(100 / (JSON.parse(data.components).length - 1)),
        );
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
        <div id="assessment-form">
          <div id="progressBar">
            <Progress
              strokeLinecap="round"
              strokeColor="#8969B5"
              trailColor="#F5EBF9"
              strokeWidth="5px"
              percent={percentage}
            />
            <Form
              onNextPage={nextPageHandler}
              onPrevPage={prevPageHandler}
              onSubmit={submitHandler}
              form={questionnaireJSON}
            ></Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentForm;
