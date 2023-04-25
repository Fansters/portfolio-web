import React from "react";
import { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={images.logoForNavbar} alt='logo' />
			</div>
			{/* Desktop menu */}
			<ul className='app__navbar-links'>
				{["home", "about", "work", "skills", "contact"].map((item) => (
					<li className='app__flex p-text' key={`link-${item}`}>
						<motion.div id='navbar__div' />
						<motion.a
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.8 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							className={`linkStyle`}
							href={`#${item}`}
						>
							{item}
						</motion.a>
						<div id='navbar__divv' />
					</li>
				))}
			</ul>

			{/* Burger menu */}
			<div className='app__navbar-menu'>
				<HiMenuAlt4 onClick={() => setToggle(true)} />
				<AnimatePresence>
					{toggle && (
						<motion.div
							initial={{ x: 900 }}
							animate={{ x: 0 }}
							exit={{ x: 900 }}
							transition={{ duration: 0.75, ease: "easeInOut" }}
							key='burger-menu'
						>
							<HiX onClick={() => setToggle(false)} />
							<ul>
								{["home", "about", "work", "skills", "contact"].map((item) => (
									<li key={item}>
										<a href={`#${item}`} onClick={() => setToggle(false)}>
											{item}
										</a>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
};

export default Navbar;
