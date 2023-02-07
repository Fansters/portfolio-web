import React, { Suspense } from "react";
import "./Header.scss";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import PropTypes from "prop-types";

// imp stuff from example 3D
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";
import randomWord from "random-words";

// imp stufff for my own3D cube
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { useRef } from "react";
// import { TextureLoader } from "three";

// 3D word globe to modify
function Word({ children, ...props }) {
	const color = new THREE.Color();
	const fontProps = {
		// font: "/Inter-Bold.woff",
		fontSize: 2.5,
		letterSpacing: -0.05,
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
		ref.current.material.color.lerp(color.set(hovered ? "#fa2720" : "white"), 0.1);
	});
	return (
		<Text
			ref={ref}
			onPointerOver={over}
			onPointerOut={out}
			onClick={() => console.log("clicked")}
			{...props}
			{...fontProps}
		>
			{children}
		</Text>
	);
}

function Cloud({ count = 4, radius = 20 }) {
	// Create a count x count random words with spherical distribution
	const words = useMemo(() => {
		const temp = [];
		const spherical = new THREE.Spherical();
		const phiSpan = Math.PI / (count + 1);
		const thetaSpan = (Math.PI * 2) / count;
		for (let i = 1; i < count + 1; i++)
			for (let j = 0; j < count; j++)
				temp.push([
					new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)),
					randomWord(),
				]);
		return temp;
	}, [count, radius]);
	return words.map(([pos, word], index) => (
		<Word key={index} position={pos}>
			{word}
		</Word>
	));
}

// function Cube() {
// 	const meshRef = useRef(null);

// 	const texture_1 = useLoader(TextureLoader, "textures/css.png");
// 	const texture_2 = useLoader(TextureLoader, "textures/html.png");
// 	const texture_3 = useLoader(TextureLoader, "textures/javascript.png");
// 	const texture_4 = useLoader(TextureLoader, "textures/react.png");
// 	const texture_5 = useLoader(TextureLoader, "textures/sass.png");
// 	const texture_6 = useLoader(TextureLoader, "textures/sass.png");
// 	useFrame(() => {
// 		if (!meshRef.current) {
// 			return;
// 		}

// 		meshRef.current.rotation.x += 0.01;
// 		meshRef.current.rotation.y += 0.01;
// 	});

// 	return (
// 		<mesh ref={meshRef}>
// 			<boxGeometry args={[3, 3, 3, 3, 3, 3]} />
// 			<meshStandardMaterial attach='material-1' map={texture_1} transparent />
// 			<meshStandardMaterial attach='material-2' map={texture_2} transparent />
// 			<meshStandardMaterial attach='material-3' map={texture_3} transparent />
// 			<meshStandardMaterial attach='material-4' map={texture_4} transparent />
// 			<meshStandardMaterial attach='material-5' map={texture_5} transparent />
// 			<meshStandardMaterial attach='material-6' map={texture_6} transparent />
// 		</mesh>
// 	);
// }

const Header = () => (
	<div className='app__header app__flex'>
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

				<div className='tag-cmp app__flex'>
					<p className='p-text white-text'>&#60; Frontend Developer &#47;&#62;</p>
					<p className='p-text white-text'>&#60; Web Developer &#47;&#62;</p>
				</div>
			</div>
		</motion.div>

		{/* three fiber anims */}
		{/* <Canvas>
			<mesh>
				<ambientLight />
				<pointLight position={[5, 1, 0]} />
				<Suspense fallback={null}>
					<Cube />
				</Suspense>
			</mesh>
		</Canvas> */}

		<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
			<fog attach='fog' args={["#202025", 0, 80]} />
			<Suspense fallback={null}>
				<Cloud count={8} radius={20} />
			</Suspense>
			<TrackballControls />
		</Canvas>
	</div>
);

export default AppWrap(Header, "home");
