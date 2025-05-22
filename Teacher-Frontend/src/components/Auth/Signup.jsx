import { useState, useRef, useEffect } from "react";
import axios from "axios";

const VITEHOST = import.meta.env.VITE_HOST;
const SIGNUP_URL = "/auth/signup";

export default function SignUp() {
	const userRef = useRef();
	const errRef = useRef();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errmsg, setErrmsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrmsg("");
	}, [name, email, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				VITEHOST + SIGNUP_URL,
				JSON.stringify({ name, email, password: pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(response?.data);
			setSuccess(true);
			setName("");
			setEmail("");
			setPwd("");
		} catch (err) {
			if (!err?.response) {
				setErrmsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrmsg("User already exists");
			} else {
				setErrmsg("Signup Failed");
			}
			errRef.current?.focus();
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen -mt-16">
			<section className="w-full max-w-md min-h-[550px] flex flex-col justify-center p-8 bg-primary rounded-lg text-white">
				<p
					ref={errRef}
					className={`${
						errmsg
							? "bg-red-100 text-red-800 font-bold p-2 mb-2"
							: "hidden"
					}`}
					aria-live="assertive"
				>
					{errmsg}
				</p>
				<h1 className="flex justify-center text-4xl my-3">Sign Up</h1>
				<form
					className="flex flex-col justify-evenly flex-grow pb-4"
					onSubmit={handleSubmit}
				>
					<label htmlFor="name" className="mt-4 text-lg">
						Name
					</label>
					<input
						type="text"
						id="name"
						ref={userRef}
						autoComplete="off"
						onChange={(e) => setName(e.target.value)}
						value={name}
						required
						className="p-2 rounded-md bg-white text-black"
					/>
					<label htmlFor="email" className="mt-4 text-lg">
						Email
					</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						className="p-2 rounded-md bg-white text-black"
					/>
					<label htmlFor="password" className="mt-4 text-lg">
						Password
					</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						className="p-2 rounded-md bg-white text-black"
					/>
					<button className="mt-8 text-lg p-2 rounded-md bg-tertiary text-white hover:bg-white hover:text-primary">
						Sign Up
					</button>
				</form>
				<p className="mt-2">
					Already have an account?{" "}
					<a href="/signin" className="text-white underline">
						Sign In
					</a>
				</p>
			</section>
		</div>
	);
}
