import { useSQLiteContext } from "expo-sqlite/next";

export function useGoalRepository() {
	const database = useSQLiteContext();

	const createGoal = (name: string, total: number) => {
		const statement = database.prepareSync(
			"INSERT INTO goals (name, total) VALUES ($name, $total)",
		);

		statement.executeSync({ $name: name, $total: total });
	};

	const getGoals = () => {
		const result = database.getAllSync<GoalDTO>(`
      SELECT 
        g.id, 
        g.name, 
        g.total, 
        COALESCE(SUM(t.amount), 0) AS current
      FROM goals AS g
      LEFT JOIN transactions t ON t.goal_id = g.id
      GROUP BY g.id, g.name, g.total
    `);

		return result;
	};

	const getGoal = (id: string) => {
		const statement = database.prepareSync(`
			SELECT 
				g.id, 
				g.name, 
				g.total, 
				COALESCE(SUM(t.amount), 0) AS current
			FROM goals AS g
			LEFT JOIN transactions t ON t.goal_id = g.id
			WHERE 
				g.id = $id
			GROUP BY 
				g.id, g.name, g.total
		`);

		const result = statement.executeSync<GoalDTO>({ $id: id });

		return result.getFirstSync();
	};

	return { createGoal, getGoals, getGoal };
}
