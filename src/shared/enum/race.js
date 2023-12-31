export const RaceType = {
  WHITE: "White",
  HAWAIIAN_OR_OTHER: "Native Hawaiian or Other Pacific Islander",
  LATINO: "Latino",
  AFRICAN_AMERICAN_BLACK: "Black or African American",
  AMERICAN_INDIAN: "American Indian or Alaska Native",
  ASIAN: "Asian",
};

export const RaceNames = {
  White: "White",
  HawaiianOrOtherPacificIslander: "Native Hawaiian or Other Pacific Islander",
  Latino: "Latino",
  AfricanAmericanOrBlack: "Black or African American",
  AmericanIndian: "American Indian or Alaska Native",
  Asian: "Asian",
};

export const sortDate = (date) => {
  if (date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  }
};
