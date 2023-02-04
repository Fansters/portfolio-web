import React, { Suspense } from "react";
import "./Header.scss";
import { motion } from "framer-motion";
import { images } from "../../constants";
// import KUTE from "kute.js";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { AppWrap } from "../../wrapper";
// import { Mesh } from "three";
import { useRef } from "react";
import { TextureLoader } from "three";

// const scaleVariants = {
// 	whileInView: {
// 		scale: [0, 1],
// 		opacity: [0, 1],
// 		transition: {
// 			duration: 1,
// 			ease: "easeInOut",
// 		},
// 	},
// };

function Cube() {
	const meshRef = useRef(null);
	const texture_1 = useLoader(TextureLoader, "textures/css.png");
	const texture_2 = useLoader(TextureLoader, "textures/html.png");
	const texture_3 = useLoader(TextureLoader, "textures/javascript.png");
	const texture_4 = useLoader(TextureLoader, "textures/react.png");
	const texture_5 = useLoader(TextureLoader, "textures/sass.png");
	const texture_6 = useLoader(TextureLoader, "textures/tailWind.png");
	useFrame(() => {
		if (!meshRef.current) {
			return;
		}

		meshRef.current.rotation.x += 0.02;
		meshRef.current.rotation.y += 0.05;
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry />
			<meshBasicMaterial attach='material-1' map={texture_1} transparent />
			<meshBasicMaterial attach='material-2' map={texture_2} transparent />
			<meshBasicMaterial attach='material-3' map={texture_3} transparent />
			<meshBasicMaterial attach='material-4' map={texture_4} transparent />
			<meshBasicMaterial attach='material-5' map={texture_5} transparent />
			<meshBasicMaterial attach='material-6' map={texture_6} transparent />
		</mesh>
	);
}

// var tween = KUTE.fromTo(
// 	"#blob1",
// 	{ path: "#blob1" },
// 	{ path: "#blob2" },
// 	{ repeat: 999, duration: 3000, yoyo: true }
// ).start();

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

		{/* laptop img */}
		{/* <motion.div
			whileInView={{ opacity: [0, 1] }}
			transition={{ duration: 0.5, delayChildren: 0.5 }}
			className='app__header-img'
		>
			<img className='app__header-laptop' src={images.laptop} alt='profile_bg' />
		</motion.div> */}

		{/* skills imgs */}
		{/* <motion.div
			variants={scaleVariants}
			whileInView={scaleVariants.whileInView}
			className='app__header-circles mobile-hidden'
		>
			{[images.css, images.html, images.sass].map((circle, index) => (
				<div className='circle-cmp app__flex' key={`circle-${index}`}>
					<img src={circle} alt='profile_bg' />
				</div>
			))}
		</motion.div>
		<motion.div variants={scaleVariants} whileInView={scaleVariants.whileInView} className='app__header-circles v2'>
			{[images.javascript, images.react, images.typescript].map((circle, index) => (
				<div className='circle-cmp app__flex' key={`circle-${index}`}>
					<img src={circle} alt='profile_bg' />
				</div>
			))}
		</motion.div> */}

		{/* three js anims */}
		<Canvas>
			<mesh>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<Cube />
				</Suspense>
			</mesh>
		</Canvas>
	</div>
);

export default AppWrap(Header, "home");
