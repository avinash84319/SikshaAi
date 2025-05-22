// import { createContext, useState } from 'react'

// const AuthContext = createContext({})
// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({})
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
// export default AuthContext  
// -----------------------------------------------------------------------
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const response = await axios.post(
					import.meta.env.VITE_HOST + "/auth/verify",
					{ accessToken: token },
					{ headers: { "Content-Type": "application/json" } }
				);
				if (response?.data?.valid) {
					setAuth({
						user_id: response.data.user_id,
						name: response.data.name,
						email: response.data.email,
						accessToken: token,
					});
				}
			} catch (err) {
				console.error("Token verification failed", err);
				localStorage.removeItem("accessToken");
				localStorage.removeItem("user_id");
			} finally {
				setLoading(false);
			}
		};

		verifyToken();
	}, []);

	if (loading) {
		return <div className="text-center mt-20 text-xl">Loading...</div>;
	}

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
