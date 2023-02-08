import React, { Suspense, useRef, useState, useMemo, useEffect } from "react";
import "./Header.scss";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import PropTypes from "prop-types";
import { images } from "../../constants";

// imp stuff from example 3D
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls, Html } from "@react-three/drei";

const skillsList = ["JAVASCRIPT", "HTML", "SASS", "CSS", "REACT", "TAILWIND", "WORDPRESS", "ELEMENTOR", "FIGMA"];

// 3D word globe to modify
function Word({ children, ...props }) {
	const color = new THREE.Color();
	const fontProps = {
		// font: "/Inter-Bold.woff",
		index: 99,
		fontSize: 2,
		letterSpacing: 0.01,
		lineHeight: 1,
		"material-toneMapped": false,
	};
	const ref = useRef();
	const [hovered, setHovered] = useState(false);
	const over = (e) => (e.stopPropagation(), setHovered(true));
	const out = () => setHovered(false);
	// Change the mouse cursor on hover
	useEffect(() => {
		if (hovered) document.body.style.cursor = "pointer";
		return () => (document.body.style.cursor = "auto");
	}, [hovered]);
	// Tie component to the render-loop
	useFrame(({ camera }) => {
		// Make text face the camera
		ref.current.quaternion.copy(camera.quaternion);
		// Animate font color
		ref.current.material.color.lerp(color.set(hovered ? "#387eff" : "white"), 0.1);
	});
	return (
		<Text
			ref={ref}
			onPointerOver={over}
			onPointerOut={out}
			onClick={() => console.log("clicked")}
			{...props}
			{...fontProps}
			className='globeText'
		>
			{children}
		</Text>
	);
}

function Cloud({ count = 4, radius = 20, customWords = [] }) {
	// Create a count x count random words with spherical distribution

	const words = useMemo(() => {
		const temp = [];
		const spherical = new THREE.Spherical();
		const phiSpan = Math.PI / (count + 1);
		const thetaSpan = (Math.PI * 2) / count;
		const customWordLength = customWords.length;
		let wordIndex = 0;
		for (let i = 1; i < count + 1; i++) {
			for (let j = 0; j < count; j++) {
				if (wordIndex === customWordLength) {
					wordIndex = 0;
				}
				temp.push([
					new THREE.Vector3().setFromSpherical(
						spherical.set(
							radius + Math.random() * 5,
							phiSpan * i + Math.random() * phiSpan,
							thetaSpan * j + Math.random() * thetaSpan
						)
					),
					customWords[wordIndex],
				]);
				wordIndex++;
			}
		}
		return temp;
	}, [count, radius, customWords]);
	return words.map(([pos, word], index) => (
		<Word key={index} position={pos}>
			{word}
		</Word>
	));
}

//CLOUD WITH IMAGES IN FUTURE

// function Image({ children, ...props }) {
// 	const ref = useRef();
// 	const [hovered, setHovered] = useState(false);
// 	const over = (e) => (e.stopPropagation(), setHovered(true));
// 	const out = () => setHovered(false);
// 	// Change the mouse cursor on hover
// 	useEffect(() => {
// 		if (hovered) document.body.style.cursor = "pointer";
// 		return () => (document.body.style.cursor = "auto");
// 	}, [hovered]);
// 	// Tie component to the render-loop
// 	useFrame(({ camera }) => {
// 		// Make text face the camera
// 		ref.current.quaternion.copy(camera.quaternion);
// 	});
// 	return (
// 		<mesh ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log("clicked")} {...props}>
// 			<planeBufferGeometry />
// 			<meshBasicMaterial>
// 				<Html>
// 					<img src={children} />
// 				</Html>
// 			</meshBasicMaterial>
// 		</mesh>
// 	);
// }

// function Cloud({ count = 4, radius = 20 }) {
// 	// Create a count x count random images with spherical distribution
// 	const imagesArr = useMemo(() => {
// 		const temp = [];
// 		const spherical = new THREE.Spherical();
// 		const phiSpan = Math.PI / (count + 1);
// 		const thetaSpan = (Math.PI * 2) / count;
// 		for (let i = 1; i < count + 1; i++)
// 			for (let j = 0; j < count; j++)
// 				temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), ""]);
// 		return temp;
// 	}, [count, radius]);
// 	return imagesArr.map(([pos, image], index) => (
// 		<Image key={index} position={pos}>
// 			{image}
// 		</Image>
// 	));
// }

const Header = () => (
	<div className='app__header app__flex disable-text-selection'>
		<motion.div
			whileInView={{ x: [-100, 0], opacity: [0, 1] }}
			transition={{ duration: 0.5 }}
			className='app__header-info'
		>
			<div className='app__header-badge'>
				<div className='badge-cmp app__flex'>
					<span>👋</span>
					<div style={{ marginLeft: 20 }}>
						<p className='p-text white-text'> &#60; Hello, I am </p>
						<h1 className='head-text'>VVVVVVV</h1>
					</div>
				</div>
				{/* <ImageList /> */}
				<div className='tag-cmp app__flex'>
					<p className='p-text white-text'>&#60; Frontend Developer &#47;&#62;</p>
					<p className='p-text white-text'>&#60; Web Developer &#47;&#62;</p>
				</div>
			</div>
		</motion.div>

		<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
			<fog attach='fog' args={["#262626", 0, 60]} />
			<Suspense fallback={null}>
				<Cloud count={4} radius={15} customWords={skillsList} />
			</Suspense>
			<TrackballControls noPan={true} noZoom={true} />
		</Canvas>
	</div>
);

export default AppWrap(Header, "home");
