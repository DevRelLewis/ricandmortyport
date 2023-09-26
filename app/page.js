// pages/index.js
"use client"
import React, { useState, useEffect } from "react"
import { Howl, Howler } from "howler"
import Head from "next/head"
import ThreeScene from "../components/ThreeScene"
import Modal from "../components/Modal"
import Link from "next/link"

const HomePage = () => {
  const [modalIndex, setModalIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Initially playing
  const [volume, setVolume] = useState(0.5) // Initial volume value
  const [isMobile, setIsMobile] = useState(false)
  const [isModal2Open, setIsModal2Open] = useState(false)

  useEffect(() => {
    // Initialize Howler
    const themeMusic = new Howl({
      src: ["/themesong.mp3"], // Replace with the actual path to your theme music
      loop: true, // Loop the music continuously
      volume: volume, // Set the initial volume
    })

    if (isPlaying) {
      themeMusic.play()
    } else {
      themeMusic.pause()
    }

    // Cleanup function
    return () => {
      // Stop and unload the theme music when the component unmounts
      themeMusic.stop()
      themeMusic.unload()
    }
  }, [isPlaying, volume])

  useEffect(() => {
    if (modalIndex < 4) {
      const timer = setTimeout(() => {
        setIsModalOpen(true)
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [modalIndex])

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    }
  })

  const closeModal = () => {
    setIsModalOpen(false)
    if (modalIndex <= 2) {
      setModalIndex((prev) => prev + 1)
    } else {
      setIsModal2Open(true)
    }
  }

  // Function to toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Function to handle final modal onClick

  function closeModal2() {
    setIsModal2Open(true)
    setModalIndex(4)
  }

  // Function to handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
  }

  return (
    <div>
      {isMobile ? (
        <div>Not Optimized for Mobile</div>
      ) : (
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
          {isModal2Open && modalIndex == 3 ? (
            <div className="w-[600px] h-[800px] bg-white text-black rounded-xl flex flex-col fixed inset-0 items-center justify-center transition-opacity xl:ml-[545px] xl:mt-[67px] 2xl:ml-[660px] 2xl:mt-[77px] ">
              <Link href="https://twitter.com/DevRelLewis">Twitter</Link>
              <Link href="https://www.linkedin.com/in/devrellewis/">
                Linkedin
              </Link>
              <Link href="https://github.com/DevRelLewis/">Github</Link>
              <button
                onClick={closeModal2}
                className="w-[50px] h-[30px] bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
