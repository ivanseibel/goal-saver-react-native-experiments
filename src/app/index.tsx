import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { mocks } from "@/utils/mocks";

const Index = () => {
	const [goals, setGoals] = useState<GoalDTO[]>([]);

	useEffect(() => {
		const fetchGoals = async () => {
			try {
				const response = mocks.goals;
				setGoals(response);
			} catch (error) {
				console.log(error);
			}
		};

		fetchGoals();
	}, []);

	return (
		<View className="flex-1 bg-gray-600 py-9 px-8">
			<Header title="Goal Saver" subtitle="Save today, enjoy tomorrow." />

			<Goals goals={goals} onPress={() => {}} onAdd={() => {}} />
		</View>
	);
};

export default Index;
