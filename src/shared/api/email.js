import {
  CreateTemplateCommand,
  GetTemplateCommand,
  SendTemplatedEmailCommand,
  SESClient,
  UpdateTemplateCommand,
} from "@aws-sdk/client-ses";
import { AMPLIFY_CONFIG, SES_DEFAULT_EMAIL } from "../constant";

const client = new SESClient(AMPLIFY_CONFIG);

export const sendTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  link,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, link: link }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const sendCHWTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  password,
  link,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({
      name: name,
      link: link,
      email: toAddress,
      password: password,
    }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const getEmailTemplate = async (name) => {
  const getTemplate = new GetTemplateCommand({ TemplateName: name });
  try {
    const response = await client.send(getTemplate);
    return response.Template;
  } catch (err) {
    throw Error(err.message);
  }
};

export const createInvitationTemplate = async () => {
  const TEMPLATE_NAME = "USER_INVITATION_TEMPLATE";

  const createCreateTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          You have been invited to the PrognosUS. Please click 
          <a href="{{link}}" target="_blank"><strong>PrognosUS</strong></a> to get started
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Prognos Invitation",
      },
    });

  const createTemplateCommand = createCreateTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const createResultTemplate = async () => {
  const TEMPLATE_NAME = "ASSESSMENT_RESULT_TEMPLATE";

  const createCreateTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>Thanks for filling the assessment form. You can 
            view your result again at <a href="{{link}}" target="_blank"><strong>PrognosUS</strong></a>
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Prognos Assessment Result",
      },
    });

  const createTemplateCommand = createCreateTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const createDeleteChatTemplate = async () => {
  const TEMPLATE_NAME = "USER_DELETE_CHAT_TEMPLATE";

  const createCreateTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>This email is to inform you that Prognosus chat group <strong>{{groupName}}</strong> has been deleted.</p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Group Chat Deleted",
      },
    });

  const createTemplateCommand = createCreateTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendDeleteChatGroupEmail = async (
  toAddressess,
  templateName,
  groupName,
) => {
  const input = {
    Destination: { ToAddresses: toAddressess },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ groupName: groupName }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateTemplate = async () => {
  const TEMPLATE_NAME = "ASSESSMENT_RESULT_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>Hello, <strong>{{name}}!</strong></p>
        <p>Thanks for filling the assessment form. You can 
          view your result again at <a href="{{link}}" target="_blank"><strong>PrognosUS</strong></a>
        </p>
        </br>
        <p>Regards,</p>
        <p>Team PrognosUS</p>
        `,
        SubjectPart: "Prognos Assessment Result",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendSuspendTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  reason,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, reason: reason }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const suspendUserTemplate = async () => {
  const TEMPLATE_NAME = "ACCOUNT_SUSPEND_TEMPLATE";

  const createSuspendTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Your account is suspended due to {{reason}}.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Suspend",
      },
    });

  const createTemplateCommand = createSuspendTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateSuspendUserTemplate = async () => {
  const TEMPLATE_NAME = "ACCOUNT_SUSPEND_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Due to {{reason}} your user account has been suspended, and unfortunately you won't be able to access the platform. In case of any query please 
          contact us at <a href="mailto:dunkindona@prognosus.com">dunkindona@prognosus.com</a>.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Suspended",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendEnableUserTemplatedEmail = async (
  toAddress,
  templateName,
  name,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const enableUserTemplate = async () => {
  const TEMPLATE_NAME = "ACCOUNT_ENABLE_TEMPLATE";

  const createSuspendTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          This email is to inform you that your account has been enabled.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Enabled",
      },
    });

  const createTemplateCommand = createSuspendTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateEnableUserTemplate = async () => {
  const TEMPLATE_NAME = "ACCOUNT_ENABLE_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Your user account has been activated and you can continue to access the platform.In case of any query please contact us 
          at <a href="mailto:dunkindona@prognosus.com">dunkindona@prognosus.com</a>.  
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Activated",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendDeleteUserTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  reason,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, reason: reason }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const softDeleteUserTemplate = async () => {
  const TEMPLATE_NAME = "USER_DELETE_TEMPLATE";

  const createDeleteTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          This email is to inform you that your account has been deleted due to {{reason}}.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Deletd",
      },
    });

  const createTemplateCommand = createDeleteTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateSoftDeleteUserTemplate = async () => {
  const TEMPLATE_NAME = "USER_DELETE_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Due to {{reason}} your user account has been deleted, and unfortunately you won't be able to access the platform. In case of any query please 
          contact us at <a href="mailto:dunkindona@prognosus.com">dunkindona@prognosus.com</a>.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Account Removed",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendLeftGroupChatTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  adminName,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, adminName: adminName }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const leftGroupChatUserTemplate = async () => {
  const TEMPLATE_NAME = "USER_LEFT_CHAT_TEMPLATE";

  const createLeftChatTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{adminName}}!</strong></p>
          <p>
          {{name}} has left the group chat and is no longer a part of any group chat, if required please add them to another group chat.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Patient/Cragiver left group chat",
      },
    });

  const createTemplateCommand = createLeftChatTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendAddToGroupChatTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  group,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, group: group }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const addedToGroupChatUserTemplate = async () => {
  const TEMPLATE_NAME = "USER_ADDED_TO_CHAT_TEMPLATE";

  const createAddedChatTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          You've been added into <strong>{{group}}</strong> group chat.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Added to Group Chat",
      },
    });

  const createTemplateCommand = createAddedChatTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendRemovedFromGroupChatTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  group,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, group: group }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const removedFromGroupChatUserTemplate = async () => {
  const TEMPLATE_NAME = "USER_REMOVED_FROM_CHAT_TEMPLATE";

  const createRemovedChatTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          You've been removed from <strong>{{group}}</strong> group chat.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Removed from Group Chat",
      },
    });

  const createTemplateCommand = createRemovedChatTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendCaregiverTakesPatientAssessmentTemplatedEmail = async (
  toAddress,
  templateName,
  name,
  careGiverName,
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, careGiverName: careGiverName }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const caregiverTakesPatientAssessmentTemplatedEmail = async () => {
  const TEMPLATE_NAME = "CAREGIVER_TAKING_PATIENT_ASSESSMENT_TEMPLATE";

  const createCaregiverFillPatientAssessmentTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Brain health is intended for educational and health promotion purposes and is not a substitute for a medical evaluation. These questions help determine whether problems with memory, thinking, speech, or behavior indicate reversible or irreversible brain changes.
          This assessment is being taken by your loved one, {{careGiverName}},to determine the likehood of which condition you might fall in i.e. Reversiable or Irreversiable dementia or depression. 
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Brain Health Screening",
      },
    });

  const createTemplateCommand =
    createCaregiverFillPatientAssessmentTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updatecaregiverFillPatientAssessmentTemplateCommand = async () => {
  const TEMPLATE_NAME = "USER_ADDED_TO_CHAT_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          You've been added into <strong>{{group}}</strong> group chat.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Added to Group Chat",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendGoogleMeetLinkTemplate = async () => {
  const TEMPLATE_NAME = "GOOGLE_MEET_LINK_TEMPLATE";

  const createGoogleMeetTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Use the link below to join the meeting.
          </p>
          <a href="{{link}}" target="_blank">{{link}}</a>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Meeting Link",
      },
    });

  const googleMeetTemplateCommand = createGoogleMeetTemplateCommand();
  try {
    const response = await client.send(googleMeetTemplateCommand);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateGoogleMeetLinkTemplateCommand = async () => {
  const TEMPLATE_NAME = "GOOGLE_MEET_LINK_TEMPLATE";

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Use the link below to join the meeting:
          </p>
          <a href="{{link}}" target="_blank">{{link}}</a>
          </br>
          <p>Regards,</p>
          <p>Team PrognosUS</p>
        `,
        SubjectPart: "Meeting Link",
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    const result = await client.send(updateTemplateCommand);
    return result;
  } catch (err) {
    throw Error(err);
  }
};

export const communityHealthWorkerInvitationTemplateCommand = async () => {
  const TEMPLATE_NAME = "CHW_INVITATION_TEMPLATE";

  const createInvitationTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>Hello, <strong>{{name}}!</strong></p>
      <p>We invite you to create your Community Health Worker / Promotora account with PrognosUs here <a href="{{link}}" target="_blank">{{link}}</a>. Your Username is {{email}} and your Temporary Password is {{password}} This will allow you to add users to chats, reference content to share, and otherwise engage patients and caregivers.</p>
      `,
        SubjectPart: "Prognos Invitation",
      },
    });

  const createTemplateCommand = createInvitationTemplateCommand();
  try {
    const result = await client.send(createTemplateCommand);
    return result;
  } catch (err) {
    throw Error(err);
  }
};

export const updateCommunityHealthWorkerInvitationTemplate = async () => {
  const TEMPLATE_NAME = "CHW_INVITATION_TEMPLATE";

  const updateCommunityHealthWorkerInvitation = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>Hello, <strong>{{name}}!</strong></p>
      <p>We invite you to create your Community Health Worker / Promotora account with PrognosUs here <a href="{{link}}" target="_blank"><strong>link</strong></a>.
       Your Username is {{email}} and your Temporary Password is {{password}}. 
       This will allow you to add users to chats, reference content to share, and otherwise engage patients and caregivers.</p>
      `,
        SubjectPart: "Prognos Invitation",
      },
    });

  const updateTemplateCommand = updateCommunityHealthWorkerInvitation();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const adminInvitationTemplate = async () => {
  const TEMPLATE_NAME = "ADMIN_INVITATION_TEMPLATE";

  const createAdminInvitation = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>Hello, <strong>{{name}}!</strong></p>
      <p>We invite you to create your Admin account with PrognosUs here  <a href="{{link}}" target="_blank">{{link}}</a>. 
      Your Username is {{email}} and your Temporary Password is {{password}}.
      This will allow you to add users to chats, reference content to share, and otherwise engage patients and caregivers.</p>
      `,
        SubjectPart: "Prognos Invitation",
      },
    });

  const createTemplateCommand = createAdminInvitation();
  try {
    return await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateAdminInvitationTemplate = async () => {
  const TEMPLATE_NAME = "ADMIN_INVITATION_TEMPLATE";

  const updateAdminInvitation = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>Hello, <strong>{{name}}!</strong></p>
      <p>We invite you to create your Admin account with PrognosUs here <a href="{{link}}" target="_blank"><strong>link</strong></a>.
      Your Username is {{email}} and your Temporary Password is {{password}}.
      This will allow you to add users to chats, reference content to share, and otherwise engage patients and caregivers.</p>
      `,
        SubjectPart: "Prognos Invitation",
      },
    });

  const updateTemplateCommand = updateAdminInvitation();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateSubscriptionTemplate = async () => {
  const TEMPLATE_NAME = "PROGNESS_SEND_SUSCRIPTION_NOTIFICATION";

  const updateSubscription = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>A new user has subscribed to our service. Below are the details of the new subscriber:</p>
      </br>
      <p>First Name: <strong>{{firstName}}</strong></p>
      <p>Last Name: <strong>{{lastName}}</strong></p>
      <p>Email: <strong>{{email}}</strong></p>
      <p>Subscription Tier: <strong>{{subscriptionTier}}</strong></p>
      `,
        SubjectPart: "New Subscribed User",
      },
    });

  const updateTemplateCommmand = updateSubscription();
  try {
    await client.send(updateTemplateCommmand);
  } catch (err) {
    throw Error(err);
  }
};

export const createSubscriptionChangeTemplate = async () => {
  const TEMPLATE_NAME = "PROGNESS_SEND_SUSCRIPTION_CHANGE_NOTIFICATION";

  const updateSubscription = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
      <p>A user has {{subsScriptionAction}} subscription. Below are the details of the subscriber:</p>
      </br>
      <p>First Name: <strong>{{firstName}}</strong></p>
      <p>Last Name: <strong>{{lastName}}</strong></p>
      <p>Email: <strong>{{email}}</strong></p>
      <p>Subscription Tier: <strong>{{subscriptionTier}}</strong></p>
      `,
        SubjectPart: "Subscription Change",
      },
    });

  const updateTemplateCommmand = updateSubscription();
  try {
    await client.send(updateTemplateCommmand);
  } catch (err) {
    throw Error(err);
  }
};

export const customizedSubscriptionEmailTemplate = async () => {
  const TEMPLATE_NAME = "PROGNOS_SEND_SUBSCRIPTION_CUSTOMIZE_NOTIFICATION";

  const createCreateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>{{customizeMessage}}. Below are the details of the user:</p>
        </br>
        <p>First Name: <strong>{{firstName}}</strong></p>
        <p>Last Name: <strong>{{lastName}}</strong></p>
        <p>Email: <strong>{{email}}</strong></p>
        <p>Subscription Tier: <strong>{{subscriptionTier}}</strong></p>
        `,
        SubjectPart: "PrognosUs Subscription Notification",
      },
    });

  const createTemplateCommand = createCreateTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

