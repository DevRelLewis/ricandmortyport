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

  useEffect(() => {
    // Initialize Howler
    const themeMusic = new Howl({
      src: ["/themesong.mp3"], // Replace with the actual path to your theme music
      loop: true, // Loop the music continuously
      volume: 0.5, // Adjust the volume as needed
    });

    // Play the theme music when the component mounts
    themeMusic.play();

    // Cleanup function
    return () => {
      // Stop and unload the theme music when the component unmounts
      themeMusic.stop();
      themeMusic.unload();
    };
  }, []);

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

  return (
    <div>
      <ThreeScene />
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalIndex={modalIndex}
      />
    </div>
  );
};

export default HomePage;
