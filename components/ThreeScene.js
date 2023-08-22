import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    // Load the GLB model (first model)
    const loader = new GLTFLoader();
    loader.load("/rick.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Calculate center and bounding box of the model
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Set camera position and look at the center of the model
      camera.position.set(0.1, 1.79, 3);
      camera.lookAt(center);

      // Add camera controls for user interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(center);
      controls.enableZoom = false;
      controls.enablePan = true;
      controls.update();

      // Load the GLB model (second model)
      loader.load("/clipboard.glb", (secondGltf) => {
        const secondModel = secondGltf.scene;

        // Position the second model within the interior of the first model
        secondModel.position.set(0.5, 1, 4.5); // Adjust x, y, z values

        // Add the second model as a child of the first model
        model.add(secondModel);
      });

      // Load the GLB model (3rd model)
      loader.load("/retro_computer.glb", (thirdGltf) => {
        const thirdModel = thirdGltf.scene;

        // Position the 3rd model within the interior of the first model
        thirdModel.position.set(0, 2, 4.6); // Adjust x, y, z values

        // Set the scale of the third model
        thirdModel.scale.set(0.35, 0.35, 0.35); // Adjust x, y, z scale values

        // Add the third model as a child of the first model
        model.add(thirdModel);
      });

      // Start rendering loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Update controls in the animation loop
        renderer.render(scene, camera);
      };
      animate();
    });

    // Handle window resizing
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Text handling

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default ThreeScene;
