import { useSQLiteContext } from "expo-sqlite/next";

export function useTransactionRepository() {
	const database = useSQLiteContext();

	const createTransaction = (
		goalId: number,
		amount: number,
		type: "deposit" | "withdraw",
	) => {
		const statement = database.prepareSync(
			"INSERT INTO transactions (goal_id, amount) VALUES ($goalId, $amount)",
		);

		statement.executeSync({
			$goalId: goalId,
			$amount: type === "withdraw" ? amount * -1 : amount,
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
      LIMIT 10
    `,
		);

		return result;
	};

	return { createTransaction, getTransactions, getLatestTransaction };
}
