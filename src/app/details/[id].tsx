import { BackButton } from "@/components/BackButton";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ProgressBar } from "@/components/ProgressBar";
import { Transactions } from "@/components/Transactions";
import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";

import type BottomSheetComponent from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useGoalRepository } from "@/hooks/useGoalRepository";
import { formatCurrencyCrossPlatform } from "@/utils/formatCurrency";
import { useTransactionRepository } from "@/hooks/useTransactionRepository";
import { transactionValidation } from "@/validations/transaction.validation";
import { useFormValidation } from "@/hooks/useFormValidation";

type TransactionType = "deposit" | "withdrawal";

const initialTransaction = {
	amount: "",
	type: "deposit",
};

const Details = () => {
	const [goal, setGoal] = useState<GoalDTO | null>(null);
	const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

	const routeParams = useLocalSearchParams();
	const goalId = Number(routeParams.id);

	const bottomSheetRef = useRef<BottomSheetComponent>(null);
	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

	const { getGoal } = useGoalRepository();
	const { createTransaction, getTransactions } = useTransactionRepository();

	const { errors, handleChange, handleSubmit, values } = useFormValidation(
		initialTransaction,
		transactionValidation,
	);

	const fetchGoal = () => {
		const response = getGoal(goalId.toString());
		setGoal(response);
	};

	const fetchTransactions = () => {
		const response = getTransactions(goalId);
		setTransactions(response);
	};

	const subtitle = useMemo(() => {
		if (!goal) return "";

		return `${formatCurrencyCrossPlatform(
			goal.current,
		)} of ${formatCurrencyCrossPlatform(goal.total)} saved`;
	}, [goal]);

	const percentage = useMemo(() => {
		if (!goal) return 0;

		return (goal.current / goal.total) * 100;
	}, [goal]);

	const onSubmit = () => {
		console.log("Form submitted", values);

		createTransaction(
			goalId,
			Number(values.amount),
			values.type as TransactionType,
		);

		Keyboard.dismiss();
		handleBottomSheetClose();
		fetchTransactions();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchGoal();
		fetchTransactions();
	}, [goalId]);

	return (
		<>
			<View className="flex-1 bg-gray-600 pt-9 pb-4 px-8 gap-7 relative">
				<BackButton />

				<Header title={goal?.name ?? ""} subtitle={subtitle} />

				<ProgressBar percentage={percentage} />

				<Transactions transactions={transactions} />

				<TouchableOpacity
					className="absolute bottom-4 right-4 bg-green-500 rounded-full w-16 h-16 items-center justify-center"
					onPress={handleBottomSheetOpen}
				>
					<MaterialIcons name="add" size={24} color={colors.black} />
				</TouchableOpacity>
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				title="New Goal"
				snapPoints={[0.001, 320]}
				onClose={handleBottomSheetClose}
			>
				<View className="gap-6">
					{errors.type && <Text style={{ color: "red" }}>{errors.type}</Text>}
					<TransactionTypeSelector
						onTypeChange={(type) => handleChange("type", type)}
						selectedType={values.type as TransactionType}
					/>

					{errors.amount && (
						<Text style={{ color: "red" }}>{errors.amount}</Text>
					)}
					<Input
						placeholder="Amount"
						onChangeText={(text) => handleChange("amount", text)}
						value={values.amount}
					/>

					<Button label="Create" onPress={() => handleSubmit(onSubmit)} />
				</View>
			</BottomSheet>
		</>
	);
};

export default Details;
