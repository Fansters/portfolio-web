import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return isMobile;
};

const Work = () => {
	const [works, setWorks] = useState([]);
	const [filterWork, setFilterWork] = useState([]);
	const [activeFilter, setActiveFilter] = useState("All");
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
	const isMobile = useIsMobile();

	useEffect(() => {
		const query = '*[_type == "works"]';

		client.fetch(query).then((data) => {
			setWorks(data);
			setFilterWork(data);
		});
	}, []);

	const handleWorkFilter = (item) => {
		setActiveFilter(item);
		setAnimateCard([{ y: 100, opacity: 0 }]);

		setTimeout(() => {
			setAnimateCard([{ y: 0, opacity: 1 }]);

			if (item === "All") {
				setFilterWork(works);
			} else {
				setFilterWork(works.filter((work) => work.tags.includes(item)));
			}
		}, 500);
	};

	const handleMouseMove = (e) => {
		const { currentTarget: target } = e;
		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top;

		target.style.setProperty("--mouse-x", `${x}px`);
		target.style.setProperty("--mouse-y", `${y}px`);
	};

	for (const card of document.querySelectorAll("card")) {
		card.onmousemove = (e) => handleMouseMove(e);
	}

	return (
		<>
			<h2 className='head-text'>
				<span>Portfolio</span>
			</h2>

			<div className='app__work-filter'>
				{["All", "JS", "API", "SCSS", "CSS", "Wordpress", "ReactJS"].map((item, index) => (
					<motion.div
						whileTap={{ scale: 0.6 }}
						key={index}
						onClick={() => handleWorkFilter(item)}
						className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
					>
						{item}
					</motion.div>
				))}
			</div>
			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__work-portfolio'
			>
				{filterWork.map((work, index) => (
					<Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={300} scale={1.04} transitionSpeed={2000}>
						<div className='app__work-item app__flex'>
							<div className='app__work-content app__flex'>
								<h4 className=''>{work.title}</h4>
							</div>
							<div className='app__work-img app__flex'>
								<div className='app__work-tag app__flex'>
									<p className=''>{work.tags[0]}</p>
								</div>
								<img src={urlFor(work.imgUrl)} alt={work.name} />

								<motion.div
									whileHover={{ opacity: [0, 1] }}
									// Apply whileInView only on mobile devices
									{...(isMobile ? { whileInView: { opacity: [0, 1] } } : {})}
									transition={{ duration: 0.25, ease: "easeInOut", staggerChildren: 0.5 }}
									className='app__work-hover app__flex'
								>
									<a href={work.projectLink} target='_blank' rel='noreferrer'>
										<motion.div
											whileInView={{ scale: [0, 1] }}
											whileHover={{ scale: [1, 0.9] }}
											onTap={{ scale: [1, 0.9] }}
											transition={{ duration: 0.25 }}
											className='app__flex'
										>
											<AiFillEye />
										</motion.div>
									</a>
									<a href={work.codeLink} target='_blank' rel='noreferrer'>
										<motion.div
											whileInView={{ scale: [0, 1] }}
											whileHover={{ scale: [1, 0.9] }}
											transition={{ duration: 0.25 }}
											className='app__flex'
										>
											<AiFillGithub />
										</motion.div>
									</a>
								</motion.div>
							</div>
						</div>
					</Tilt>
				))}
			</motion.div>
		</>
	);
};

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__primarybg");
