import { useTranslation } from "react-i18next";

export default function LngToggle() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === "en";
  const toggleLanguage = () => {
    i18n.changeLanguage(isEnglish ? "ar" : "en");
  };

  return (
    <>
      <button onClick={toggleLanguage} aria-label="">
        {isEnglish ? "Ar" : "En"}
      </button>
    </>
  );
}
