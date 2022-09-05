import React, { useState, useEffect } from "react";
import "./About.scss";

import { motion } from "framer-motion";
import { images } from "../../constants";
import { urlFor, client } from "../../client";


// static data, new data comes from sanityAPI
// const abouts = [
// 	{
// 		title: "web dev",
// 		description: "Good web dev",
// 		imgUrl: images.about01,
// 	},
// 	{
// 		title: "web design",
// 		description: "Good design",
// 		imgUrl: images.about02,
// 	},
// 	{
// 		title: "UI/UX",
// 		description: "best practices",
// 		imgUrl: images.about03,
// 	},
// 	{
// 		title: "Back end",
// 		description: "puttin it all together",
// 		imgUrl: images.about04,
// 	},
// ];

const About = () => {
	const [abouts, setAbouts] = useState([]);

	useEffect(() => {
		const query = '*[_type == "abouts"]';
		client.fetch(query).then((data) => {
			setAbouts(data);
		});
	}, []);

	return (
		<>
			<h2 className='head-text'>
				I know That <span>Good Design</span> <br />
				means <span>Good Business</span>
			</h2>
			<div className='app__profiles'>
				{abouts.map((about, index) => (
					<motion.div
						whileInView={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5, type: "twee n" }}
						className='app__profile-item'
						key={about.title + index}
					>
						<img src={urlFor(about.imgUrl)} alt={about.title}></img>
						<h2 className='bald-text' style={{ marginTop: "20px" }}>
							{about.title}
						</h2>
						<p className='p-text' style={{ marginTop: "10px" }}>
							{about.description}
						</p>
					</motion.div>
				))}
			</div>
		</>
	);
};

export default About;
