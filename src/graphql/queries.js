/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPrognosAdmin = /* GraphQL */ `
  query GetPrognosAdmin($id: ID!) {
    getPrognosAdmin(id: $id) {
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
export const listPrognosAdmins = /* GraphQL */ `
  query ListPrognosAdmins(
    $filter: ModelPrognosAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosCHW = /* GraphQL */ `
  query GetPrognosCHW($id: ID!) {
    getPrognosCHW(id: $id) {
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
export const listPrognosCHWS = /* GraphQL */ `
  query ListPrognosCHWS(
    $filter: ModelPrognosCHWFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosCHWS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosCaregivers = /* GraphQL */ `
  query GetPrognosCaregivers($id: ID!) {
    getPrognosCaregivers(id: $id) {
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
export const listPrognosCaregivers = /* GraphQL */ `
  query ListPrognosCaregivers(
    $filter: ModelPrognosCaregiversFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosCaregivers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosPatients = /* GraphQL */ `
  query GetPrognosPatients($id: ID!) {
    getPrognosPatients(id: $id) {
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
export const listPrognosPatients = /* GraphQL */ `
  query ListPrognosPatients(
    $filter: ModelPrognosPatientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosUsersAddress = /* GraphQL */ `
  query GetPrognosUsersAddress($id: ID!) {
    getPrognosUsersAddress(id: $id) {
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
export const listPrognosUsersAddresses = /* GraphQL */ `
  query ListPrognosUsersAddresses(
    $filter: ModelPrognosUsersAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosUsersAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        address
        city
        state
        zipCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrognosQuestionnaire = /* GraphQL */ `
  query GetPrognosQuestionnaire($id: ID!) {
    getPrognosQuestionnaire(id: $id) {
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
export const listPrognosQuestionnaires = /* GraphQL */ `
  query ListPrognosQuestionnaires(
    $filter: ModelPrognosQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosQuestionnaires(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosUserAnswer = /* GraphQL */ `
  query GetPrognosUserAnswer($id: ID!) {
    getPrognosUserAnswer(id: $id) {
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
export const listPrognosUserAnswers = /* GraphQL */ `
  query ListPrognosUserAnswers(
    $filter: ModelPrognosUserAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosUserAnswers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPrognosUserSessions = /* GraphQL */ `
  query GetPrognosUserSessions($id: ID!) {
    getPrognosUserSessions(id: $id) {
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
export const listPrognosUserSessions = /* GraphQL */ `
  query ListPrognosUserSessions(
    $filter: ModelPrognosUserSessionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosUserSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        username
        accessToken
        isRevoked
        isExpired
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrognosSuperAdmin = /* GraphQL */ `
  query GetPrognosSuperAdmin($id: ID!) {
    getPrognosSuperAdmin(id: $id) {
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
export const listPrognosSuperAdmins = /* GraphQL */ `
  query ListPrognosSuperAdmins(
    $filter: ModelPrognosSuperAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosSuperAdmins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCHWtoPatient = /* GraphQL */ `
  query GetCHWtoPatient($id: ID!) {
    getCHWtoPatient(id: $id) {
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
export const listCHWtoPatients = /* GraphQL */ `
  query ListCHWtoPatients(
    $filter: ModelCHWtoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCHWtoPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          addressId
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
export const getCHWtoCaregiver = /* GraphQL */ `
  query GetCHWtoCaregiver($id: ID!) {
    getCHWtoCaregiver(id: $id) {
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
export const listCHWtoCaregivers = /* GraphQL */ `
  query ListCHWtoCaregivers(
    $filter: ModelCHWtoCaregiverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCHWtoCaregivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          addressId
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
      nextToken
    }
  }
`;
export const getPrognosCareGivertoPatient = /* GraphQL */ `
  query GetPrognosCareGivertoPatient($id: ID!) {
    getPrognosCareGivertoPatient(id: $id) {
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
export const listPrognosCareGivertoPatients = /* GraphQL */ `
  query ListPrognosCareGivertoPatients(
    $filter: ModelPrognosCareGivertoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosCareGivertoPatients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
export const listPrognosAdminsByDate = /* GraphQL */ `
  query ListPrognosAdminsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosAdminsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPrognosCHWByDate = /* GraphQL */ `
  query ListPrognosCHWByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosCHWFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosCHWByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPrognosCaregiversByDate = /* GraphQL */ `
  query ListPrognosCaregiversByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosCaregiversFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosCaregiversByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPrognosPatientsByDate = /* GraphQL */ `
  query ListPrognosPatientsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosPatientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosPatientsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPrognosQuestionnaireByOrder = /* GraphQL */ `
  query ListPrognosQuestionnaireByOrder(
    $type: String!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrognosQuestionnaireByOrder(
      type: $type
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const cHWtoPatientsByPrognosCHWId = /* GraphQL */ `
  query CHWtoPatientsByPrognosCHWId(
    $prognosCHWId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCHWtoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cHWtoPatientsByPrognosCHWId(
      prognosCHWId: $prognosCHWId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
export const cHWtoPatientsByPrognosPatientsId = /* GraphQL */ `
  query CHWtoPatientsByPrognosPatientsId(
    $prognosPatientsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCHWtoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cHWtoPatientsByPrognosPatientsId(
      prognosPatientsId: $prognosPatientsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
export const cHWtoCaregiversByPrognosCHWId = /* GraphQL */ `
  query CHWtoCaregiversByPrognosCHWId(
    $prognosCHWId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCHWtoCaregiverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cHWtoCaregiversByPrognosCHWId(
      prognosCHWId: $prognosCHWId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
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
      nextToken
    }
  }
`;
export const cHWtoCaregiversByPrognosCaregiversId = /* GraphQL */ `
  query CHWtoCaregiversByPrognosCaregiversId(
    $prognosCaregiversId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCHWtoCaregiverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cHWtoCaregiversByPrognosCaregiversId(
      prognosCaregiversId: $prognosCaregiversId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
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
      nextToken
    }
  }
`;
export const prognosCareGivertoPatientsByPrognosCaregiversId = /* GraphQL */ `
  query PrognosCareGivertoPatientsByPrognosCaregiversId(
    $prognosCaregiversId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosCareGivertoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prognosCareGivertoPatientsByPrognosCaregiversId(
      prognosCaregiversId: $prognosCaregiversId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
export const prognosCareGivertoPatientsByPrognosPatientsId = /* GraphQL */ `
  query PrognosCareGivertoPatientsByPrognosPatientsId(
    $prognosPatientsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPrognosCareGivertoPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prognosCareGivertoPatientsByPrognosPatientsId(
      prognosPatientsId: $prognosPatientsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          addressId
          assignedTo
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
      nextToken
    }
  }
`;
