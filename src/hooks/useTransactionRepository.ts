import { useSQLiteContext } from "expo-sqlite/next";

export function useTransactionRepository() {
	const database = useSQLiteContext();

	const createTransaction = ({
		goalId,
		amount,
		type,
	}: CreateTransactionProps) => {
		const statement = database.prepareSync(
			"INSERT INTO transactions (goal_id, amount) VALUES ($goalId, $amount)",
		);

		statement.executeSync({
			$goalId: goalId,
			$amount: type === "withdrawal" ? amount * -1 : amount,
			$type: type,
		});
	};

	const getTransactions = (goalId: number) => {
		const result = database.getAllSync<TransactionDTO>(
			`
      SELECT 
        * 
      FROM transactions 
      WHERE 
        goal_id = $goalId
    `,
			{ $goalId: goalId },
		);

		return result;
	};

	const getLatestTransaction = () => {
		const result = database.getAllSync<TransactionDTO>(
			`
      SELECT 
        * 
      FROM transactions 
      ORDER BY created_at DESC
      LIMIT 5
    `,
		);

		return result;
	};

	const deleteTransaction = (id: number) => {
		const statement = database.prepareSync(
			"DELETE FROM transactions WHERE id = $id",
		);

		statement.executeSync({ $id: id });
	};

	return {
		createTransaction,
		getTransactions,
		getLatestTransaction,
		deleteTransaction,
	};
}
