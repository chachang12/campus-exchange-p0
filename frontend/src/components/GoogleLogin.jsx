import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
import { googlelogo } from "../assets";
                              

export default (props) => {
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await googleAuth(authResult.code);
				props.setUser(result.data.data.user);
				alert("successfuly logged in");
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<button onClick={googleLogin} className="">
			<img src={googlelogo} alt="google" className="w-10 h-10" />
		</button>
	);
};