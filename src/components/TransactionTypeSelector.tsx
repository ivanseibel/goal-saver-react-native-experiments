import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type TransactionType = "deposit" | "withdrawal";

interface ComponentProps {
	onTypeChange: (type: TransactionType) => void;
	selectedType: TransactionType;
}

export const TransactionTypeSelector = ({
	onTypeChange,
	selectedType,
}: ComponentProps) => {
	// const [selectedType, setSelectedType] = useState<"deposit" | "withdrawal">(
	// 	"deposit",
	// );

	const handleTypeChange = (type: "deposit" | "withdrawal") => {
		onTypeChange(type);
	};

	return (
		<View className="flex-row">
			<TouchableOpacity
				className={`flex-row items-center gap-2 border border-gray-400 px-4 py-2 rounded-md m-1  ${
					selectedType === "deposit" ? "bg-gray-400" : "bg-transparent"
				}`}
				onPress={() => handleTypeChange("deposit")}
			>
				<MaterialIcons name="add" size={14} color={colors.green[500]} />
				<Text
					className={`text-white ${
						selectedType === "deposit" ? "" : "text-gray-300"
					}`}
				>
					Deposit
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className={`flex-row items-center gap-2 border border-gray-400 px-4 py-2 rounded-md m-1 ${
					selectedType === "withdrawal" ? "bg-gray-400" : "bg-transparent"
				}`}
				onPress={() => handleTypeChange("withdrawal")}
			>
				<MaterialIcons name="remove" size={14} color={colors.red[500]} />
				<Text
					className={`text-white text-sm ${
						selectedType === "withdrawal" ? "" : "text-gray-300"
					}`}
				>
					Withdrawal
				</Text>
			</TouchableOpacity>
		</View>
	);
};
