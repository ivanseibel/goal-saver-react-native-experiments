import dayjs from "dayjs";

const transactions = [
	{
		id: "1",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 100,
	},
	{
		id: "2",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -90,
	},
];

const goal = {
	id: "1",
	name: "Computer",
	current: 2500,
	total: 3000,
	percentage: (2500 / 3000) * 100,
	transactions,
};

const goals = [
	{
		id: "1",
		name: "Computer",
		current: 2500,
		total: 3000,
		percentage: (2500 / 3000) * 100,
		transactions,
	},
	{
		id: "2",
		name: "Car",
		current: 1000,
		total: 8000,
		percentage: (1000 / 8000) * 100,
		transactions,
	},
	{
		id: "3",
		name: "House",
		current: 5000,
		total: 10000,
		percentage: (5000 / 10000) * 100,
		transactions,
	},
];

export const mocks = {
	goal,
	goals,
	transactions,
};
