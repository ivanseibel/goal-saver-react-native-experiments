import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { mocks } from "@/utils/mocks";
import { Transactions } from "@/components/Transactions";
import { BottomSheet } from "@/components/BottomSheet";
import BottomSheetComponent from "@gorhom/bottom-sheet";
import { Input } from "@/components/Input";

const Index = () => {
	const [goals, setGoals] = useState<GoalDTO[]>([]);
	const bottomSheetRef = useRef<BottomSheetComponent>(null);

	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

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
		<>
			<View className="flex-1 bg-gray-600 py-9 px-8">
				<Header title="Goal Saver" subtitle="Save today, enjoy tomorrow." />

				<Goals goals={goals} onPress={() => {}} onAdd={handleBottomSheetOpen} />

				<Transactions transactions={mocks.transactions} />
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				title="New Goal"
				snapPoints={[0.01, 284]}
				onClose={handleBottomSheetClose}
			>
				<View>
					<View className="gap-4">
						<Input placeholder="Goal name" />
						<Input placeholder="Amount" />
					</View>
				</View>
			</BottomSheet>
		</>
	);
};

export default Index;
