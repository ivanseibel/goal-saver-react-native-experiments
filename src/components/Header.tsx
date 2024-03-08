import { Text, View } from "react-native";

type ComponentProps = {
	title: string;
	subtitle: string;
};

export const Header = ({ title, subtitle }: ComponentProps) => {
	return (
		<View className="justify-center gap-1">
			<Text className="text-4xl font-bold text-white">{title}</Text>
			<Text className="text-4 text-white leading-5">{subtitle}</Text>
		</View>
	);
};
