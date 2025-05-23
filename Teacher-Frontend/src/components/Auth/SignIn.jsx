import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITEHOST = import.meta.env.VITE_HOST;
const LOGIN_URL = "/auth/signin";

export default function SignIn() {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errmsg, setErrmsg] = useState("");
	const [success, setSuccess] = useState(false);
	const [userType, setUserType] = useState("teacher");

	const navigate = useNavigate();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrmsg("");
	}, [email, pwd]);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");

		if (token) {
			axios
				.post(`${VITEHOST}/auth/verify`, { accessToken: token })
				.then((res) => {
					if (res.data.valid) {
						const { user_id, name, email } = res.data;
						setAuth({ user_id, name, email, accessToken: token });
						navigate("/home");
					}
				})
				.catch(() => {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("user_id");
					console.log("NO TOKEN")
				});
		}
	}, []);
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = {
				email: email,
				password: pwd,
				user_type: userType,
			};
			const user_id0 = localStorage.getItem("user_id");
			console.log("USER-ID0---------", user_id0);

			const response = await axios.post(VITEHOST + LOGIN_URL, payload, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});

			const {
				accessToken,
				user_id,
				name,
				email: userEmail,
				user_type
			} = response?.data;

			// ✅ Set session token
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("user_id", user_id);
			const user_id1 = localStorage.getItem("user_id");
			console.log("USER-ID1---------", user_id1);



			// ✅ Update auth context
			setAuth({ user_id, name, email: userEmail, accessToken, user_type });

			// Clear form
			setEmail("");
			setPwd("");
			setSuccess(true);

			// Redirect
			navigate("/home");
		} catch (err) {
			if (!err?.response) {
				setErrmsg("No Server response");
			} else if (err.response?.status === 400) {
				setErrmsg("Missing Email or Password");
			} else if (err.response?.status === 401) {
				setErrmsg("Unauthorized");
			} else {
				setErrmsg("Login Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen -mt-16">
			{success ? (
				<section className="flex flex-col justify-center items-center min-h-screen py-4">
					<h1 className="text-2xl">You are Logged In!</h1>
					<br />
					<p>
						<a href="/" className="text-white underline">
							Go to Homepage
						</a>
					</p>
				</section>
			) : (
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
					<h1 className="flex justify-center text-4xl my-3">
						Sign In
					</h1>
					<form
						className="flex flex-col justify-evenly flex-grow pb-4"
						onSubmit={handleSubmit}
					>
						<label htmlFor="email" className="mt-4 text-lg">
							Email
						</label>
						<input
							type="email"
							id="email"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="font-nunito text-base p-1 rounded-md bg-white text-black"
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
							className="font-nunito text-base p-1 rounded-md bg-white text-black"
						/>
						{/* <div> */}
							<label htmlFor="userType" className="mt-4 text-lg">
								User Type
								</label>
							<select
								id="userType"
								value={userType}
								onChange={(e) => setUserType(e.target.value)}
								className="font-nunito text-base p-1 rounded-md bg-white text-black"
							>
								<option value="teacher">Teacher</option>
								<option value="student">Student</option>
							</select>
						{/* </div> */}

						<button className="mt-8 text-lg p-2 rounded-md bg-tertiary text-white hover:bg-white hover:text-primary">
							Sign In
						</button>
					</form>
					<p>
						Need an Account?
						<br />
						<span>
							<a href="/signup" className="text-white underline">
								Sign Up
							</a>
						</span>
					</p>
				</section>
			)}
		</div>
	);
}
