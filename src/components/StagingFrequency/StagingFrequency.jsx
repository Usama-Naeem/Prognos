import React, { useEffect } from "react";
import { Button, Form } from "antd";
import { StageFrequency } from "../../shared/enum/selectOptions";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import { checkUserStatus } from "../../shared/utils";

const STAGES = [
  { name: "Normal" },
  { name: "Mild Cognitive Impairment" },
  { name: "Mild Dementia" },
  { name: "Moderate Dementia" },
  { name: "Severe Dementia" },
];

function StagingFrequency() {
  // Leaving this unused code here, might come in handy for future use.
  // const [data, setData] = useState({
  //   normal: "",
  //   mildCognitiveImpairment: "",
  //   mildDimensia: "",
  //   moderateDimensia: "",
  //   severeDimensia: "",
  // });

  useEffect(() => {
    (async () => {
      await checkUserStatus();
    })();
  }, []);

  const submitHandler = (values) => {
    // eslint-disable-next-line
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form onFinish={submitHandler} className="w-full md:w-3/4 lg:w-1/2">
        <h3 className="mt-4 mb-5 text-center md:mt-0">Stages Frequency</h3>
        <div className="flex flex-col gap-3">
          {STAGES.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center"
            >
              <div className="w-full md:w-1/2">{item.name}</div>
              <div className="w-full md:w-1/2">
                <FormSelect
                  name={item.name.toLowerCase().replace(/ /g, "-")}
                  rules={[{ required: false }]}
                  options={StageFrequency.STAGEFREQUENCY}
                  placeholder="Select Frequency"
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button
            htmlType="submit"
            className="bg-primaryColor text-white h-12 mt-3 mb-2 w-1/2 rounded-md"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default StagingFrequency;
