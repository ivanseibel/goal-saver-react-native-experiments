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
	name: "",
	amount: "",
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

		createGoal(values.name, Number(values.amount));

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
				snapPoints={[0.001, 400]}
				onClose={handleBottomSheetClose}
			>
				<View>
					<View className="gap-6">
						{errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
						<Input
							placeholder="Goal name"
							onChangeText={(text) => handleChange("name", text)}
							returnKeyType="done"
							value={values.name}
						/>

						{errors.amount && (
							<Text style={{ color: "red" }}>{errors.amount}</Text>
						)}
						<Input
							placeholder="Amount"
							onChangeText={(text) => handleChange("amount", text)}
							keyboardType="decimal-pad"
							returnKeyType="done"
							value={values.amount}
						/>

						<Button label="Create" onPress={() => handleSubmit(onSubmit)} />
					</View>
				</View>
			</BottomSheet>
		</>
	);
};

export default Index;
