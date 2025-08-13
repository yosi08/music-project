import React, { useState } from "react";
import "./App.css";

import song1 from "./song/song1.mp3";
import song2 from "./song/song2.mp3";
import song3 from "./song/song3.mp3";
import song4 from "./song/song4.mp3";

import img1 from "./song/her.jpg";
import img2 from "./song/jump.jpeg";
import img3 from "./song/like.jpg";
import img4 from "./song/sticky.webp";

const songs = [
  { title: "노래 1", src: song1, image: img1 },
  { title: "노래 2", src: song2, image: img2 },
  { title: "노래 3", src: song3, image: img3 },
  { title: "노래 4", src: song4, image: img4 },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <div className="player-container">
      <div
        className="song-card side"
        onClick={prevSong}
      >
        <img
          src={songs[(currentIndex - 1 + songs.length) % songs.length].image}
          alt=""
        />
        <p>{songs[(currentIndex - 1 + songs.length) % songs.length].title}</p>
      </div>

      <div className="song-card active">
        <img src={songs[currentIndex].image} alt="" />
        <p>{songs[currentIndex].title}</p>
        <audio controls src={songs[currentIndex].src}></audio>
      </div>

      <div
        className="song-card side"
        onClick={nextSong}
      >
        <img
          src={songs[(currentIndex + 1) % songs.length].image}
          alt=""
        />
        <p>{songs[(currentIndex + 1) % songs.length].title}</p>
      </div>
    </div>
  );
}