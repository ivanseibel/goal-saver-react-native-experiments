import { View, Text, ScrollView } from "react-native";
import { Transaction } from "./Transaction";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

type TransactionProp = Omit<TransactionDTO, "goal_id">;

type ComponentProps = {
	transactions: TransactionProp[];
};

export const Transactions = ({ transactions }: ComponentProps) => {
	return (
		<View className="flex-1">
			<Text className="text-white text-base font-semiBold mt-8 mb-3">
				Last transactions
			</Text>

			<View className="divider bg-gray-400 h-[1px] mb-6 w-full" />

			{transactions.length === 0 ? (
				<View className="flex-1 items-center justify-center">
					<MaterialIcons name="money-off" size={64} color={colors.gray[300]} />
					<Text className="text-gray-300 text-lg">No transactions yet</Text>
				</View>
			) : (
				<ScrollView
					contentContainerClassName="gap-2"
					showsVerticalScrollIndicator={false}
					className=""
				>
					{transactions.map((transaction) => (
						<Transaction key={transaction.id} {...transaction} />
					))}
				</ScrollView>
			)}
		</View>
	);
};
