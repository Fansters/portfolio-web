import React, { Suspense, useState } from "react";
import "./Header.scss";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { AppWrap } from "../../wrapper";
import { useRef } from "react";
import { TextureLoader } from "three";

function Cube() {
	const meshRef = useRef(null);
	// const [hovered, hover] = useState(false);

	const texture_1 = useLoader(TextureLoader, "textures/css.png");
	const texture_2 = useLoader(TextureLoader, "textures/html.png");
	const texture_3 = useLoader(TextureLoader, "textures/javascript.png");
	const texture_4 = useLoader(TextureLoader, "textures/react.png");
	const texture_5 = useLoader(TextureLoader, "textures/sass.png");
	const texture_6 = useLoader(TextureLoader, "textures/sass.png");
	useFrame(() => {
		if (!meshRef.current) {
			return;
		}

		meshRef.current.rotation.x += 0.01;
		meshRef.current.rotation.y += 0.01;
	});

	return (
		<mesh
			ref={meshRef}
			// scale={hovered ? 0.5 : 1}
			// onPointerOver={(event) => hover(true)}
			// onPointerOut={(event) => hover(false)}
		>
			<boxGeometry args={[3, 3, 3, 3, 3, 3]} />
			<meshStandardMaterial attach='material-1' map={texture_1} transparent />
			<meshStandardMaterial attach='material-2' map={texture_2} transparent />
			<meshStandardMaterial attach='material-3' map={texture_3} transparent />
			<meshStandardMaterial attach='material-4' map={texture_4} transparent />
			<meshStandardMaterial attach='material-5' map={texture_5} transparent />
			<meshStandardMaterial attach='material-6' map={texture_6} transparent />
		</mesh>
	);
}

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
		<Canvas>
			<mesh>
				<ambientLight />
				<pointLight position={[5, 1, 0]} />
				<Suspense fallback={null}>
					<Cube />
				</Suspense>
			</mesh>
		</Canvas>
	</div>
);

export default AppWrap(Header, "home");
