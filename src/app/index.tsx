import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { Text, View } from "react-native";

const Index = () => {
	return (
		<View className="flex-1 bg-gray-600 py-9 px-8">
			<Header title="Goal Saver" subtitle="Save today, enjoy tomorrow." />

			<Goals goals={[]} onPress={() => {}} onAdd={() => {}} />
		</View>
	);
};

export default Index;
