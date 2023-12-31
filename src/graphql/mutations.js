/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrognosAdmin = /* GraphQL */ `
  mutation CreatePrognosAdmin(
    $input: CreatePrognosAdminInput!
    $condition: ModelPrognosAdminConditionInput
  ) {
    createPrognosAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosAdmin = /* GraphQL */ `
  mutation UpdatePrognosAdmin(
    $input: UpdatePrognosAdminInput!
    $condition: ModelPrognosAdminConditionInput
  ) {
    updatePrognosAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosAdmin = /* GraphQL */ `
  mutation DeletePrognosAdmin(
    $input: DeletePrognosAdminInput!
    $condition: ModelPrognosAdminConditionInput
  ) {
    deletePrognosAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosCHW = /* GraphQL */ `
  mutation CreatePrognosCHW(
    $input: CreatePrognosCHWInput!
    $condition: ModelPrognosCHWConditionInput
  ) {
    createPrognosCHW(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      status
      race
      role
      patients {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      caregivers {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosCHW = /* GraphQL */ `
  mutation UpdatePrognosCHW(
    $input: UpdatePrognosCHWInput!
    $condition: ModelPrognosCHWConditionInput
  ) {
    updatePrognosCHW(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      status
      race
      role
      patients {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      caregivers {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosCHW = /* GraphQL */ `
  mutation DeletePrognosCHW(
    $input: DeletePrognosCHWInput!
    $condition: ModelPrognosCHWConditionInput
  ) {
    deletePrognosCHW(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      status
      race
      role
      patients {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      caregivers {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      imageURL
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosCaregivers = /* GraphQL */ `
  mutation CreatePrognosCaregivers(
    $input: CreatePrognosCaregiversInput!
    $condition: ModelPrognosCaregiversConditionInput
  ) {
    createPrognosCaregivers(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      DOB
      isTwilioGroupJoined
      status
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      patients {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      chw {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      assignedTo
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      assessmentScore
      lastAssessmentDate
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosCaregivers = /* GraphQL */ `
  mutation UpdatePrognosCaregivers(
    $input: UpdatePrognosCaregiversInput!
    $condition: ModelPrognosCaregiversConditionInput
  ) {
    updatePrognosCaregivers(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      DOB
      isTwilioGroupJoined
      status
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      patients {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      chw {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      assignedTo
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      assessmentScore
      lastAssessmentDate
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosCaregivers = /* GraphQL */ `
  mutation DeletePrognosCaregivers(
    $input: DeletePrognosCaregiversInput!
    $condition: ModelPrognosCaregiversConditionInput
  ) {
    deletePrognosCaregivers(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      DOB
      isTwilioGroupJoined
      status
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      patients {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      chw {
        items {
          id
          prognosCHWId
          prognosCaregiversId
          createdAt
          updatedAt
        }
        nextToken
      }
      assignedTo
      createdBy
      updatedBy
      isDeleted
      zipCode
      gender
      isSuspended
      assessmentScore
      lastAssessmentDate
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosPatients = /* GraphQL */ `
  mutation CreatePrognosPatients(
    $input: CreatePrognosPatientsInput!
    $condition: ModelPrognosPatientsConditionInput
  ) {
    createPrognosPatients(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      isTwilioGroupJoined
      status
      gender
      role
      race
      assessmentScore
      lastAssessmentDate
      chw {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      assignedTo
      careGivers {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      isSuspended
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosPatients = /* GraphQL */ `
  mutation UpdatePrognosPatients(
    $input: UpdatePrognosPatientsInput!
    $condition: ModelPrognosPatientsConditionInput
  ) {
    updatePrognosPatients(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      isTwilioGroupJoined
      status
      gender
      role
      race
      assessmentScore
      lastAssessmentDate
      chw {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      assignedTo
      careGivers {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      isSuspended
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosPatients = /* GraphQL */ `
  mutation DeletePrognosPatients(
    $input: DeletePrognosPatientsInput!
    $condition: ModelPrognosPatientsConditionInput
  ) {
    deletePrognosPatients(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      DOB
      isTwilioGroupJoined
      status
      gender
      role
      race
      assessmentScore
      lastAssessmentDate
      chw {
        items {
          id
          prognosCHWId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      assignedTo
      careGivers {
        items {
          id
          prognosCaregiversId
          prognosPatientsId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      isDeleted
      zipCode
      isSuspended
      imageURL
      appStoreOriginalTansactionId
      appStoreSubscriptionTier
      appStoreSubscriptionStatus
      playStorePurchaseToken
      playStoreSubscriptionTier
      playStoreSubscriptionStatus
      currentPlatform
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosUsersAddress = /* GraphQL */ `
  mutation CreatePrognosUsersAddress(
    $input: CreatePrognosUsersAddressInput!
    $condition: ModelPrognosUsersAddressConditionInput
  ) {
    createPrognosUsersAddress(input: $input, condition: $condition) {
      id
      address
      city
      state
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosUsersAddress = /* GraphQL */ `
  mutation UpdatePrognosUsersAddress(
    $input: UpdatePrognosUsersAddressInput!
    $condition: ModelPrognosUsersAddressConditionInput
  ) {
    updatePrognosUsersAddress(input: $input, condition: $condition) {
      id
      address
      city
      state
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosUsersAddress = /* GraphQL */ `
  mutation DeletePrognosUsersAddress(
    $input: DeletePrognosUsersAddressInput!
    $condition: ModelPrognosUsersAddressConditionInput
  ) {
    deletePrognosUsersAddress(input: $input, condition: $condition) {
      id
      address
      city
      state
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosQuestionnaire = /* GraphQL */ `
  mutation CreatePrognosQuestionnaire(
    $input: CreatePrognosQuestionnaireInput!
    $condition: ModelPrognosQuestionnaireConditionInput
  ) {
    createPrognosQuestionnaire(input: $input, condition: $condition) {
      id
      name
      type
      display
      keyIdentifier
      order
      components
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosQuestionnaire = /* GraphQL */ `
  mutation UpdatePrognosQuestionnaire(
    $input: UpdatePrognosQuestionnaireInput!
    $condition: ModelPrognosQuestionnaireConditionInput
  ) {
    updatePrognosQuestionnaire(input: $input, condition: $condition) {
      id
      name
      type
      display
      keyIdentifier
      order
      components
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosQuestionnaire = /* GraphQL */ `
  mutation DeletePrognosQuestionnaire(
    $input: DeletePrognosQuestionnaireInput!
    $condition: ModelPrognosQuestionnaireConditionInput
  ) {
    deletePrognosQuestionnaire(input: $input, condition: $condition) {
      id
      name
      type
      display
      keyIdentifier
      order
      components
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosUserAnswer = /* GraphQL */ `
  mutation CreatePrognosUserAnswer(
    $input: CreatePrognosUserAnswerInput!
    $condition: ModelPrognosUserAnswerConditionInput
  ) {
    createPrognosUserAnswer(input: $input, condition: $condition) {
      id
      userId
      userEmail
      userPhoneNumber
      questionnaireId
      keyIdentifier
      answers
      assessmentResult
      patientEmail
      patientPhoneNumber
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosUserAnswer = /* GraphQL */ `
  mutation UpdatePrognosUserAnswer(
    $input: UpdatePrognosUserAnswerInput!
    $condition: ModelPrognosUserAnswerConditionInput
  ) {
    updatePrognosUserAnswer(input: $input, condition: $condition) {
      id
      userId
      userEmail
      userPhoneNumber
      questionnaireId
      keyIdentifier
      answers
      assessmentResult
      patientEmail
      patientPhoneNumber
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosUserAnswer = /* GraphQL */ `
  mutation DeletePrognosUserAnswer(
    $input: DeletePrognosUserAnswerInput!
    $condition: ModelPrognosUserAnswerConditionInput
  ) {
    deletePrognosUserAnswer(input: $input, condition: $condition) {
      id
      userId
      userEmail
      userPhoneNumber
      questionnaireId
      keyIdentifier
      answers
      assessmentResult
      patientEmail
      patientPhoneNumber
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosUserSessions = /* GraphQL */ `
  mutation CreatePrognosUserSessions(
    $input: CreatePrognosUserSessionsInput!
    $condition: ModelPrognosUserSessionsConditionInput
  ) {
    createPrognosUserSessions(input: $input, condition: $condition) {
      id
      userId
      username
      accessToken
      isRevoked
      isExpired
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosUserSessions = /* GraphQL */ `
  mutation UpdatePrognosUserSessions(
    $input: UpdatePrognosUserSessionsInput!
    $condition: ModelPrognosUserSessionsConditionInput
  ) {
    updatePrognosUserSessions(input: $input, condition: $condition) {
      id
      userId
      username
      accessToken
      isRevoked
      isExpired
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosUserSessions = /* GraphQL */ `
  mutation DeletePrognosUserSessions(
    $input: DeletePrognosUserSessionsInput!
    $condition: ModelPrognosUserSessionsConditionInput
  ) {
    deletePrognosUserSessions(input: $input, condition: $condition) {
      id
      userId
      username
      accessToken
      isRevoked
      isExpired
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosSuperAdmin = /* GraphQL */ `
  mutation CreatePrognosSuperAdmin(
    $input: CreatePrognosSuperAdminInput!
    $condition: ModelPrognosSuperAdminConditionInput
  ) {
    createPrognosSuperAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosSuperAdmin = /* GraphQL */ `
  mutation UpdatePrognosSuperAdmin(
    $input: UpdatePrognosSuperAdminInput!
    $condition: ModelPrognosSuperAdminConditionInput
  ) {
    updatePrognosSuperAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosSuperAdmin = /* GraphQL */ `
  mutation DeletePrognosSuperAdmin(
    $input: DeletePrognosSuperAdminInput!
    $condition: ModelPrognosSuperAdminConditionInput
  ) {
    deletePrognosSuperAdmin(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phoneNumber
      language
      race
      role
      status
      DOB
      addressId
      address {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      isDeleted
      gender
      zipCode
      isSuspended
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const createCHWtoPatient = /* GraphQL */ `
  mutation CreateCHWtoPatient(
    $input: CreateCHWtoPatientInput!
    $condition: ModelCHWtoPatientConditionInput
  ) {
    createCHWtoPatient(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosPatientsId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCHWtoPatient = /* GraphQL */ `
  mutation UpdateCHWtoPatient(
    $input: UpdateCHWtoPatientInput!
    $condition: ModelCHWtoPatientConditionInput
  ) {
    updateCHWtoPatient(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosPatientsId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCHWtoPatient = /* GraphQL */ `
  mutation DeleteCHWtoPatient(
    $input: DeleteCHWtoPatientInput!
    $condition: ModelCHWtoPatientConditionInput
  ) {
    deleteCHWtoPatient(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosPatientsId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCHWtoCaregiver = /* GraphQL */ `
  mutation CreateCHWtoCaregiver(
    $input: CreateCHWtoCaregiverInput!
    $condition: ModelCHWtoCaregiverConditionInput
  ) {
    createCHWtoCaregiver(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosCaregiversId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCHWtoCaregiver = /* GraphQL */ `
  mutation UpdateCHWtoCaregiver(
    $input: UpdateCHWtoCaregiverInput!
    $condition: ModelCHWtoCaregiverConditionInput
  ) {
    updateCHWtoCaregiver(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosCaregiversId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCHWtoCaregiver = /* GraphQL */ `
  mutation DeleteCHWtoCaregiver(
    $input: DeleteCHWtoCaregiverInput!
    $condition: ModelCHWtoCaregiverConditionInput
  ) {
    deleteCHWtoCaregiver(input: $input, condition: $condition) {
      id
      prognosCHWId
      prognosCaregiversId
      prognosCHW {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        status
        race
        role
        patients {
          nextToken
        }
        caregivers {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        imageURL
        type
        createdAt
        updatedAt
      }
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPrognosCareGivertoPatient = /* GraphQL */ `
  mutation CreatePrognosCareGivertoPatient(
    $input: CreatePrognosCareGivertoPatientInput!
    $condition: ModelPrognosCareGivertoPatientConditionInput
  ) {
    createPrognosCareGivertoPatient(input: $input, condition: $condition) {
      id
      prognosCaregiversId
      prognosPatientsId
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePrognosCareGivertoPatient = /* GraphQL */ `
  mutation UpdatePrognosCareGivertoPatient(
    $input: UpdatePrognosCareGivertoPatientInput!
    $condition: ModelPrognosCareGivertoPatientConditionInput
  ) {
    updatePrognosCareGivertoPatient(input: $input, condition: $condition) {
      id
      prognosCaregiversId
      prognosPatientsId
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePrognosCareGivertoPatient = /* GraphQL */ `
  mutation DeletePrognosCareGivertoPatient(
    $input: DeletePrognosCareGivertoPatientInput!
    $condition: ModelPrognosCareGivertoPatientConditionInput
  ) {
    deletePrognosCareGivertoPatient(input: $input, condition: $condition) {
      id
      prognosCaregiversId
      prognosPatientsId
      prognosCaregivers {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        race
        role
        DOB
        isTwilioGroupJoined
        status
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        patients {
          nextToken
        }
        chw {
          nextToken
        }
        assignedTo
        createdBy
        updatedBy
        isDeleted
        zipCode
        gender
        isSuspended
        assessmentScore
        lastAssessmentDate
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      prognosPatients {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        DOB
        isTwilioGroupJoined
        status
        gender
        role
        race
        assessmentScore
        lastAssessmentDate
        chw {
          nextToken
        }
        addressId
        address {
          id
          address
          city
          state
          zipCode
          createdAt
          updatedAt
        }
        assignedTo
        careGivers {
          nextToken
        }
        createdBy
        updatedBy
        isDeleted
        zipCode
        isSuspended
        imageURL
        appStoreOriginalTansactionId
        appStoreSubscriptionTier
        appStoreSubscriptionStatus
        playStorePurchaseToken
        playStoreSubscriptionTier
        playStoreSubscriptionStatus
        currentPlatform
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
