import React from "react";
import { useTranslation } from "react-i18next";
import SimpleSelect from "../../shared/components/SimpleSelect/SimpleSelect";
import { LanguageSelectOptions } from "../../shared/enum/selectOptions";

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  // setting the language of the app
  const handleChange = (language) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem("lang", language);
  };

  return (
    <>
      <span className="hidden pr-2 text-white sm:block ">{t("language")}</span>
      <SimpleSelect
        options={LanguageSelectOptions.LANGUAGES}
        className="bg-transparent"
        defaultValue={window.localStorage.getItem("lang") || "en"}
        size="small"
        onChangeHandler={handleChange}
      />
    </>
  );
}

export default LanguageSelector;
