// import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyCrossPlatform } from "@/utils/formatCurrency";
import { View, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactions } from "@/contexts/transactions.context";
import { colors } from "@/styles/colors";

type ComponentProps = Omit<TransactionDTO, "goal_id"> & {
	canDelete?: boolean;
};

export const Transaction = ({
	amount,
	id,
	created_at,
	canDelete = false,
}: ComponentProps) => {
	const { deleteTransaction } = useTransactions();

	const textColor = amount > 0 ? "text-green-500" : "text-red-500";
	const normalizedAmount =
		amount > 0
			? `+ ${formatCurrencyCrossPlatform(amount)}`
			: `- ${formatCurrencyCrossPlatform(amount)}`;

	const handleDeleteTransaction = () => {
		Alert.alert(
			"Delete Transaction",
			"Are you sure you want to delete this transaction?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => deleteTransaction(Number(id)),
				},
			],
		);
	};

	return (
		<View className="bg-gray-500 border border-gray-400 rounded h-16 w-full justify-between flex-row items-center px-4">
			<Text className={`text-base font-semiBold ${textColor}`}>
				{normalizedAmount}
			</Text>
			<Text className="text-gray-300 text-xs font-normal">{created_at}</Text>

			{canDelete && (
				<MaterialIcons
					name="delete"
					size={24}
					color={colors.gray[300]}
					className="cursor-pointer"
					onPress={handleDeleteTransaction}
				/>
			)}
		</View>
	);
};
