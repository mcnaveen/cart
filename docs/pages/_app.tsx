import React from "react";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(<Component {...pageProps} />);
}
