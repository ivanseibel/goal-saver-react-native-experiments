import { View, Text, Keyboard, StyleSheet } from "react-native";
import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { mocks } from "@/utils/mocks";
import { Transactions } from "@/components/Transactions";
import { BottomSheet } from "@/components/BottomSheet";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { useGoalRepository } from "@/hooks/useGoalRepository";

import type BottomSheetComponent from "@gorhom/bottom-sheet";
import { useFormValidation } from "@/hooks/useFormValidation";
import { goalValidation } from "@/validations/goal.validation";
import { useTransactionRepository } from "@/hooks/useTransactionRepository";

const initialGoal = {
	goalName: "",
	goalAmount: "",
};

const Index = () => {
	const [goals, setGoals] = useState<GoalDTO[]>([]);
	const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

	const bottomSheetRef = useRef<BottomSheetComponent>(null);
	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

	const { getGoals, createGoal } = useGoalRepository();
	const { getLatestTransaction } = useTransactionRepository();
	const { errors, handleChange, handleSubmit, values } = useFormValidation(
		initialGoal,
		goalValidation,
	);

	const handleDetails = (id: string) => {
		router.navigate(`/details/${id}`);
	};

	const fetchGoals = () => {
		try {
			const response = getGoals();
			setGoals(response);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTransactions = () => {
		const response = getLatestTransaction();
		setTransactions(response);
	};

	const onSubmit = () => {
		console.log("Form submitted", values);

		createGoal(values.goalName, Number(values.goalAmount));

		Keyboard.dismiss();
		handleBottomSheetClose();
		fetchGoals();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchGoals();
		fetchTransactions();
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

				<Transactions transactions={transactions} />
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				title="New Goal"
				snapPoints={[0.001, 280]}
				onClose={handleBottomSheetClose}
			>
				<View>
					<View className="gap-6">
						{errors.goalName && (
							<Text style={{ color: "red" }}>{errors.goalName}</Text>
						)}
						<Input
							placeholder="Goal name"
							onChangeText={(text) => handleChange("goalName", text)}
							returnKeyType="done"
							value={values.goalName}
						/>

						{errors.goalAmount && (
							<Text style={{ color: "red" }}>{errors.goalAmount}</Text>
						)}
						<Input
							placeholder="Amount"
							onChangeText={(text) => handleChange("goalAmount", text)}
							keyboardType="decimal-pad"
							returnKeyType="done"
							value={values.goalAmount}
						/>

						<Button label="Create" onPress={() => handleSubmit(onSubmit)} />
					</View>
				</View>
			</BottomSheet>
			{/* <BottomSheet snapPoints={["40%"]}>
				<View style={styles.contentContainer}>
					<BottomSheetTextInput value="Awesome 🎉" style={styles.textInput} />
				</View>
			</BottomSheet> */}
		</>
	);
};

const styles = StyleSheet.create({
	textInput: {
		alignSelf: "stretch",
		marginHorizontal: 12,
		marginBottom: 12,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "grey",
		color: "white",
		textAlign: "center",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default Index;
