import React, { useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { motion } from "framer-motion";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ name: false, email: false, message: false });

	const { name, email, message } = formData;

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
		setError({ ...error, [name]: false });
	};

	const handleSubmit = () => {
		if (!name || !email || !message) {
			setError({
				name: !name,
				email: !email,
				message: !message,
			});
			return;
		}

		if (!validateEmail(email)) {
			setError({ ...error, email: true });
			return;
		}

		setLoading(true);

		const contact = {
			_type: "contact",
			name: name,
			email: email,
			message: message,
		};
		client.create(contact).then(() => {
			setLoading(false);
			setIsFormSubmitted(true);
		});
	};

	return (
		<>
			<h2 className='head-text'>Sazinies ar mani!</h2>

			<div className='app__footer-cards'>
				<div className='app__footer-card'>
					<img src={images.email} alt='email' />
					<a href='mailto:edmundseizentals@gmail.com' className='p-text white-text'>
						edmundseizentals@gmail
					</a>
				</div>
				<div className='app__footer-card'>
					<img src={images.mobile} alt='mobile' />
					<a href='tel: +371 26372722' className='p-text white-text'>
						26372722
					</a>
				</div>
			</div>

			{!isFormSubmitted ? (
				<div className='app__footer-form app__flex'>
					<div className='app__flex'>
						<motion.input
							whileTap={{ scale: 1.01 }}
							className={`p-text ${error.name ? "error" : ""}`}
							style={
								error.name
									? { borderColor: "red", borderWidth: "3px" }
									: { borderColor: "transparent", borderWidth: "3px" }
							}
							type='text'
							placeholder='Your Name*'
							name='name'
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<motion.input
							whileTap={{ scale: 1.01 }}
							className={`p-text ${error.email ? "error" : ""}`}
							style={
								error.email
									? { borderColor: "red", borderWidth: "3px" }
									: { borderColor: "transparent", borderWidth: "3px" }
							}
							type='email'
							placeholder='Email*'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<motion.textarea
							whileTap={{ scale: 1.01 }}
							className={`p-text ${error.message ? "error" : ""}`}
							style={
								error.message
									? { borderColor: "red", borderWidth: "3px" }
									: { borderColor: "transparent", borderWidth: "3px" }
							}
							placeholder='Your message*'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<motion.button
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.7 }}
						type='button'
						className='p-text'
						onClick={handleSubmit}
					>
						{loading ? "Sending.." : "Send message"}
					</motion.button>
				</div>
			) : (
				<div>
					<h3 className='head-text'>Paldies par ziņu!</h3>
				</div>
			)}
		</>
	);
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact", "app__whitebg");
