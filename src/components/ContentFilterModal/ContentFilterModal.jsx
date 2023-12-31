import React, { useState } from "react";
import { Form } from "antd";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import FormModal from "../../shared/components/FormModal/FormModal";
import { filterContent } from "../../shared/utils/strapi";

function ContentFilterModal({
  isModalOpen,
  setIsModalOpen,
  title,
  stages,
  gender,
  language,
  race,
  tableParams,
  setTableParams,
  setContent,
  setFilterApplied,
  setModalValues,
  modalValues,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setModalValues(values);
    if (values.stage || values.language || values.race || values.gender) {
      // Store Filters value in local storage
      window.localStorage.setItem("filterValues", JSON.stringify(values));
      setIsLoading(true);
      const { contentData, pagination } = await filterContent(
        values,
        tableParams.pagination,
      );
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: 1,
          total: pagination.total,
        },
      });
      setContent(contentData);
      setIsLoading(false);
      setFilterApplied(true);
      await handleModalCancel();
    } else {
      await handleModalCancel();
    }
  };

  const handleModalCancel = async () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        handleCancel={handleModalCancel}
        isModalOpen={isModalOpen}
      >
        <div className="pt-[40px] pb-[20px]">
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={modalValues}
          >
            <FormSelect
              name="stage"
              label="Stage"
              placeholder="Please select a stage"
              options={stages}
              rules={null}
            />
            <FormSelect
              name="gender"
              label="Gender"
              placeholder="Please select a gender"
              options={gender}
              rules={null}
            />
            <FormSelect
              name="language"
              label="Language"
              placeholder="Please select a language"
              options={language}
              rules={null}
            />
            <FormSelect
              name="race"
              label="Race"
              placeholder="Please select a race"
              options={race}
              rules={null}
            />
            <ModalSubmitButton loading={isLoading} label="Filter Content" />
          </Form>
        </div>
      </FormModal>
    </>
  );
}
export default ContentFilterModal;
