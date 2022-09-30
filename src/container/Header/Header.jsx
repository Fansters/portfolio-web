import React from "react";
import "./Header.scss";
import { motion } from "framer-motion";
import { images } from "../../constants";
// import KUTE from "kute.js";

import { AppWrap } from "../../wrapper";

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	},
};

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
						<h1 className='head-text'>Edmunds</h1>
					</div>
				</div>

				<div className='tag-cmp app__flex'>
					<p className='p-text white-text'>&#60; Frontend Developer &#47;&#62;</p>
					<p className='p-text white-text'>&#60; Freelancer &#47;&#62;</p>
				</div>
			</div>
		</motion.div>

		<motion.div
			whileInView={{ opacity: [0, 1] }}
			transition={{ duration: 0.5, delayChildren: 0.5 }}
			className='app__header-img'
		>
			<img className='app__header-laptop' src={images.laptop} alt='profile_bg' />
			{/* <motion.img
				whileInView={{ scale: [0, 1] }}
				transition={{ duration: 1, ease: "easeInOut" }}
				src={images.circle}
				alt='profile_circle'
				className='overlay_circle'
			/> */}
		</motion.div>

		<motion.div variants={scaleVariants} whileInView={scaleVariants.whileInView} className='app__header-circles mobile-hidden'>
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
		</motion.div>
	</div>
);

export default AppWrap(Header, "home");
