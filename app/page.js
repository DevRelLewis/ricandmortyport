// pages/index.js
"use client";
import Head from "next/head";
import ThreeScene from "../components/ThreeScene";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Morty its a portfolio</title>
      </Head>
      <h1>Morty its a portfolio</h1>
      <ThreeScene />
    </div>
  );
};

export default HomePage;
