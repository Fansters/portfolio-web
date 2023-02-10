import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import "./About.scss";
import { urlFor, client } from "../../client";

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
				Creating <span> Things That</span> <br />
				Suits Your <span>Needs</span>
			</h2>

			<section className='hero-section'>
				<div className='card-grid'>
					<a className='card' href='#'>
						<div
							className='card__background'
						/>
						<div className='card__content'>
							<p className='card__category'>Category</p>
							<h3 className='card__heading'>Example Card Heading</h3>
						</div>
					</a>
					<a className='card' href='#'>
						<div
							className='card__background'
							style={{
								backgroundImage: `url(https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
							}}
						/>
						<div className='card__content'>
							<p className='card__category'>Category</p>
							<h3 className='card__heading'>Example Card Heading</h3>
						</div>
					</a>
					<a className='card' href='#'>
						<div
							className='card__background'
							style={{
								backgroundImage: `url(https://images.unsplash.com/photo-1556680262-9990363a3e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
							}}
						/>
						<div className='card__content'>
							<p className='card__category'>Category</p>
							<h3 className='card__heading'>Example Card Heading</h3>
						</div>
					</a>
					<a className='card' href='#'>
						<div
							className='card__background'
							style={{
								backgroundImage: `url(https://images.unsplash.com/photo-1557004396-66e4174d7bf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
							}}
						/>
						<div className='card__content'>
							<p className='card__category'>Category</p>
							<h3 className='card__heading'>Example Card Heading</h3>
						</div>
					</a>
				</div>
			</section>
		</>
	);
};

export default AppWrap(MotionWrap(About, "app__about"), "about", "app__whitebg");
