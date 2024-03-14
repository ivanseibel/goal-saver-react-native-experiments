import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { mocks } from "@/utils/mocks";
import { Transactions } from "@/components/Transactions";
import { BottomSheet } from "@/components/BottomSheet";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useGoalRepository } from "@/storage/useGoalRepository";

import type BottomSheetComponent from "@gorhom/bottom-sheet";

const Index = () => {
	const [goalName, setGoalName] = useState("");
	const [goalAmount, setGoalAmount] = useState("");
	const [goals, setGoals] = useState<GoalDTO[]>([]);

	const bottomSheetRef = useRef<BottomSheetComponent>(null);
	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

	const { getGoals } = useGoalRepository();

	const handleDetails = (id: string) => {
		router.navigate(`/details/${id}`);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchGoals = async () => {
			try {
				const response = getGoals();
				setGoals(response);
			} catch (error) {
				console.log(error);
			}
		};

		fetchGoals();
	}, []);

	return (
		<>
			<View className="flex-1 bg-gray-600 pt-9 pb-4 px-8">
				<Header title="Goal Saver" subtitle="Save today, enjoy tomorrow." />

				<Goals
					goals={goals}
					onPress={handleDetails}
					onAdd={handleBottomSheetOpen}
				/>

				<Transactions transactions={mocks.transactions} />
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				title="New Goal"
				snapPoints={[0.001, 284]}
				onClose={handleBottomSheetClose}
			>
				<View>
					<View className="gap-6">
						<Input
							placeholder="Goal name"
							onChangeText={(text) => setGoalName(text)}
							value={goalName}
						/>
						<Input
							placeholder="Amount"
							onChangeText={(text) => setGoalAmount(text)}
							value={goalAmount}
						/>

						<Button label="Create" />
					</View>
				</View>
			</BottomSheet>
		</>
	);
};

export default Index;
