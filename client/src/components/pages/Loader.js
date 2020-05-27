import React from "react";
import loader from "../../images/loader.gif";

const Loader = () => {
	return (
		<>
			<img src={loader} alt="loading..." style={{ width: "100%" }} />
		</>
	);
};

export default Loader;
