 <h1 align="center">
   <img class="logo" src="assets/images/webp/logo_light_mode.webp" width="60px">
   <p>Nora Player</p>
 </h1>

 <div align="center">
  <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/Sandakan/Nora/total?label=all%20time%20downloads&style=for-the-badge">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/downloads/Sandakan/Nora/v1.2.0-stable/total?style=for-the-badge">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/Sandakan/Nora?color=blue&label=latest%20version&style=for-the-badge">
  <a href="https://github.com/Sandakan/Nora/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/Sandakan/Nora?style=for-the-badge"></a>
  <a href="https://github.com/Sandakan/Nora/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Sandakan/Oto-Music-for-Desktop?style=for-the-badge"></a>
 </div>

 <br/>

Nora is an elegant music player built using Electron and React, inspired by [Oto Music (Android)](https://play.google.com/store/apps/details?id=com.piyush.music&gl=us) by Piyush Mamidwar.

<br/>

![Nora Banner Artwork](/assets/other/artwork%200.webp)

<br/>

With simplicity and design in mind, this app was made to overcome problems when using default music apps on platforms that lack essential features.

<br>

It packs a horizon of features including,

- Organize your songs, artists, albums, and playlists with ease.
- Create playlists that meet your needs.
- Sing along with song lyrics[^1].
- Support for synced lyrics.
- Keep your favorite songs and artists close to you.
- Read your favorite artist's biography.
- Personalized music shuffling[^2].(Upcoming)
- Change between Light and Dark themes with ease.
- A mini-player to help focus on what matters at the moment.
- Edit the metadata of your songs easily and conveniently. (New)
- Search through your library with the help of song filters.

<br>

<div align="center"> 
  <div>
    <h3><i>" The application interface adopts rounded corners in a large area, the fonts and icons are round and cute, and the visual effect is very comfortable. "</i></h3>
    <a href="https://sspai.com/post/78669"><i>Apps Worth Watching in the Near Future &bull; SSPAI</i></a>
  </div> 
</div>

<br>

<div align="center"> &bull; &bull; &bull; </div>

<br>

<div align="center"> 
  <div>
    <h3><i>" Just found the most beautiful music player for windows: Nora "</i></h3>
    <a href="https://www.reddit.com/r/windowsapps/comments/11xgg99/just_found_the_most_beautiful_music_player_for/"><i>r/windowapps &bull; Reddit</i></a>
  </div> 
</div>

<br><br>

Visit the [release notes](/changelog.md) to see what's new on the latest release.</p>

<br>

![Support for Online and Offline Lyrics Artwork](/assets/other/artwork%201.webp)

![Switch between Dark and Light Modes Artwork](/assets/other/artwork%202.webp)

![Organize your music library with ease Artwork](/assets/other/artwork%203.webp)

![See how your favorite artists appear on songs and albums Artwork](/assets/other/artwork%204.webp)

![Keep your favorites closer to you Artwork](/assets/other/artwork%205.webp)

![Search through your music library easily and efficiently Artwork](/assets/other/artwork%206.webp)

![Edit song metadata and organize your library Artwork](/assets/other/artwork%207.webp)

![Listen with the mini player Artwork](/assets/other/artwork%208.webp)

<br/>

## Build this project on your system

<br/>

Clone the project

```bash
  git clone https://github.com/Sandakan/Nora
```

Go to the project's directory

```bash
  cd Nora
```

Install dependencies

```bash
  npm install
```

Run

```bash
  npm start
```

<br>

This project is built using [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

<br>

## Feedback

If you have any feedback about bugs, feature requests, etc. about the app, please let me know through my [email](mailto:sandakannipunajith@gmail.com).

<br>

 <center>
     Made with <span class="heart">&#10084;</span> by Sandakan Nipunajith.
    <br>
    Love Sri Lanka.
 </center>

<br>

- ##### Every song, artist, album, and song cover used in this demonstration is not owned by myself but owned by their respective owners. They were used for demonstration purposes only. I value all the copyrights of the owners of the above assets.

[^1]: song lyrics uses [SongLyrics](https://www.npmjs.com/package/songlyrics) package and an implementation from [MxLRC](https://github.com/fashni/MxLRC) package under the hood.
[^2]: personalized shuffles and playlists are generated by analyzing the user's listening patterns and no. of listens per song and using that data to personalize the songs.
