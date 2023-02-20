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
					<a className='card'>
						<div className='card__background border-glow info' />
						<div className='card__content'>
							<h3 className='card__heading'>Information Gathering</h3>
							<p className='card__category'>Exploring your needs</p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>1</p>
						</div>
					</a>
					<a className='card'>
						<div className='card__background plan' />
						<div className='card__content'>
							<h3 className='card__heading'>Planning</h3>
							<p className='card__category'>Composing the gathared ideas</p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>2</p>
						</div>
					</a>
					<a className='card'>
						<div className='card__background design' />
						<div className='card__content'>
							<h3 className='card__heading'>Design</h3>
							<p className='card__category'>Composing the gathared ideas</p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>3</p>
						</div>
					</a>
					<a className='card'>
						<div className='card__background code' />
						<div className='card__content'>
							<h3 className='card__heading'>Coding</h3>
							<p className='card__category'>Composing the gathared ideas</p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>4</p>
						</div>
					</a>
					<a className='card'>
						<div className='card__background test' />
						<div className='card__content'>
							<h3 className='card__heading'>Testing Review</h3>
							<p className='card__category'>Websites comes to life</p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>5</p>
						</div>
					</a>
					<a className='card'>
						<div className='card__background main' />
						<div className='card__content'>
							<h3 className='card__heading'>Maintenance</h3>
							<p className='card__category'>Final touches and future maintenance </p>
						</div>
						<div className='card__numbers'>
							<p className='card__number'>6</p>
						</div>
					</a>
				</div>
			</section>
		</>
	);
};

export default AppWrap(MotionWrap(About, "app__about"), "about", "app__whitebg");
