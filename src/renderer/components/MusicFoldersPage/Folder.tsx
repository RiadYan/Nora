/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { AppUpdateContext } from 'renderer/contexts/AppUpdateContext';
import { AppContext } from 'renderer/contexts/AppContext';

import Img from '../Img';

import FolderImg from '../../../../assets/images/webp/empty-folder.webp';
import RemoveFolderConfirmationPrompt from './RemoveFolderConfirmationPrompt';
import MultipleSelectionCheckbox from '../MultipleSelectionCheckbox';
import BlacklistFolderConfrimPrompt from './BlacklistFolderConfirmPrompt';
import Button from '../Button';

type FolderProps = {
  folderPath: string;
  songIds: string[];
  subFolders?: MusicFolder[];
  isBlacklisted: boolean;
  className?: string;
  index: number;
  selectAllHandler?: (_upToId?: string) => void;
};

const Folder = (props: FolderProps) => {
  const { isMultipleSelectionEnabled, multipleSelectionsData } =
    React.useContext(AppContext);
  const {
    changeCurrentActivePage,
    updateContextMenuData,
    changePromptMenuData,
    updateMultipleSelections,
    toggleMultipleSelections,
  } = React.useContext(AppUpdateContext);

  const {
    folderPath,
    songIds,
    index,
    isBlacklisted = true,
    selectAllHandler,
    className,
    subFolders = [],
  } = props;

  const { length: noOfSongs } = songIds;

  const [isSubFoldersVisible, setIsSubFoldersVisible] = React.useState(false);

  const { folderName, prevDir } = React.useMemo(() => {
    if (folderPath) {
      const path = folderPath.split('\\');
      const name = path.pop() || folderPath;

      return { prevDir: path.join('\\'), folderName: name };
    }
    return { prevDir: undefined, folderName: undefined };
  }, [folderPath]);

  const subFoldersComponents = React.useMemo(() => {
    if (Array.isArray(subFolders) && subFolders.length > 0) {
      return subFolders.map((subFolder, i) => (
        <Folder
          index={i}
          key={subFolder.path}
          folderPath={subFolder.path}
          subFolders={subFolder.subFolders}
          isBlacklisted={subFolder.isBlacklisted}
          songIds={subFolder.songIds}
          className={`!w-full ${className}`}
        />
      ));
    }
    return [];
  }, [className, subFolders]);

  const isAMultipleSelection = React.useMemo(() => {
    if (!multipleSelectionsData.isEnabled) return false;
    if (multipleSelectionsData.selectionType !== 'folder') return false;
    if (multipleSelectionsData.multipleSelections.length <= 0) return false;
    if (
      multipleSelectionsData.multipleSelections.some(
        (selectionId) => selectionId === folderPath
      )
    )
      return true;
    return false;
  }, [multipleSelectionsData, folderPath]);

  const openMusicFolderInfoPage = React.useCallback(() => {
    if (folderPath) {
      changeCurrentActivePage('MusicFolderInfo', {
        folderPath,
      });
    }
  }, [changeCurrentActivePage, folderPath]);

  const contextMenuItems = React.useMemo((): ContextMenuItem[] => {
    const { multipleSelections: folderPaths } = multipleSelectionsData;
    const isMultipleSelectionsEnabled =
      multipleSelectionsData.selectionType === 'folder' &&
      multipleSelectionsData.multipleSelections.length !== 1 &&
      isAMultipleSelection;

    return [
      {
        label: isAMultipleSelection ? 'Unselect' : 'Select',
        iconName: 'checklist',
        handlerFunction: () => {
          if (isMultipleSelectionEnabled) {
            updateMultipleSelections(
              folderPath,
              'folder',
              isAMultipleSelection ? 'remove' : 'add'
            );
          } else
            toggleMultipleSelections(!isAMultipleSelection, 'folder', [
              folderPath,
            ]);
        },
      },
      // {
      //   label: 'Select/Unselect All',
      //   iconName: 'checklist',
      //   isDisabled: !selectAllHandler,
      //   handlerFunction: () => selectAllHandler && selectAllHandler(),
      // },
      {
        label: 'Info',
        iconName: 'info',
        handlerFunction: openMusicFolderInfoPage,
        isDisabled: isMultipleSelectionsEnabled,
      },
      {
        label: 'Hr',
        isContextMenuItemSeperator: true,
        handlerFunction: null,
      },
      {
        label: isMultipleSelectionEnabled
          ? 'Toggle blacklist Folder'
          : isBlacklisted
          ? 'Restore from Blacklist'
          : 'Blacklist Folder',
        iconName: isMultipleSelectionEnabled
          ? 'settings_backup_restore'
          : isBlacklisted
          ? 'settings_backup_restore'
          : 'block',
        handlerFunction: () => {
          if (isMultipleSelectionEnabled) {
            window.api
              .toggleBlacklistedFolders(folderPaths)
              .catch((err) => console.error(err));
          } else if (isBlacklisted)
            window.api
              .restoreBlacklistedFolders([folderPath])
              .catch((err) => console.error(err));
          else
            changePromptMenuData(
              true,
              <BlacklistFolderConfrimPrompt
                folderName={folderName}
                folderPaths={[folderPath]}
              />
            );

          toggleMultipleSelections(false, 'folder');
        },
      },
      {
        label: 'Remove Folder',
        iconName: 'delete',
        iconClassName: 'material-icons-round-outlined',
        handlerFunction: () =>
          changePromptMenuData(
            true,
            <RemoveFolderConfirmationPrompt
              folderName={folderName || folderPath}
              absolutePath={folderPath}
            />,
            'delete-folder-confirmation-prompt'
          ),
        isDisabled: isMultipleSelectionEnabled,
      },
    ];
  }, [
    changePromptMenuData,
    folderName,
    folderPath,
    isAMultipleSelection,
    isBlacklisted,
    isMultipleSelectionEnabled,
    multipleSelectionsData,
    openMusicFolderInfoPage,
    toggleMultipleSelections,
    updateMultipleSelections,
  ]);

  const contextMenuItemData = React.useMemo(
    (): ContextMenuAdditionalData =>
      isMultipleSelectionEnabled &&
      multipleSelectionsData.selectionType === 'folder' &&
      isAMultipleSelection
        ? {
            title: `${multipleSelectionsData.multipleSelections.length} selected folders`,
            artworkClassName: '!w-6',
            artworkPath: FolderImg,
          }
        : {
            title: folderName || 'Unknown Folder',
            artworkPath: FolderImg,
            artworkClassName: '!w-6',
            subTitle: `${songIds.length} songs`,
          },
    [
      folderName,
      isAMultipleSelection,
      isMultipleSelectionEnabled,
      multipleSelectionsData.multipleSelections.length,
      multipleSelectionsData.selectionType,
      songIds.length,
    ]
  );

  return (
    <div
      className={`group mb-2 flex w-full flex-col justify-between ${className}`}
    >
      <div
        className={`flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 outline-1 -outline-offset-2 transition-colors focus-visible:!outline dark:text-font-color-white ${
          isAMultipleSelection
            ? '!bg-background-color-3/90 !text-font-color-black dark:!bg-dark-background-color-3/90 dark:!text-font-color-black'
            : 'hover:!bg-background-color-2 dark:hover:!bg-dark-background-color-2'
        } ${isBlacklisted && '!opacity-50'} ${
          (index + 1) % 2 === 1
            ? 'bg-background-color-2/50 dark:bg-dark-background-color-2/40'
            : '!bg-background-color-1 dark:!bg-dark-background-color-1'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (e.getModifierState('Shift') === true && selectAllHandler)
            selectAllHandler(folderPath);
          else if (
            isMultipleSelectionEnabled &&
            multipleSelectionsData.selectionType === 'folder'
          )
            updateMultipleSelections(
              folderPath,
              'folder',
              isAMultipleSelection ? 'remove' : 'add'
            );
          else openMusicFolderInfoPage();
        }}
        onKeyDown={(e) => e.key === 'Enter' && openMusicFolderInfoPage()}
        tabIndex={0}
        title={isBlacklisted ? `'${folderName}' is blacklisted.` : undefined}
        onContextMenu={(e) =>
          updateContextMenuData(
            true,
            contextMenuItems,
            e.pageX,
            e.pageY,
            contextMenuItemData
          )
        }
      >
        <div className="folder-img-and-info-container flex items-center">
          {multipleSelectionsData.selectionType === 'folder' ? (
            <div className="relative ml-1 mr-4 flex h-fit items-center rounded-lg bg-background-color-1 p-1 text-font-color-highlight dark:bg-dark-background-color-1 dark:text-dark-background-color-3">
              <MultipleSelectionCheckbox
                id={folderPath}
                selectionType="folder"
              />
            </div>
          ) : (
            <div className="relative ml-1 mr-4 h-fit rounded-2xl bg-background-color-1 px-3 text-font-color-highlight group-even:bg-background-color-2/75 group-hover:bg-background-color-1 dark:bg-dark-background-color-1 dark:text-dark-background-color-3 dark:group-even:bg-dark-background-color-2/50 dark:group-hover:bg-dark-background-color-1">
              {index + 1}
            </div>
          )}
          <Img src={FolderImg} className="w-8 self-center" />
          <div className="folder-info ml-6 flex flex-col">
            <span className="folder-name" title={`${prevDir}\${folderName}`}>
              {folderName}
            </span>
            <div className="flex items-center opacity-75">
              <span className="no-of-songs mr-2 text-xs font-thin">
                {noOfSongs} song{noOfSongs === 1 ? '' : 's'}
              </span>
              <span className="invisible text-xs font-thin opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
                &bull;
                <span className="folder-path ml-2">{prevDir}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="folder-states-container flex">
          {isBlacklisted && (
            <span
              className="material-icons-round-outlined text-2xl"
              title="This folder is blacklisted."
            >
              block
            </span>
          )}
          {subFolders.length > 0 && (
            <Button
              className="ml-4 !rounded-full !border-none !p-1 group-hover:bg-background-color-1 dark:group-hover:bg-dark-background-color-1"
              iconClassName="!text-2xl !leading-none"
              iconName={
                isSubFoldersVisible ? 'arrow_drop_up' : 'arrow_drop_down'
              }
              clickHandler={(e) => {
                e.stopPropagation();
                setIsSubFoldersVisible((state) => !state);
              }}
            />
          )}
        </div>
      </div>
      {subFolders.length > 0 && isSubFoldersVisible && (
        <div className="ml-4 mt-4 border-l-[3px] border-background-color-2 pl-4 dark:border-dark-background-color-2/50">
          {subFoldersComponents}
        </div>
      )}
    </div>
  );
};

export default Folder;
