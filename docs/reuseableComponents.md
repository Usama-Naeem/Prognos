*This specific document contains all the reuseable components that we have in our app*
## FormInput component
### Location
This component is located in /src/shared/components/FormInput/FormInput.jsx
### Props
This component take props like **name, type, rules = {}, placeholder**
1. Name can be your table field like **Age, email**
2. Type can be normally **string, number, boolean, url or email**
3. Rules are ant design form validation rules. 
[Ant Design rules](https://ant.design/components/form#Rule)
4. The placeholder attribute specifies a short hint that describes the expected value of an input field
### Where to use
This component is used for any type of Form input like **email, password, name, age** etc

### Usage
For example, if we want to use this component for email, then we have to pass following props to the FormInput component
 <FormInput
          name="email"
          type="email"
          rule={FormRule.EMAIL}
          placeholder="Email"
        />

## ApiErrorMessage
### Location
This component is located in src/shared/components/ApiErrorMessage/ApiErrorMessage.jsx
### Props
errorMessage can be string.
### Where to use
This component is used to display any type of Api errors 

### Usage
Parent component will fetch all api errors and send these errors as props to ApiErrorMessage component.

<ApiErrorMessage errorMessage={errorMessage} />