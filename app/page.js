// pages/index.js
"use client"
import React, { useState, useEffect } from "react"
import { Howl, Howler } from "howler"
import Head from "next/head"
import ThreeScene from "../components/ThreeScene"
import Link from "next/link"
import Image from "next/image"

const HomePage = () => {
  const [modalIndex, setModalIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Initially playing
  const [volume, setVolume] = useState(0.5) // Initial volume value
  const [isMobile, setIsMobile] = useState(false)
  const [isModal2Open, setIsModal2Open] = useState(false)
  const [source, setSource] = useState("")

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

  // Function to toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (modalIndex == 0) {
      setSource("/rickandmorty_experience.png")
    } else if (modalIndex == 1) {
      setSource("/rickandmorty_projects.png")
    } else if (modalIndex == 2) {
      setSource("/rickandmorty_skills.png")
    } else if (modalIndex == 3) {
      setSource("")
    }
  }, [modalIndex])

  // Function to handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
  }

  useEffect(() => {
    if (modalIndex < 3) {
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
    if (modalIndex < 2) {
      setModalIndex((prev) => prev + 1)
      console.log(modalIndex)
    } else if (modalIndex == 2) {
      setIsModal2Open(true)
    }
  }

  // Function to handle final modal onClick
  function closeModal2() {
    setIsModal2Open(false)
    setModalIndex(4)
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
          {isModalOpen && modalIndex <= 2 ? (
            <div>
              {" "}
              <div
                className={`fixed inset-0 flex items-center justify-center transition-opacity ${
                  isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-[600px] h-[800px] bg-white rounded-xl flex flex-col items-center justify-center">
                  <div>
                    <Image src={source} width={560} height={560} alt="" />
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-[50px] h-[30px] bg-blue-500 text-white rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {isModal2Open ? (
            <div className="w-[600px] h-[800px] bg-white text-black rounded-xl flex flex-col fixed inset-0 items-center justify-center transition-opacity xl:ml-[545px] xl:mt-[67px] 2xl:ml-[660px] 2xl:mt-[77px]">
              <div className="text-6xl">Reach out to me!</div> <br></br>
              <Link href="https://twitter.com/DevRelLewis">
                <Image
                  className="rounded-xl"
                  width={100}
                  height={100}
                  src="/x_logo.webp"
                ></Image>
              </Link>
              <Link href="https://www.linkedin.com/in/devrellewis/">
                <br></br>
                <Image
                  className="rounded-xl"
                  width={100}
                  height={100}
                  src="/linkedin.png"
                ></Image>
              </Link>
              <Link href="https://github.com/DevRelLewis/">
                <br></br>
                <Image
                  className="rounded-xl"
                  width={100}
                  height={100}
                  src="/github.png"
                ></Image>
              </Link>
              <Link href="https://gmail.com/">
                <Image
                  className="rounded-xl"
                  width={100}
                  height={100}
                  src="/gmail.png"
                ></Image>
              </Link>
              <br></br>
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
