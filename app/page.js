// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import Head from "next/head";
import ThreeScene from "../components/ThreeScene";
import Modal from "../components/Modal";

const HomePage = () => {
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Initially playing
  const [volume, setVolume] = useState(0.5); // Initial volume value

  useEffect(() => {
    // Initialize Howler
    const themeMusic = new Howl({
      src: ["/themesong.mp3"], // Replace with the actual path to your theme music
      loop: true, // Loop the music continuously
      volume: volume, // Set the initial volume
    });

    if (isPlaying) {
      themeMusic.play();
    } else {
      themeMusic.pause();
    }

    // Cleanup function
    return () => {
      // Stop and unload the theme music when the component unmounts
      themeMusic.stop();
      themeMusic.unload();
    };
  }, [isPlaying, volume]);

  useEffect(() => {
    if (modalIndex < 4) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [modalIndex]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalIndex < 3) {
      setModalIndex(modalIndex + 1);
    }
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  return (
    <div>
      <ThreeScene />

      {/* Play/Pause Button */}
      <button
        id="musicButton"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          bottom: "33px",
          left: "90%",
          transform: "translateX(-50%)",
        }}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <img src="/pause.png" alt="Pause" />
        ) : (
          <img src="/play.png" alt="Play" />
        )}
      </button>

      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="sliderBlack"
        style={{
          position: "absolute",
          bottom: "21px",
          left: "83.5%",
          transform: "translateX(50%)",
        }}
      />

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalIndex={modalIndex}
      />
    </div>
  );
};

export default HomePage;
