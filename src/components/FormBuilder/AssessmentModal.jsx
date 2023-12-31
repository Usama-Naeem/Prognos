import React from "react";
import { Form } from "antd";
import { FormOutlined } from "@ant-design/icons";
import ModalInput from "../../shared/components/ModalInput/ModalInput";
import { FormRule } from "../../shared/enum/formRules";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import FormModal from "../../shared/components/FormModal/FormModal";
import { createNewAssessment } from "../../shared/api/formBuilder";
import { getAssessmentFormsList } from "../../shared/utils";

function AssessmentModal({
  isModalOpen,
  setIsModalOpen,
  assessmentInfo,
  items,
  setSidebarList,
}) {
  const handleFormSubmit = async (values) => {
    const response = await createNewAssessment(
      values.assessmentName,
      assessmentInfo,
    );
if (response) {
  const questionnaire = response?.data?.createPrognosQuestionnaire;

  assessmentInfo.splice(assessmentInfo.length - 1, 0, questionnaire);

  const assessmentFormsList = getAssessmentFormsList(assessmentInfo, items);
  setSidebarList(assessmentFormsList);
}
    setIsModalOpen(false);
  };

  return (
    <>
      <FormModal
        title="Create New Assessment"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="pt-[40px] pb-[20px]">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <ModalInput
              label="Assessment Name"
              rules={FormRule.NAME}
              name="assessmentName"
              placeholder="Enter Assessment name"
              icon={<FormOutlined />}
            />

            <ModalSubmitButton label="Create" />
          </Form>
        </div>
      </FormModal>
    </>
  );
}

export default AssessmentModal;
