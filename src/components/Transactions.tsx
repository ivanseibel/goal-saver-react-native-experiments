import { View, Text, ScrollView } from "react-native";
import { Transaction } from "./Transaction";

type TransactionProp = Omit<TransactionDTO, "goal_id">;

type ComponentProps = {
	transactions: TransactionProp[];
};

export const Transactions = ({ transactions }: ComponentProps) => {
	return (
		<View>
			<Text className="text-white text-base font-semiBold mt-8 mb-3">
				Last transactions
			</Text>

			<View className="divider bg-gray-400 h-[1px] mb-6 w-full" />

			<ScrollView contentContainerClassName="gap-2">
				{transactions.map((transaction) => (
					<Transaction key={transaction.id} {...transaction} />
				))}
			</ScrollView>
		</View>
	);
};
