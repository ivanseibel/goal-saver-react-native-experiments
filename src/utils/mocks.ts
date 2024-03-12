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
	{
		id: "3",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 50,
	},
	{
		id: "4",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -30,
	},
	{
		id: "5",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 100,
	},
	{
		id: "6",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -90,
	},
	{
		id: "7",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 50,
	},
	{
		id: "8",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -30,
	},
	{
		id: "9",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 100,
	},
	{
		id: "10",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -90,
	},
	{
		id: "11",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 50,
	},
	{
		id: "12",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: -30,
	},
	{
		id: "13",
		created_at: dayjs(new Date()).format("DD/MM/YYYY [at] HH:mm"),
		amount: 100,
	},
	{
		id: "14",
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
