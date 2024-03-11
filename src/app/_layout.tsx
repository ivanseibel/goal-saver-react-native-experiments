import "@/libs/dayjs";
import "@/styles/global.css";

import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
	useFonts,
	OpenSans_400Regular,
	OpenSans_600SemiBold,
	OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
	const [fontsLoaded] = useFonts({
		OpenSans_400Regular,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
	});

	const hideSplashScreen = async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		SplashScreen.hideAsync();
	};

	if (fontsLoaded) {
		hideSplashScreen();
	} else return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[600] }}>
				<StatusBar style="light" />
				<Slot />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default Layout;
