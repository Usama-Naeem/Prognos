import { GroupType } from "./roles";
import { RaceType } from "./race";

export const AdminSelectOptions = {
  ROLE: [
    {
      value: GroupType.ADMIN,
      label: "Admin",
    },
    {
      value: GroupType.COMMUNITY_HEALTH_WORKER,
      label: "Community Health Worker",
    },
  ],
};

export const UserSelectOptions = {
  ROLE: [
    {
      value: GroupType.CARE_GIVER,
      label: "Care Giver",
    },
    {
      value: GroupType.PATIENT,
      label: "Patient",
    },
  ],
};

export const LanguageSelectOptions = {
  LANGUAGES: [
    {
      value: "en",
      label: "English",
    },
    {
      value: "es",
      label: "Español",
    },
    {
      value: "kr",
      label: "한국인",
    },
  ],
};

export const RaceSelectOptions = {
  RACE: [
    {
      value: RaceType.AMERICAN_INDIAN,
      label: "American Indian or Alaska Native",
    },
    {
      value: RaceType.ASIAN,
      label: "Asian",
    },
    {
      value: RaceType.HAWAIIAN_OR_OTHER,
      label: "Native Hawaiian or Other Pacific Islander",
    },
    {
      value: RaceType.AFRICAN_AMERICAN_BLACK,
      label: "Black or African American",
    },
    {
      value: RaceType.LATINO,
      label: "Latino",
    },
    {
      value: RaceType.WHITE,
      label: "White",
    },
  ],
};

export const CityOptions = {
  CITY: [
    {
      value: "new-york",
      label: "New York",
    },
    {
      value: "sydney",
      label: "Sydney",
    },
  ],
};

export const Age = {
  AGE: [
    {
      value: "lessthan31",
      label: "Less than 31",
    },
    {
      value: "between31And40",
      label: "31-40",
    },
    {
      value: "between41And50",
      label: "41-50",
    },
    {
      value: "between51And60",
      label: "51-60",
    },
    {
      value: "above60",
      label: "Greater than 61",
    },
  ],
};

export const Stage = {
  STAGE: [
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "mild-cognitive-impairment",
      label: "Mild Cognitive Impairment",
    },
    {
      value: "mild-dimentia",
      label: "Mild Dimentia",
    },
    {
      value: "moderate-dimentia",
      label: "Moderate Dimentia",
    },
    {
      value: "severe-dimentia",
      label: "Severe Dimentia",
    },
  ],
};

export const StageFrequency = {
  STAGEFREQUENCY: [
    {
      value: "1month",
      label: "1 Month",
    },
    {
      value: "2month",
      label: "2 Month",
    },
    {
      value: "3month",
      label: "3 Month",
    },
    {
      value: "4month",
      label: "4 Month",
    },
    {
      value: "5month",
      label: "5 Month",
    },
    {
      value: "6month",
      label: "6 Month",
    },
    {
      value: "7month",
      label: "7 Month",
    },
    {
      value: "8month",
      label: "8 Month",
    },
    {
      value: "9month",
      label: "9 Month",
    },
    {
      value: "10month",
      label: "10 Month",
    },
    {
      value: "11month",
      label: "11 Month",
    },
    {
      value: "12month",
      label: "12 Month",
    },
  ],
};
