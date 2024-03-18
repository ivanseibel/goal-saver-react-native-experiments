type GoalDTO = {
	id: string;
	name: string;
	total: number;
	current: number;
};

type TransactionDTO = {
	id: number;
	amount: number;
	goal_id: number;
	created_at: string;
};

type TransactionType = "deposit" | "withdrawal";

type CreateTransactionProps = {
	goalId: number;
	amount: number;
	type: TransactionType;
};
