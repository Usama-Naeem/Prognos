import React, { useEffect, useState } from "react";
import { FormBuilder, Form } from "@formio/react";
import { Card } from "react-bootstrap";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { initialState } from "../../shared/constant/FormBuilderConstants";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import "./FormBuilder.css";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { checkUserStatus } from "../../shared/utils";

const CustomBuilder = () => {
  const [jsonSchema, setJsonSchema] = useState(null);
  const { id: questionnaireId } = useParams();

  useEffect(() => {
    (async () => {
      await checkUserStatus();
    })();
  }, []);

  const getForm = async () => {
    try {
      const response = await API.graphql({
        query: queries.getPrognosQuestionnaire,
        variables: { id: questionnaireId },
        authMode: "API_KEY",
      });
      const questionnaire = response.data.getPrognosQuestionnaire;
      if (questionnaire) {
        const schema = {
          ...questionnaire,
          components:
            questionnaire.components.length !== 0
              ? JSON.parse(questionnaire.components)
              : questionnaire.components,
        };
        setJsonSchema(schema);
      } else {
        setJsonSchema(initialState);
      }
    } catch (err) {
      throw Error(err.errors[0].message);
    }
  };

  useEffect(() => {
    getForm();
    setJsonSchema(null);
  }, [questionnaireId]);

  const updateSchema = (schema) => {
    setJsonSchema((prevSchema) => ({
      ...prevSchema,
      components: schema.components,
    }));
  };

  const saveForm = async () => {
    try {
      const {
        id,
        name,
        display,
        type,
        order,
        components: formComponents,
      } = jsonSchema;
      const input = {
        id,
        name,
        display,
        type,
        order,
        components: [JSON.stringify(formComponents)],
      };
      // Save Questionnaire
      await API.graphql({
        query: mutations.updatePrognosQuestionnaire,
        variables: {
          input,
        },
        authMode: "API_KEY",
      });
      message.success("Questionnaire saved successfully");
    } catch (error) {
      message.error("Something went wrong");
      throw Error(error.errors[0].message);
    }
  };
  return (
    <div>
      {jsonSchema ? (
        <div>
          <FormBuilder
            form={jsonSchema}
            options={{ builder: { premium: false } }}
            onChange={updateSchema}
          />

          <div className="row pt-5">
            <button
              className="col-6 offset-3 btn btn-success"
              onClick={saveForm}
            >
              Save
            </button>
          </div>
          <div>
            <Card className="my-4">
              <Card.Body>
                <Card.Title>Form Render</Card.Title>
                <Form form={jsonSchema} />
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner className={darkColorSpinner} />
        </div>
      )}
    </div>
  );
};

export default CustomBuilder;
