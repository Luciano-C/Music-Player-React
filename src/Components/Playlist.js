import React from "react";
import songs from "../Resources/songs";
import "../App.css";

/* [{ "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" }] */

const Playlist = () => {

    let songList = songs.map((x, i) => <li key={i}><span className="songNumber">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span><span className="songName">{x.name}</span></li>);
    

    let music = new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3");
    
    
    
    const playMusic = () => {
        
        music.play();
    }

    const pauseMusic = () => {
       
        music.pause()
        music.currentTime = 0;
    }

 

    return (
        <div className="musicPlayer">
            <ul className="playlist">
                {songList}
            </ul>
            <div className="controls">
                <i class="fas fa-caret-square-left"></i>
                <i class="fas fa-play" onClick={() => {playMusic()}}></i>
                {/* <i class="fas fa-pause-circle"></i> */}
                <i class="fas fa-caret-square-right" onClick={() => {pauseMusic()}}></i>
            </div>

        </div>
    )
}







export default Playlist;