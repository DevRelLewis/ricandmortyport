// components/Modal.js
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

const Modal = ({ isOpen, closeModal, modalIndex }) => {
  const [source, setSource] = useState("");
  useEffect(() => {
    if (modalIndex == 0) {
      setSource("/cv_1.png");
    } else if (modalIndex == 1) {
      setSource("/cv_1.png");
    } else if (modalIndex == 1) {
      setSource("/cv_1.png");
    } else if (modalIndex == 1) {
      setSource("/cv_1.png");
    }
  }, []);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[600px] h-[800px] bg-white rounded-xl flex flex-col items-center justify-center">
        Modal {modalIndex + 1}
        <div>
          <Image src={source} width={560} height={560} alt="cv_1" />
        </div>
        <button
          onClick={closeModal}
          className="w-[50px] h-[30px] bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
