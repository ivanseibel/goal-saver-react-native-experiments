// import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyCrossPlatform } from "@/utils/formatCurrency";
import { View, Text } from "react-native";

type ComponentProps = Omit<TransactionDTO, "goal_id" | "id">;

export const Transaction = ({ amount, created_at }: ComponentProps) => {
	const textColor = amount > 0 ? "text-green-500" : "text-red-500";
	const normalizedAmount =
		amount > 0
			? `+ ${formatCurrencyCrossPlatform(amount)}`
			: `- ${formatCurrencyCrossPlatform(amount)}`;

	return (
		<View className="bg-gray-500 border border-gray-400 rounded h-16 w-full justify-between flex-row items-center px-4">
			<Text className={`text-base font-semiBold ${textColor}`}>
				{normalizedAmount}
			</Text>
			<Text className="text-gray-300 text-xs font-normal">{created_at}</Text>
		</View>
	);
};
