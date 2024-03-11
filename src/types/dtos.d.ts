type GoalDTO = {
	id: string;
	name: string;
	total: number;
	current: number;
};

type TransactionDTO = {
	id: string;
	amount: number;
	goal_id: number;
	created_at: string;
};
