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

	// FORM VALIDATION
	class Test extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				fields: {},
				errors: {},
			};
		}

		handleValidation() {
			let fields = this.state.fields;
			let errors = {};
			let formIsValid = true;

			//Name
			if (!fields["name"]) {
				formIsValid = false;
				errors["name"] = "Cannot be empty";
			}

			if (typeof fields["name"] !== "undefined") {
				if (!fields["name"].match(/^[a-zA-Z]+$/)) {
					formIsValid = false;
					errors["name"] = "Only letters";
				}
			}

			//Email
			if (!fields["email"]) {
				formIsValid = false;
				errors["email"] = "Cannot be empty";
			}

			if (typeof fields["email"] !== "undefined") {
				let lastAtPos = fields["email"].lastIndexOf("@");
				let lastDotPos = fields["email"].lastIndexOf(".");

				if (
					!(
						lastAtPos < lastDotPos &&
						lastAtPos > 0 &&
						fields["email"].indexOf("@@") == -1 &&
						lastDotPos > 2 &&
						fields["email"].length - lastDotPos > 2
					)
				) {
					formIsValid = false;
					errors["email"] = "Email is not valid";
				}
			}

			this.setState({ errors: errors });
			return formIsValid;
		}

		contactSubmit(e) {
			e.preventDefault();

			if (this.handleValidation()) {
				alert("Form submitted");
			} else {
				alert("Form has errors.");
			}
		}

		handleChange(field, e) {
			let fields = this.state.fields;
			fields[field] = e.target.value;
			this.setState({ fields });
		}
	}
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
							className='p-text '
							type='text'
							placeholder='Tavs vārds'
							name='name'
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<motion.input
							whileTap={{ scale: 1.01 }}
							className='p-text'
							type='email'
							placeholder='Tavs e-pasts'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<motion.textarea
							whileTap={{ scale: 1.01 }}
							className='p-text'
							placeholder='Tava ziņa'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<motion.button
						// make website in darkmode as regular
						// add new projects
						// change about page
						// dark mode for whole page
						// btn should work only when input is valid!
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.7 }}
						type='button'
						className='p-text'
						onClick={handleSubmit}
					>
						{loading ? "Sūta..." : "Sūtīt ziņu"}
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
