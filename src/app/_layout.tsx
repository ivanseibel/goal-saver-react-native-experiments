import "@/styles/global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
	useFonts,
	OpenSans_400Regular,
	OpenSans_600SemiBold,
	OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

const Layout = () => {
	const [fontsLoaded] = useFonts({
		OpenSans_400Regular,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="light" />
			<Slot />
		</>
	);
};

export default Layout;
