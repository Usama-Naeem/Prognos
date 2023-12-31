import {
  AssessmentResultOptions,
  MedicalConditions,
} from "../enum/assessmentResultOptions";

const { NORMAL, INDETERMINATE, REVERSIBLE_DEMENTIA, DEPRESSION, ALZHEIMERS } =
    MedicalConditions;

export const calculateStage = (answers) => {
  let reversibleDimensia = 0;
  let depression = 0;
  let alzheimer = 0;
  let identifiedCondition = null;

  // Which of the following are you or your loved one having difficulty with?
  // we should count one for each questions answered
  const numberOfDifficulties = getTotalMultiselectLength(answers.difficultyIn);
  if (numberOfDifficulties > 0) {
    reversibleDimensia += numberOfDifficulties;
    depression += numberOfDifficulties;
    alzheimer += numberOfDifficulties;
  }

  // What is the longest any of the above symptoms have been bothering you/your loved one?
  if (
      answers.longestDuration === "lessThanOneDay" ||
      answers.longestDuration === "oneDayToOneWeek" ||
      answers.longestDuration === "oneWeekToOneMonth"
  )
    reversibleDimensia += 1;

  // Removing this as part of request from Dona on Aug 1st
  // if (
  //   answers.longestDuration === "oneWeekToOneMonth" ||
  //   answers.longestDuration === "oneMonthToOneYear"
  // )
  //   depression += 1;

  if (
      answers.longestDuration === "oneMonthToOneYear" ||
      answers.longestDuration === "oneYearOrMore"
  )
    alzheimer += 1;

  if (answers.symptomsAfterCovid === "yes") {
    // Did you/your loved one symptoms start after having COVID?

    reversibleDimensia += 1;
  }

  // Have the symptoms overall been coming and going (fluctuating) over a short period (days) or long period (weeks to months) of time? Or have the symptoms become gradually worse?
  if (
      answers.gradualOrLong === "fluctuationsOverAShortPeriod" ||
      answers.gradualOrLong === "fluctuationsOverALongPeriod"
  ) {
    // Removing this as part of request from Dona on Aug 1st
    // depression += 1;
    reversibleDimensia += 1;
  }
  if (answers.gradualOrLong === "gradualWorsening") {
    // Removing this as part of request from Dona on Aug 1st
    // depression += 1;
    alzheimer += 1;
  }

  // Removing this as part of request from Dona on Aug 1st
  // if (answers.gradualOrLong === "stable") {
  //   depression += 1;
  // }

  // Have you been drowsier than normal?
  if (answers.drowserThanNormal === "yes") reversibleDimensia += 1;

  // Have you recently changed your medications or medication doses?
  if (answers.changedMedication === "yes") reversibleDimensia += 1;

  // Have you recently had an infection?
  if (answers.infectionRecently === "yes") reversibleDimensia += 1;

  // "Have you or your loved one recently had a head injury?

  if (answers.headInjury === "yes") reversibleDimensia += 1;

  if (answers?.followingSymptoms) {
    // Do you have any of the following symptoms?

    // Removing time factor as part of request from Dona on Aug 1st
    if (getTotalMultiselectLength(answers?.followingSymptoms) >= 5) {
      depression += 2;
    }

    // Adding alzheimer as part of request from Dona on Aug 1st
    if (getTotalMultiselectLength(answers?.followingSymptoms) <= 4)
      alzheimer += 1;
      reversibleDimensia += 1;
  }

  // Which of the following statements is true?
  // Removing this as part of request from Dona on Aug 1st
  // removing time factor
  if (answers?.trueStatement) {
    const trueStatements = getTotalMultiselectLength(answers?.trueStatement)

    // Adding alzheimers and reversible as part of request from Dona on Aug 1st
    if(trueStatements < 5){
      reversibleDimensia += 1
      alzheimer += 1
    }

    if (
        trueStatements >= 5 &&
        trueStatements < 10
    ) {
      depression += 2;
    } else if (
        trueStatements >= 10 && trueStatements <= 14) {
      depression += 3;
    } else if (trueStatements > 14){
      depression += 4;
    }
  }

  const calculatedValues = [reversibleDimensia, alzheimer, depression];
  const highestIndex = calculatedValues.indexOf(Math.max(...calculatedValues));

  // IDENTIFYING WHICH CONDITION SATISFIES
  // NORMAL CASE
  if (
      answers.longestDuration === "lessThanOneDay" &&
      answers.symptomsAfterCovid === "no" &&
      answers.gradualOrLong === "stable"
  ) {
    identifiedCondition = NORMAL;
  } // INDETERMINATE CASE
  else if (
      answers.longestDuration === "lessThanOneDay" &&
      answers.symptomsAfterCovid === "yes" &&
      answers.gradualOrLong === "stable"
  ) {
    identifiedCondition = INDETERMINATE;
    // REVERSIBLE DEMENTIA CASE
  } else if (calculatedValues[0] === calculatedValues[highestIndex]) {
    identifiedCondition = REVERSIBLE_DEMENTIA;
    // ALZHEIMERS CASE
  } else if (calculatedValues[1] === calculatedValues[highestIndex]) {
    identifiedCondition = ALZHEIMERS;
    // DEPRESSION CASE
  } else if (calculatedValues[2] === calculatedValues[highestIndex]) {
    identifiedCondition = DEPRESSION;
  }

  return {
    score: [reversibleDimensia, depression, alzheimer],
    identifiedCondition,
  };
};

export const getResultText = (answers) => {
  const resultText = [];
  // What is the longest period that any of the above symptoms have been bothering you or your loved one?
  if (
      answers.longestDuration === "lessThanOneDay" ||
      answers.longestDuration === "oneDayToOneWeek"
  )
    resultText.push(AssessmentResultOptions.LONGEST_PERIOD);

  // What is the longest period that any of the above symptoms have been bothering you or your loved one?
  // &&
  // Have the symptoms generally been coming and going (fluctuating) for a short period (days) or a long period (weeks or months)? Or have the symptoms gradually worsened?
  if (
      answers.longestDuration === "oneMonthToOneYearOrMore" &&
      answers.gradualOrLong === "gradualWorsening"
  )
    resultText.push(AssessmentResultOptions.SYMPTOMS_PERIOD);

  // Did your/your loved one's symptoms start within a few months after having Covid?
  // &&
  // Have the symptoms generally been coming and going (fluctuating) for a short period (days) or a long period (weeks or months)? Or have the symptoms gradually worsened?
  if (
      answers.symptomsAfterCovid === "yes" &&
      (answers.gradualOrLong === "fluctuationsOverAShortPeriod" ||
          answers.gradualOrLong === "fluctuationsOverALongPeriod")
  )
    resultText.push(AssessmentResultOptions.COVID_SYMPTOMS);

  // "Have you or your loved one been sleepier than usual?
  // &&
  // Have the symptoms generally been coming and going (fluctuating) for a short period (days) or a long period (weeks or months)? Or have the symptoms gradually worsened?
  if (
      answers.drowserThanNormal === "yes" &&
      answers.gradualOrLong === "fluctuationsOverAShortPeriod"
  )
    resultText.push(AssessmentResultOptions.SLEEP_PERIOD_SHORT);

  if (
      answers.drowserThanNormal === "yes" &&
      answers.gradualOrLong === "fluctuationsOverALongPeriod"
  )
    resultText.push(AssessmentResultOptions.SLEEP_PERIOD_LONG);

  // Have you recently changed your medications or medication dosages?
  if (answers.changedMedication === "yes")
    resultText.push(AssessmentResultOptions.MED_CHANGE);

  // Have you or your loved one recently had an infection?
  // &&
  // Have the symptoms generally been coming and going (fluctuating) for a short period (days) or a long period (weeks or months)? Or have the symptoms gradually worsened?

  if (
      answers.infectionRecently === "yes" &&
      answers.gradualOrLong === "fluctuationsOverAShortPeriod"
  )
    resultText.push(AssessmentResultOptions.INFECTION_PERIOD);

  // "Have you or your loved one recently had a head injury?

  if (answers.headInjury === "yes")
    resultText.push(AssessmentResultOptions.HEAD_INJURY);

  // Do you have any of the following symptoms?
  if (answers?.followingSymptoms) {
    if (answers.followingSymptoms.thoughOfHurtingMyself)
      resultText.push(AssessmentResultOptions.FOLLOWING_SYMPTOMS);
  }

  // Which of the following statements is true?
  if (answers?.trueStatement) {
    if (getTotalMultiselectLength(answers?.trueStatement) >= 10)
      resultText.push(AssessmentResultOptions.FOLLOWING_STATEMENT);
  }

  return resultText;
};

// write a function that checks all the keys of the objects and returns the length of the true ones
export const getTotalMultiselectLength = (obj) => {
  const keys = Object?.keys(obj);
  let total = 0;
  keys?.forEach((key) => {
    if (obj[key]) total += 1;
  });
  return total;
};
