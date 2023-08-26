// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import ThreeScene from "../components/ThreeScene";
import Modal from "../components/Modal";

const HomePage = () => {
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
