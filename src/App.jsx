import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import "./App.css";

import song1 from "./song/song1.mp3";
import song2 from "./song/song2.mp3";
import song3 from "./song/song3.mp3";
import song4 from "./song/song4.mp3";
import song5 from "./song/song5.mp3";

import img1 from "./song/her.jpg";
import img2 from "./song/jump.jpeg";
import img3 from "./song/like.jpg";
import img4 from "./song/sticky.webp";
import img5 from "./song/lotte.jpg";

const songs = [
  { title: "노래 1", src: song1, image: img1 },
  { title: "노래 2", src: song2, image: img2 },
  { title: "노래 3", src: song3, image: img3 },
  { title: "노래 4", src: song4, image: img4 },
  { title: "노래 5", src: song5, image: img5 }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex]);

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const getClassName = (index) => {
    if (index === currentIndex) return "song-card card-center";
    if (index === (currentIndex - 1 + songs.length) % songs.length)
      return "song-card card-left";
    if (index === (currentIndex + 1) % songs.length)
      return "song-card card-right";
    return "song-card card-hidden";
  };

  const submitSong = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "YOUR_SERVICE_ID",   // EmailJS 서비스 ID
      "YOUR_TEMPLATE_ID",  // EmailJS 템플릿 ID
      formRef.current,
      "YOUR_PUBLIC_KEY"    // EmailJS Public Key
    )
    .then(() => {
      alert("노래가 제출되었습니다!");
      setShowForm(false);
      formRef.current.reset();
    })
    .catch((err) => {
      alert("오류가 발생했습니다: " + err.text);
    });
  };

  return (
    <div className="player-container">
      {/* 노래 접수 버튼 */}
      <button
        className="submit-button"
        onClick={() => setShowForm(true)}
      >
        노래 접수하기
      </button>

      {/* 제출 폼 모달 */}
      {showForm && (
        <div className="modal">
          <form ref={formRef} onSubmit={submitSong} className="form-content">
            <h2>노래 접수</h2>
            <label>노래 이름:</label>
            <input type="text" name="songName" required />
            <label>가수:</label>
            <input type="text" name="artist" required />
            <div className="form-buttons">
              <button type="submit">제출</button>
              <button type="button" onClick={() => setShowForm(false)}>닫기</button>
            </div>
          </form>
        </div>
      )}

      {/* 노래 카드 */}
      {songs.map((song, index) => (
        <div
          key={index}
          className={getClassName(index)}
          onClick={() => {
            if (index === currentIndex) {
              togglePlay();
            } else if (index === (currentIndex - 1 + songs.length) % songs.length) {
              prevSong();
            } else if (index === (currentIndex + 1) % songs.length) {
              nextSong();
            }
          }}
        >
          <img src={song.image} alt="" />
          <p>{song.title}</p>
          {index === currentIndex && (
            <audio
              ref={audioRef}
              controls
              onEnded={nextSong}
            >
              <source src={song.src} type="audio/mp3" />
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}
