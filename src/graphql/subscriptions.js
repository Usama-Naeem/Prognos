/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePrognosAdmin = /* GraphQL */ `
  subscription OnCreatePrognosAdmin(
    $filter: ModelSubscriptionPrognosAdminFilterInput
  ) {
    onCreatePrognosAdmin(filter: $filter) {
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
export const onUpdatePrognosAdmin = /* GraphQL */ `
  subscription OnUpdatePrognosAdmin(
    $filter: ModelSubscriptionPrognosAdminFilterInput
  ) {
    onUpdatePrognosAdmin(filter: $filter) {
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
export const onDeletePrognosAdmin = /* GraphQL */ `
  subscription OnDeletePrognosAdmin(
    $filter: ModelSubscriptionPrognosAdminFilterInput
  ) {
    onDeletePrognosAdmin(filter: $filter) {
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
export const onCreatePrognosCHW = /* GraphQL */ `
  subscription OnCreatePrognosCHW(
    $filter: ModelSubscriptionPrognosCHWFilterInput
  ) {
    onCreatePrognosCHW(filter: $filter) {
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
export const onUpdatePrognosCHW = /* GraphQL */ `
  subscription OnUpdatePrognosCHW(
    $filter: ModelSubscriptionPrognosCHWFilterInput
  ) {
    onUpdatePrognosCHW(filter: $filter) {
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
export const onDeletePrognosCHW = /* GraphQL */ `
  subscription OnDeletePrognosCHW(
    $filter: ModelSubscriptionPrognosCHWFilterInput
  ) {
    onDeletePrognosCHW(filter: $filter) {
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
export const onCreatePrognosCaregivers = /* GraphQL */ `
  subscription OnCreatePrognosCaregivers(
    $filter: ModelSubscriptionPrognosCaregiversFilterInput
  ) {
    onCreatePrognosCaregivers(filter: $filter) {
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
export const onUpdatePrognosCaregivers = /* GraphQL */ `
  subscription OnUpdatePrognosCaregivers(
    $filter: ModelSubscriptionPrognosCaregiversFilterInput
  ) {
    onUpdatePrognosCaregivers(filter: $filter) {
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
export const onDeletePrognosCaregivers = /* GraphQL */ `
  subscription OnDeletePrognosCaregivers(
    $filter: ModelSubscriptionPrognosCaregiversFilterInput
  ) {
    onDeletePrognosCaregivers(filter: $filter) {
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
export const onCreatePrognosPatients = /* GraphQL */ `
  subscription OnCreatePrognosPatients(
    $filter: ModelSubscriptionPrognosPatientsFilterInput
  ) {
    onCreatePrognosPatients(filter: $filter) {
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
export const onUpdatePrognosPatients = /* GraphQL */ `
  subscription OnUpdatePrognosPatients(
    $filter: ModelSubscriptionPrognosPatientsFilterInput
  ) {
    onUpdatePrognosPatients(filter: $filter) {
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
export const onDeletePrognosPatients = /* GraphQL */ `
  subscription OnDeletePrognosPatients(
    $filter: ModelSubscriptionPrognosPatientsFilterInput
  ) {
    onDeletePrognosPatients(filter: $filter) {
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
export const onCreatePrognosUsersAddress = /* GraphQL */ `
  subscription OnCreatePrognosUsersAddress(
    $filter: ModelSubscriptionPrognosUsersAddressFilterInput
  ) {
    onCreatePrognosUsersAddress(filter: $filter) {
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
export const onUpdatePrognosUsersAddress = /* GraphQL */ `
  subscription OnUpdatePrognosUsersAddress(
    $filter: ModelSubscriptionPrognosUsersAddressFilterInput
  ) {
    onUpdatePrognosUsersAddress(filter: $filter) {
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
export const onDeletePrognosUsersAddress = /* GraphQL */ `
  subscription OnDeletePrognosUsersAddress(
    $filter: ModelSubscriptionPrognosUsersAddressFilterInput
  ) {
    onDeletePrognosUsersAddress(filter: $filter) {
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
export const onCreatePrognosQuestionnaire = /* GraphQL */ `
  subscription OnCreatePrognosQuestionnaire(
    $filter: ModelSubscriptionPrognosQuestionnaireFilterInput
  ) {
    onCreatePrognosQuestionnaire(filter: $filter) {
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
export const onUpdatePrognosQuestionnaire = /* GraphQL */ `
  subscription OnUpdatePrognosQuestionnaire(
    $filter: ModelSubscriptionPrognosQuestionnaireFilterInput
  ) {
    onUpdatePrognosQuestionnaire(filter: $filter) {
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
export const onDeletePrognosQuestionnaire = /* GraphQL */ `
  subscription OnDeletePrognosQuestionnaire(
    $filter: ModelSubscriptionPrognosQuestionnaireFilterInput
  ) {
    onDeletePrognosQuestionnaire(filter: $filter) {
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
export const onCreatePrognosUserAnswer = /* GraphQL */ `
  subscription OnCreatePrognosUserAnswer(
    $filter: ModelSubscriptionPrognosUserAnswerFilterInput
  ) {
    onCreatePrognosUserAnswer(filter: $filter) {
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
export const onUpdatePrognosUserAnswer = /* GraphQL */ `
  subscription OnUpdatePrognosUserAnswer(
    $filter: ModelSubscriptionPrognosUserAnswerFilterInput
  ) {
    onUpdatePrognosUserAnswer(filter: $filter) {
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
export const onDeletePrognosUserAnswer = /* GraphQL */ `
  subscription OnDeletePrognosUserAnswer(
    $filter: ModelSubscriptionPrognosUserAnswerFilterInput
  ) {
    onDeletePrognosUserAnswer(filter: $filter) {
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
export const onCreatePrognosUserSessions = /* GraphQL */ `
  subscription OnCreatePrognosUserSessions(
    $filter: ModelSubscriptionPrognosUserSessionsFilterInput
  ) {
    onCreatePrognosUserSessions(filter: $filter) {
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
export const onUpdatePrognosUserSessions = /* GraphQL */ `
  subscription OnUpdatePrognosUserSessions(
    $filter: ModelSubscriptionPrognosUserSessionsFilterInput
  ) {
    onUpdatePrognosUserSessions(filter: $filter) {
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
export const onDeletePrognosUserSessions = /* GraphQL */ `
  subscription OnDeletePrognosUserSessions(
    $filter: ModelSubscriptionPrognosUserSessionsFilterInput
  ) {
    onDeletePrognosUserSessions(filter: $filter) {
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
export const onCreatePrognosSuperAdmin = /* GraphQL */ `
  subscription OnCreatePrognosSuperAdmin(
    $filter: ModelSubscriptionPrognosSuperAdminFilterInput
  ) {
    onCreatePrognosSuperAdmin(filter: $filter) {
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
export const onUpdatePrognosSuperAdmin = /* GraphQL */ `
  subscription OnUpdatePrognosSuperAdmin(
    $filter: ModelSubscriptionPrognosSuperAdminFilterInput
  ) {
    onUpdatePrognosSuperAdmin(filter: $filter) {
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
export const onDeletePrognosSuperAdmin = /* GraphQL */ `
  subscription OnDeletePrognosSuperAdmin(
    $filter: ModelSubscriptionPrognosSuperAdminFilterInput
  ) {
    onDeletePrognosSuperAdmin(filter: $filter) {
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
export const onCreateCHWtoPatient = /* GraphQL */ `
  subscription OnCreateCHWtoPatient(
    $filter: ModelSubscriptionCHWtoPatientFilterInput
  ) {
    onCreateCHWtoPatient(filter: $filter) {
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
export const onUpdateCHWtoPatient = /* GraphQL */ `
  subscription OnUpdateCHWtoPatient(
    $filter: ModelSubscriptionCHWtoPatientFilterInput
  ) {
    onUpdateCHWtoPatient(filter: $filter) {
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
export const onDeleteCHWtoPatient = /* GraphQL */ `
  subscription OnDeleteCHWtoPatient(
    $filter: ModelSubscriptionCHWtoPatientFilterInput
  ) {
    onDeleteCHWtoPatient(filter: $filter) {
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
export const onCreateCHWtoCaregiver = /* GraphQL */ `
  subscription OnCreateCHWtoCaregiver(
    $filter: ModelSubscriptionCHWtoCaregiverFilterInput
  ) {
    onCreateCHWtoCaregiver(filter: $filter) {
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
export const onUpdateCHWtoCaregiver = /* GraphQL */ `
  subscription OnUpdateCHWtoCaregiver(
    $filter: ModelSubscriptionCHWtoCaregiverFilterInput
  ) {
    onUpdateCHWtoCaregiver(filter: $filter) {
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
export const onDeleteCHWtoCaregiver = /* GraphQL */ `
  subscription OnDeleteCHWtoCaregiver(
    $filter: ModelSubscriptionCHWtoCaregiverFilterInput
  ) {
    onDeleteCHWtoCaregiver(filter: $filter) {
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
export const onCreatePrognosCareGivertoPatient = /* GraphQL */ `
  subscription OnCreatePrognosCareGivertoPatient(
    $filter: ModelSubscriptionPrognosCareGivertoPatientFilterInput
  ) {
    onCreatePrognosCareGivertoPatient(filter: $filter) {
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
export const onUpdatePrognosCareGivertoPatient = /* GraphQL */ `
  subscription OnUpdatePrognosCareGivertoPatient(
    $filter: ModelSubscriptionPrognosCareGivertoPatientFilterInput
  ) {
    onUpdatePrognosCareGivertoPatient(filter: $filter) {
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
export const onDeletePrognosCareGivertoPatient = /* GraphQL */ `
  subscription OnDeletePrognosCareGivertoPatient(
    $filter: ModelSubscriptionPrognosCareGivertoPatientFilterInput
  ) {
    onDeletePrognosCareGivertoPatient(filter: $filter) {
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
