export const GroupType = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  COMMUNITY_HEALTH_WORKER: "CommunityHealthWorker",
  CARE_GIVER: "CareGiver",
  PATIENT: "Patient",
};
export const isAnyUser = (userType) =>
  userType.includes(GroupType.SUPER_ADMIN) ||
  userType.includes(GroupType.ADMIN) ||
  userType.includes(GroupType.COMMUNITY_HEALTH_WORKER);

export const isSuperAdminOrAdmin = (userType) =>
  userType.includes(GroupType.SUPER_ADMIN) ||
  userType.includes(GroupType.ADMIN);

export const isNotAdmin = (userType) =>
  userType.includes(GroupType.CARE_GIVER) ||
  userType.includes(GroupType.PATIENT);
  
export const ScreenTypes = {
  MOBILE: "mobile",
  TAB: "tab",
  SYSTEM: "system",
};

export const ScreeningFormUserType = {
  YOU: "you",
  YOUR_LOVED_ONE: "yourLovedOne",
};
