import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // persiste la langue
  };

  return (
    <select
      className="language-switcher"
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n.language}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}

export default LanguageSwitcher;