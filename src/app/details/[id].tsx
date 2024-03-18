import { BackButton } from "@/components/BackButton";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ProgressBar } from "@/components/ProgressBar";
import { Transactions } from "@/components/Transactions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";

import type BottomSheetComponent from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useGoalRepository } from "@/hooks/useGoalRepository";
import { formatCurrencyCrossPlatform } from "@/utils/formatCurrency";
import { transactionValidation } from "@/validations/transaction.validation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useTransactions } from "@/contexts/transactions.context";

const initialTransaction = {
	amount: "",
	type: "deposit",
};

const Details = () => {
	const [goal, setGoal] = useState<GoalDTO | null>(null);

	const routeParams = useLocalSearchParams();
	const goalId = Number(routeParams.id);

	const bottomSheetRef = useRef<BottomSheetComponent>(null);
	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

	const { getGoal } = useGoalRepository();
	const { createTransaction, fetchTransactions, transactions } =
		useTransactions();
	const { errors, handleChange, handleSubmit, values } = useFormValidation(
		initialTransaction,
		transactionValidation,
	);

	const fetchGoal = () => {
		const response = getGoal(goalId.toString());
		setGoal(response);
	};

	const onSubmit = () => {
		createTransaction({
			goalId,
			amount: Number(values.amount),
			type: values.type as TransactionType,
		});

		Keyboard.dismiss();
		handleBottomSheetClose();
		fetchTransactions(goalId);
	};

	const percentage = useMemo(() => {
		return ((goal?.current ?? 0) / (goal?.total ?? 1)) * 100;
	}, [goal]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchGoal();
		fetchTransactions(goalId);
	}, [goalId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchGoal();
	}, [transactions]);

	return (
		<>
			<View className="flex-1 bg-gray-600 pt-9 pb-4 px-8 gap-7 relative">
				<BackButton />

				<Header
					title={goal?.name ?? ""}
					subtitle={`${formatCurrencyCrossPlatform(
						goal?.current ?? 0,
					)} of ${formatCurrencyCrossPlatform(goal?.total ?? 0)} saved`}
				/>

				<ProgressBar percentage={percentage} />

				<Transactions transactions={transactions} canDelete />

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
						keyboardType="decimal-pad"
						value={values.amount}
					/>

					<Button label="Create" onPress={() => handleSubmit(onSubmit)} />
				</View>
			</BottomSheet>
		</>
	);
};

export default Details;
