/* eslint-disable promise/catch-or-return */
import React from 'react';
import { AppContext } from 'renderer/contexts/AppContext';
import { AppUpdateContext } from 'renderer/contexts/AppUpdateContext';

import useNetworkConnectivity from 'renderer/hooks/useNetworkConnectivity';
import hasDataChanged, { isDataChanged } from 'renderer/utils/hasDataChanged';

import Button from '../Button';
import MainContainer from '../MainContainer';
import SongMetadataResultsSelectPage from './SongMetadataResultsSelectPrompt';
import SongArtwork from './SongArtwork';
import SongNameInput from './input_containers/SongNameInput';
import SongYearInput from './input_containers/SongYearInput';
import SongArtistsInput from './input_containers/SongArtistsInput';
import SongAlbumInput from './input_containers/SongAlbumInput';
import SongGenresInput from './input_containers/SongGenresInput';
import SongComposerInput from './input_containers/SongComposerInput';
import SongLyricsEditor from './input_containers/SongLyricsEditor';

import { appPreferences } from '../../../../package.json';

export interface MetadataKeywords {
  albumKeyword?: string;
  artistKeyword?: string;
  genreKeyword?: string;
}

const { metadataEditingSupportedExtensions } = appPreferences;

function SongTagsEditingPage() {
  const { currentlyActivePage, currentSongData } = React.useContext(AppContext);
  const {
    addNewNotifications,
    changePromptMenuData,
    updateCurrentSongData,
    updatePageHistoryIndex,
  } = React.useContext(AppUpdateContext);

  const { isOnline } = useNetworkConnectivity();

  const [songInfo, setSongInfo] = React.useState({
    title: '',
  } as SongTags);
  const [defaultValues, setDefaultValues] = React.useState({
    title: '',
  } as SongTags);

  const { songId, songPath, isKnownSource } = React.useMemo(
    () => ({
      songId: currentlyActivePage.data.songId as string,
      songPath: currentlyActivePage.data.songPath as string,
      isKnownSource:
        (currentlyActivePage.data.isKnownSource as boolean) ?? true,
    }),
    [currentlyActivePage.data]
  );

  const pathExt = React.useMemo(
    () => window.api.getExtension(songPath),
    [songPath]
  );

  const isMetadataEditingSupported = React.useMemo(() => {
    const isASupportedFormat =
      metadataEditingSupportedExtensions.includes(pathExt);

    return isASupportedFormat;
  }, [pathExt]);

  React.useEffect(() => {
    if (songId)
      window.api
        .getSongId3Tags(isKnownSource ? songId : songPath, isKnownSource)
        .then((res) => {
          if (res) {
            console.log(res);
            const data = {
              ...res,
              title: res.title,
            };

            setDefaultValues(data);
            setSongInfo(data);
          }
          return undefined;
        })
        .catch((err) => console.error(err));
  }, [isKnownSource, songId, songPath]);

  const [artistKeyword, setArtistKeyword] = React.useState('');
  const [artistResults, setArtistResults] = React.useState(
    [] as {
      artistId?: string;
      name: string;
      artworkPath?: string;
      onlineArtworkPaths?: OnlineArtistArtworks;
    }[]
  );

  const [albumKeyword, setAlbumKeyword] = React.useState('');
  const [albumResults, setAlbumResults] = React.useState(
    [] as {
      title: string;
      albumId?: string;
      noOfSongs?: number;
      artists?: string[];
      artworkPath?: string;
    }[]
  );

  const [genreKeyword, setGenreKeyword] = React.useState('');
  const [genreResults, setGenreResults] = React.useState(
    [] as { genreId?: string; name: string; artworkPath?: string }[]
  );

  React.useEffect(() => {
    if (artistKeyword.trim()) {
      window.api
        .search('Artists', artistKeyword, false)
        .then((res) => {
          console.log(res);
          if (res.artists.length > 0)
            setArtistResults(
              res.artists
                .filter((_, index) => index < 5)
                .map((artist) => ({
                  name: artist.name,
                  artistId: artist.artistId,
                  artworkPaths: artist.artworkPaths,
                  onlineArtworkPaths: artist.onlineArtworkPaths,
                }))
            );
          else setArtistResults([]);
          return undefined;
        })
        .catch((err) => console.error(err));
    } else setArtistResults([]);
  }, [artistKeyword]);

  React.useEffect(() => {
    if (albumKeyword.trim()) {
      window.api
        .search('Albums', albumKeyword, false)
        .then((res) => {
          console.log(res);
          if (res.albums.length > 0)
            setAlbumResults(
              res.albums
                .filter((_, index) => index < 5)
                .map((album) => ({
                  title: album.title,
                  albumId: album.albumId,
                  noOfSongs: album.songs.length,
                  artworkPath: album?.artworkPaths?.artworkPath,
                }))
            );
          else setAlbumResults([]);
          return undefined;
        })
        .catch((err) => console.error(err));
    } else setAlbumResults([]);
  }, [albumKeyword]);

  React.useEffect(() => {
    if (genreKeyword.trim()) {
      window.api
        .search('Genres', genreKeyword, false)
        .then((res) => {
          console.log(res);
          if (res.genres.length > 0)
            setGenreResults(
              res.genres
                .filter((_, index) => index < 5)
                .map((genre) => ({
                  name: genre.name,
                  genreId: genre.genreId,
                  artworkPaths: genre.artworkPaths,
                }))
            );
          else setGenreResults([]);
          return undefined;
        })
        .catch((err) => console.error(err));
    } else setGenreResults([]);
  }, [genreKeyword]);

  const updateSongInfo = React.useCallback(
    (callback: (prevData: SongTags) => SongTags) => {
      const updatedData = callback(songInfo);
      setSongInfo(updatedData);
    },
    [songInfo]
  );

  const updateArtistKeyword = React.useCallback(
    (keyword: string) => setArtistKeyword(keyword),
    []
  );
  const updateAlbumKeyword = React.useCallback(
    (keyword: string) => setAlbumKeyword(keyword),
    []
  );
  const updateGenreKeyword = React.useCallback(
    (keyword: string) => setGenreKeyword(keyword),
    []
  );

  // const updateMetadataKeywords = React.useCallback(
  //   (metadataKeywords: MetadataKeywords) => {
  //     if (metadataKeywords.albumKeyword)
  //       setAlbumKeyword(metadataKeywords.albumKeyword);
  //     if (metadataKeywords.artistKeyword)
  //       setArtistKeyword(metadataKeywords.artistKeyword);
  //     if (metadataKeywords.genreKeyword)
  //       setGenreKeyword(metadataKeywords.genreKeyword);
  //   },
  //   []
  // );

  const fetchSongDataFromNet = React.useCallback(() => {
    if (songInfo.title) {
      changePromptMenuData(
        true,
        <SongMetadataResultsSelectPage
          songTitle={songInfo.title}
          songArtists={songInfo.artists?.map((x) => x.name) ?? []}
          updateSongInfo={updateSongInfo}
        />
      );
    }
  }, [songInfo.title, songInfo.artists, changePromptMenuData, updateSongInfo]);

  const saveTags = (
    _: unknown,
    setIsDisabled: (state: boolean) => void,
    setIsPending: (state: boolean) => void
  ) => {
    setIsDisabled(true);
    setIsPending(true);
    console.log(songInfo);
    window.api
      .updateSongId3Tags(
        isKnownSource ? songId : songPath,
        songInfo,
        songId === currentSongData.songId,
        isKnownSource
      )
      .then((res) => {
        if (res.success) {
          console.log('successfully updated the song.', res);
          if (res.updatedData && songId === currentSongData.songId) {
            const { updatedData } = res;
            updateCurrentSongData((prevData) => ({
              ...prevData,
              ...updatedData,
            }));
          }
          addNewNotifications([
            {
              id: `songDataUpdated`,
              delay: 5000,
              content: <span>Successfully updated the song.</span>,
              icon: <span className="material-icons-round icon">done</span>,
            },
          ]);
          return window.api.getSongId3Tags(
            isKnownSource ? songId : songPath,
            isKnownSource
          );
        }
        throw new Error('Error ocurred when updating song ID3 tags.');
      })
      .then((res) => {
        setSongInfo(res);
        setDefaultValues(res);
        return undefined;
      })
      .catch((err) => {
        addNewNotifications([
          {
            id: `songDataUpdateFailed`,
            delay: 5000,
            content: <span>Song data update failed.</span>,
            icon: (
              <span className="material-icons-round-outlined icon">
                warning
              </span>
            ),
          },
        ]);
        console.error(err);
      })
      .finally(() => {
        setIsDisabled(false);
        setIsPending(false);
      });
  };

  const resetDataToDefaults = () => {
    const data = hasDataChanged(defaultValues, songInfo);
    const entries = Object.entries(data);
    if (!Object.values(data).every((x: boolean) => !x)) {
      changePromptMenuData(
        true,
        <div>
          <div className="title-container mb-8 mt-1 flex items-center pr-4 text-3xl font-medium text-font-color-black dark:text-font-color-white">
            Confrim Before Resetting Song Data to Default
          </div>
          <div className="description">
            Are you sure you want to reset the song data. You will lose the data
            you edited on this screen.
          </div>
          <div className="mt-4 pl-4">
            {(entries.filter((x) => x[1]) ?? []).map(([x]) => (
              <div>
                {x.toUpperCase()} :
                <span className="ml-2 font-medium text-font-color-crimson">
                  CHANGED
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              label="Cancel"
              className="w-32"
              clickHandler={() => changePromptMenuData(false)}
            />
            <Button
              label="Reset to Default"
              className="w-[12rem] !bg-background-color-3 !text-font-color-black hover:border-background-color-3 dark:!bg-dark-background-color-3 dark:text-font-color-black dark:hover:border-background-color-3"
              clickHandler={() => {
                changePromptMenuData(false);
                setSongInfo(defaultValues);
                setAlbumKeyword('');
                setAlbumResults([]);
                setArtistKeyword('');
                setArtistResults([]);
                setGenreKeyword('');
                setGenreResults([]);
              }}
            />
          </div>
        </div>
      );
    } else {
      addNewNotifications([
        {
          id: 'songDataUnedited',
          delay: 5000,
          content: <span>You didn't change any song data.</span>,
        },
      ]);
    }
  };

  const areThereDataChanges = React.useMemo(
    () => isDataChanged(defaultValues, songInfo),
    [defaultValues, songInfo]
  );

  const songNameFromPath = React.useMemo(() => {
    if (songPath) {
      const fileName = songPath.split('\\').at(-1);
      if (fileName) return fileName?.replace(/\.\w{3,5}$/gm, '');
    }
    return 'Unknown Title';
  }, [songPath]);

  return (
    <MainContainer className="main-container appear-from-bottom id3-tags-updater-container h-full">
      <>
        {(songId || songPath) && isMetadataEditingSupported && (
          <>
            <div className="title-container mb-8 mt-1 flex items-center pr-4 text-3xl font-medium text-font-color-highlight dark:text-dark-font-color-highlight">
              Song Metadata Editor{' '}
              {!isKnownSource && (
                <span
                  className="material-icons-round-outlined ml-6 cursor-help text-xl hover:underline"
                  title="You are editing a song outside the library."
                >
                  error
                </span>
              )}
            </div>
            <div className="song-information-container bl-4 mb-12 flex text-font-color-black dark:text-font-color-white">
              <SongArtwork
                artworkPath={songInfo.artworkPath}
                updateSongInfo={updateSongInfo}
              />
              <div className="song-info-container flex w-[70%] flex-col justify-center">
                <div className="song-title mb-2 text-4xl">
                  {songInfo.title || songNameFromPath}
                  {!isKnownSource && (
                    <span
                      className="material-icons-round-outlined ml-6 cursor-help text-2xl text-font-color-highlight hover:underline dark:text-dark-font-color-highlight"
                      title="You are editing a song outside the library."
                    >
                      error
                    </span>
                  )}
                </div>
                <div className="song-artists">
                  {songInfo.artists && songInfo.artists.length > 0
                    ? songInfo.artists.map((x) => x.name).join(', ')
                    : 'Unknown Artist'}
                </div>
                <div className="song-album">{songInfo.album?.title}</div>
                <Button
                  label="Search Metadata on Internet"
                  iconName="download"
                  iconClassName="mr-2"
                  className="download-data-from-lastfm-btn mt-4 w-fit"
                  clickHandler={fetchSongDataFromNet}
                  tooltipLabel={
                    isOnline
                      ? undefined
                      : 'You are not connected to the internet.'
                  }
                  isDisabled={!isOnline}
                />
              </div>
            </div>
            <div className="inputs-container flex flex-wrap justify-around text-font-color-black dark:text-font-color-white">
              <SongNameInput
                songTitle={songInfo.title}
                updateSongInfo={updateSongInfo}
              />
              <SongYearInput
                songYear={songInfo.releasedYear}
                updateSongInfo={updateSongInfo}
              />
              {/* ? SONG ARTSITS */}
              <SongArtistsInput
                artistResults={artistResults}
                artistKeyword={artistKeyword}
                songArtists={songInfo.artists}
                updateArtistKeyword={updateArtistKeyword}
                updateSongInfo={updateSongInfo}
              />
              {/* ALBUM NAME */}
              <SongAlbumInput
                albumKeyword={albumKeyword}
                albumResults={albumResults}
                updateAlbumKeyword={updateAlbumKeyword}
                updateSongInfo={updateSongInfo}
                songAlbum={songInfo.album}
              />
              {/* SONG GENRES */}
              <SongGenresInput
                songGenres={songInfo.genres}
                genreKeyword={genreKeyword}
                genreResults={genreResults}
                updateSongInfo={updateSongInfo}
                updateGenreKeyword={updateGenreKeyword}
              />
              {/* SONG COMPOSER NAME */}
              <SongComposerInput
                songComposer={songInfo.composer}
                updateSongInfo={updateSongInfo}
              />
              <hr className="horizontal-rule my-8 h-[0.1rem] w-[95%] border-0 bg-background-color-2 dark:bg-dark-background-color-2" />
              {/* SONG LYRICS EDITOR */}
              <SongLyricsEditor
                songTitle={songInfo.title}
                songArtists={songInfo.artists}
                songPath={songPath}
                duration={songInfo.duration}
                songLyrics={songInfo.lyrics}
                updateSongInfo={updateSongInfo}
              />
            </div>
            <div className="id3-control-buttons-container flex p-4">
              <Button
                key={0}
                label="Save Tags"
                iconName="save"
                iconClassName="material-icons-round-outlined"
                isDisabled={!areThereDataChanges}
                className="update-song-tags-btn"
                clickHandler={saveTags}
              />
              <Button
                key={1}
                label="Reset to Defaults"
                iconName="restart_alt"
                className="reset-song-tags-btn"
                isDisabled={!areThereDataChanges}
                clickHandler={resetDataToDefaults}
              />
            </div>
          </>
        )}

        {!isMetadataEditingSupported && (
          <div className="flex !h-full flex-col items-center justify-center dark:text-white/80">
            <span className="material-icons-round-outlined text-6xl">
              campaign
            </span>
            <p className="mt-2 text-2xl">No Support</p>
            <p
              className="mt-4 cursor-pointer text-xs font-light opacity-50"
              title={window.api.removeDefaultAppProtocolFromFilePath(songPath)}
            >
              {window.api.getBaseName(songPath)}
            </p>
            <p className="mt-2 px-8 font-light">
              Nora currently doesn't support editing song metadata in{' '}
              <span className="font-medium text-font-color-highlight dark:text-dark-font-color-highlight">
                {pathExt}
              </span>{' '}
              format.
            </p>
            <p className="px-8 font-light">
              Currently only{' '}
              <span className="font-medium text-font-color-highlight dark:text-dark-font-color-highlight">
                mp3
              </span>{' '}
              format is supported.
            </p>
            <Button
              label="Go Back"
              iconName="arrow_back"
              className="mt-4"
              clickHandler={() => updatePageHistoryIndex('decrement')}
            />
          </div>
        )}
      </>
    </MainContainer>
  );
}

export default SongTagsEditingPage;
