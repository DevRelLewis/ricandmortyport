import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 6);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load("/rick.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());

      camera.position.set(0.1, 1.79, 3);
      camera.lookAt(center);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(center);
      controls.enableZoom = false;
      controls.enablePan = true;
      controls.update();

      loader.load("/clipboard.glb", (secondGltf) => {
        const secondModel = secondGltf.scene;
        secondModel.position.set(0.5, 1, 4.5);
        model.add(secondModel);
      });

      loader.load("/retro_computer.glb", (thirdGltf) => {
        const thirdModel = thirdGltf.scene;
        thirdModel.position.set(-2.9, 1.33, 3.6);
        thirdModel.scale.set(0.35, 0.35, 0.35);
        model.add(thirdModel);
      });

      loader.load("/pickle_jar.glb", (fourthGltf) => {
        const fourthModel = fourthGltf.scene;
        fourthModel.position.set(0.5, 1, 5.3);
        fourthModel.scale.set(0.005, 0.005, 0.005);
        model.add(fourthModel);
      });

      loader.load("/portal_gun.glb", (fifthGltf) => {
        const fifthModel = fifthGltf.scene;
        fifthModel.position.set(-0.02, 1.1, 5.3);
        fifthModel.scale.set(2, 2, 2);
        fifthModel.rotation.y = THREE.MathUtils.degToRad(180);
        model.add(fifthModel);
      });

      let mixer;
      const animations = [
        "rickAnim1.fbx",
        "rickAnim2.fbx",
        "rickAnim3.fbx",
        "rickAnim4.fbx",
        "rickAnim5.fbx",
      ];
      const fbxLoader = new FBXLoader();
      let loadedAnimations = 0; // Counter for loaded animations

      fbxLoader.load("rick_3d.fbx", (object) => {
        animations.forEach((anim) => {
          fbxLoader.load(anim, (animObject) => {
            if (animObject.animations) {
              animObject.animations.forEach((animation) => {
                object.animations.push(animation);
              });
            }
            loadedAnimations++;

            if (
              loadedAnimations === animations.length &&
              object.animations[3]
            ) {
              mixer = new THREE.AnimationMixer(object);
              const idleAction = mixer.clipAction(object.animations[4]);
              idleAction.play();
            }
          });
        });

        object.position.set(-1.5, -0.01, 5.1);
        object.scale.set(0.007, 0.007, 0.007);
        object.rotation.y = THREE.MathUtils.degToRad(150);
        model.add(object);
      });

      const animate = () => {
        requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01); // Update the animation mixer
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    });

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default ThreeScene;
