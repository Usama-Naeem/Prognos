import { Form } from "antd";
import React, { useState } from "react";
import FormModal from "../../shared/components/FormModal/FormModal";
import { FormRule } from "../../shared/enum/formRules";
import MultiSelect from "../../shared/components/MultiSelect/MultiSelect";
import { removePatientToCaregiver } from "../../shared/api/communityHealthWorker";
import { GroupType } from "../../shared/enum/roles";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";

function DeleteUserModal({
  isModalOpen,
  setIsModalOpen,
  rowId,
  fetchUserDetails,
  currentUserGroup,
  careGivers,
}) {
  const selectedchw = [];
  const unselectedchw = [];
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (value) => {
    selectedchw.push(value);
    // unselect chw if we wrongly select any chw
    const index = unselectedchw.indexOf(value);
    unselectedchw.splice(index, 1);
    // eslint-disable-next-line array-callback-return
    careGivers.map((el) => {
      if (el?.key === value) {
        const keyIndex = selectedchw.indexOf(value);
        selectedchw.splice(keyIndex, 1);
      }
    });
  };
  // Deselct all caregivers that we want to unassign
  const onDeSelect = (value) => {
    unselectedchw.push(value);
    const index = selectedchw.indexOf(value);
    selectedchw.splice(index, 1);
  };
  const handleFormSubmit = async () => {
    // function to get id's of unassigned caregivers
    setIsLoading(true);
    try {
      unselectedchw.map(async (id) => {
        const removecaregivertopatient = {
          prognosCaregiversId: id,
          prognosPatientsId: rowId.key,
        };
        // Unassigned selected caregivers
        await removePatientToCaregiver(removecaregivertopatient);
      });
      await fetchUserDetails();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.errors[0].message);
    }
  };
  const values = {
    assignedTo: careGivers,
  };
  return (
    <>
      <FormModal
        title={"Delete Association"}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <div className="pt-[40px] pb-[20px]">
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={values}
          >
            {/* Check if the current record have patient role and current signed in user is admin then show this multi select */}
            {currentUserGroup === GroupType.ADMIN ||
            currentUserGroup === GroupType.SUPER_ADMIN ? (
              <MultiSelect
                name="assignedTo"
                label="Unassign Caregiver"
                mode={"multiple"}
                allowClear={true}
                placeholder="Select caregivers to un assign"
                options={careGivers}
                rules={FormRule.CAREGIVER}
                onSelect={handleChange}
                onDeselect={onDeSelect}
              />
            ) : null}
            {/* Remove association record from DB on Delete */}
            {currentUserGroup === GroupType.ADMIN ||
            currentUserGroup === GroupType.SUPER_ADMIN ? (
              <FormSubmitButton
                type="primary"
                className="w-full text-white bg-darkColor mt-0 h-[40px] rounded-full font-medium"
                label="Delete"
                loading={isLoading}
              />
            ) : null}
          </Form>
        </div>
      </FormModal>
    </>
  );
}

export default DeleteUserModal;
