import React, { useState, useEffect } from "react";
import songs from "../Resources/songs";
import logo from "../logo.JPG"

/* [{ "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" }] */

const Playlist = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [audio] = useState(new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"));
    const [isSongPlaying, setIsSongPlaying] = useState(false);

    audio.onended = () => {
        stopMusic();
    };

    let songListHTML = songs.map((x, i) => <li key={i} onClick={() => { clickHandler(i) }}><span className="songNumber">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span><span className="songName">{x.name}</span></li>);

    useEffect(() => {
        pauseMusic();
        audio.src = currentSong.url;
        playMusic();
    }, [currentSong]);


    const clickHandler = (i) => {
        setCurrentSong(songs[i]);
    }



    const playMusic = () => {
        audio.play();
        setIsSongPlaying(true);
    }

    const pauseMusic = () => {
        audio.pause();
        setIsSongPlaying(false);
    };

    const stopMusic = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsSongPlaying(false);
    };

    const nextSong = () => {
        let currentIndex = songs.indexOf(currentSong);
        currentIndex < songs.length -1 ? setCurrentSong(songs[currentIndex + 1]) : setCurrentSong(songs[0]);
    };

    const prevSong = () => {
        let currentIndex = songs.indexOf(currentSong);
        currentIndex === 0 ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[currentIndex - 1]);
    }



    return (
        <div className="musicPlayer">
            <img id="logo" src={logo} alt="sloth logo" />
            <ul className="playlist">
                {songListHTML}
            </ul>
            <div className="controls">
                <i className="fas fa-caret-square-left" onClick={() => {prevSong()}}></i>
                {isSongPlaying === true ? <i className="fas fa-pause-circle" onClick={() => { pauseMusic() }}></i> : <i className="fas fa-play" onClick={() => { playMusic() }}></i>}

                <i className="fas fa-caret-square-right" onClick={() => nextSong()}></i>
            </div>
        </div>
    )
}







export default Playlist;