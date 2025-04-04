/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { type KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import storage from '../../../utils/localStorage';

import Img from '../../Img';

import HomeImgLight from '../../../assets/images/webp/home-skeleton-light.webp';
import HomeImgDark from '../../../assets/images/webp/home-skeleton-dark.webp';
import HomeImgLightDark from '../../../assets/images/webp/home-skeleton-light-dark.webp';
import Checkbox from '../../Checkbox';
import DynamicThemeSettings from './DynamicThemeSettings';
import { useStore } from '@tanstack/react-store';
import { store } from '@renderer/store';

const ThemeSettings = () => {
  const userData = useStore(store, (state) => state.userData);
  const currentSongData = useStore(store, (state) => state.currentSongData);
  const preferences = useStore(store, (state) => state.localStorage.preferences);

  const { t } = useTranslation();

  const [theme, setTheme] = useState(userData?.theme);

  const fetchUserData = useCallback(
    () =>
      window.api.userData
        .getUserData()
        .then((res) => setTheme(res?.theme))
        .catch((err) => console.error(err)),
    []
  );

  useEffect(() => {
    fetchUserData();
    const manageUserDataUpdatesInSettingsPage = (e: Event) => {
      if ('detail' in e) {
        const dataEvents = (e as DetailAvailableEvent<DataUpdateEvent[]>).detail;
        for (let i = 0; i < dataEvents.length; i += 1) {
          const event = dataEvents[i];
          if (event.dataType.includes('userData')) fetchUserData();
        }
      }
    };
    document.addEventListener('app/dataUpdates', manageUserDataUpdatesInSettingsPage);
    return () => {
      document.removeEventListener('app/dataUpdates', manageUserDataUpdatesInSettingsPage);
    };
  }, [fetchUserData]);

  const focusInput = useCallback((e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      const inputId = e.currentTarget.htmlFor;
      const inputElement = document.getElementById(inputId);
      inputElement?.click();
    }
  }, []);

  return theme ? (
    <li className="main-container appearance-settings-container mb-16">
      <div className="title-container mb-4 mt-1 flex items-center text-2xl font-medium text-font-color-highlight dark:text-dark-font-color-highlight">
        <span className="material-icons-round-outlined mr-2">dark_mode</span>
        {t('settingsPage.appearance')}
      </div>
      <ul className="list-disc pl-6 marker:bg-font-color-highlight dark:marker:bg-dark-font-color-highlight">
        <li>
          <div className="description">{t('settingsPage.changeTheme')}</div>
          <div className="theme-change-radio-btns flex max-w-3xl items-center justify-between pl-4 pt-4">
            <label
              htmlFor="lightThemeRadioBtn"
              tabIndex={0}
              className={`theme-change-radio-btn mb-2 flex cursor-pointer flex-col items-center rounded-md bg-background-color-2/75 p-6 outline-2 outline-offset-1 focus-within:!outline hover:bg-background-color-2 dark:bg-dark-background-color-2/75 dark:hover:bg-dark-background-color-2 ${
                !theme.useSystemTheme &&
                !theme.isDarkMode &&
                '!bg-background-color-3 dark:!bg-dark-background-color-3'
              }`}
              onKeyDown={focusInput}
            >
              <input
                type="radio"
                name="theme"
                className="peer invisible absolute -left-[9999px] mr-4"
                value="lightTheme"
                id="lightThemeRadioBtn"
                defaultChecked={!theme.useSystemTheme && !theme.isDarkMode}
                onClick={() => window.api.theme.changeAppTheme('light')}
              />
              <Img loading="eager" src={HomeImgLight} className="h-24 w-40 shadow-md" />
              <span className="mt-4 peer-checked:!text-font-color-black dark:peer-checked:!text-font-color-black">
                {t('settingsPage.lightTheme')}
              </span>
            </label>

            <label
              htmlFor="darkThemeRadioBtn"
              tabIndex={0}
              className={`theme-change-radio-btn mb-2 flex cursor-pointer flex-col items-center rounded-md bg-background-color-2/75 p-6 outline-2 outline-offset-1 focus-within:!outline hover:bg-background-color-2 dark:bg-dark-background-color-2/75 dark:hover:bg-dark-background-color-2 ${
                !theme.useSystemTheme &&
                theme.isDarkMode &&
                '!bg-background-color-3 dark:!bg-dark-background-color-3'
              }`}
              onKeyDown={focusInput}
            >
              <input
                type="radio"
                name="theme"
                className="peer invisible absolute -left-[9999px] mr-4"
                value="darkTheme"
                id="darkThemeRadioBtn"
                defaultChecked={!theme.useSystemTheme && theme.isDarkMode}
                onClick={() => window.api.theme.changeAppTheme('dark')}
              />
              <Img loading="eager" src={HomeImgDark} className="h-24 w-40 shadow-md" />
              <span className="mt-4 peer-checked:!text-font-color-black dark:peer-checked:!text-font-color-black">
                {t('settingsPage.darkTheme')}
              </span>
            </label>

            <label
              htmlFor="systemThemeRadioBtn"
              tabIndex={0}
              className={`theme-change-radio-btn hover:bg-background-color mb-2 flex cursor-pointer flex-col items-center rounded-md bg-background-color-2/75 p-6 outline-2 outline-offset-1 focus-within:!outline dark:bg-dark-background-color-2/75 dark:hover:bg-dark-background-color-2 ${
                theme.useSystemTheme && '!bg-background-color-3 dark:!bg-dark-background-color-3'
              } `}
              onKeyDown={focusInput}
            >
              <input
                type="radio"
                name="theme"
                className="peer invisible absolute -left-[9999px] mr-4"
                value="systemTheme"
                id="systemThemeRadioBtn"
                defaultChecked={theme.useSystemTheme}
                onClick={() => window.api.theme.changeAppTheme('system')}
              />
              <Img loading="eager" src={HomeImgLightDark} className="h-24 w-40 shadow-md" />
              <span className="mt-4 peer-checked:!text-font-color-black dark:peer-checked:!text-font-color-black">
                {t('settingsPage.systemTheme')}
              </span>
            </label>
          </div>
        </li>
        <li className="secondary-container enable-image-based-dynamic-themes mb-4">
          <div className="description">
            {t('settingsPage.enableImageBasedDynamicThemesDescription')}
          </div>
          <Checkbox
            id="toggleEnableImageBasedDynamicThemes"
            isChecked={preferences?.enableImageBasedDynamicThemes}
            checkedStateUpdateFunction={(state) =>
              storage.preferences.setPreferences('enableImageBasedDynamicThemes', state)
            }
            labelContent={t('settingsPage.enableImageBasedDynamicThemes')}
          />
          {preferences?.enableImageBasedDynamicThemes && currentSongData.paletteData && (
            <DynamicThemeSettings palette={currentSongData.paletteData} />
          )}
        </li>
      </ul>
    </li>
  ) : null;
};

export default ThemeSettings;
