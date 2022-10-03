import React from "react";

import { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
	const [toggle, setToggle] = useState(true);

	// const navbar = document.querySelector(".app__navbar");
	// window.onscroll = () => {
	// 	if (window.scrollY > 350) {
	// 		navbar.classList.add("nav-active");
	// 	} else {
	// 		navbar.classList.remove("nav-active");
	// 	}
	// };

	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={images.logoForNavbar} alt='logo' />
			</div>
			{/* Desktop menu */}
			<ul className='app__navbar-links'>
				{["home", "about", "work", "skills", "contact"].map((item) => (
					<li className='app__flex p-text' key={`link-${item}`}>
						<div id='navbar__div' />
						<a className={`navLink-${item}`} href={`#${item}`}>
							{item}
						</a>
						<div id='navbar__divv' />
					</li>
				))}
			</ul>

			{/* Burger menu */}
			<div className='app__navbar-menu'>
				<HiMenuAlt4 onClick={() => setToggle(true)} />
				{toggle && (
					<motion.div whileInView={{ x: [350, 0] }} transition={{ duration: 0.85, ease: "easeInOut" }}>
						<HiX onClick={() => setToggle(false)} />
						<ul>
							{["home", "about", "work", "skills", "contact"].map((item) => (
								<li key={item}>
									{/* <div id='navbar__div' /> */}
									<a href={`#${item}`} onClick={() => setToggle(false)}>
										{item}
									</a>
									{/* <div id='navbar__divv' /> */}
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
