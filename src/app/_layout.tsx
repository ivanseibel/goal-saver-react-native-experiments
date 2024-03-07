import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
	return (
		<>
			<StatusBar style="light" />
			<Slot />
		</>
	);
};

export default Layout;
