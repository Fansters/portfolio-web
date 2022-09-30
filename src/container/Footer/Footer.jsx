import React, { useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { name, email, message } = formData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
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
						<input
							className='p-text '
							type='text'
							placeholder='Tavs vārds'
							name='name'
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<input
							className='p-text'
							type='email'
							placeholder='Tavs e-pasts'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Tava ziņa'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<button type='button' className='p-text' onClick={handleSubmit}>
						{loading ? "Sūta..." : "Sūtīt ziņu"}
					</button>
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
