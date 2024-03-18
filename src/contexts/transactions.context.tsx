import { useTransactionRepository } from "@/hooks/useTransactionRepository";
import { createContext, useContext, useState } from "react";

type TransactionsContextType = {
	transactions: TransactionDTO[];
	latestTransactions: TransactionDTO[];
	createTransaction: ({ goalId, amount, type }: CreateTransactionProps) => void;
	deleteTransaction: (id: number) => void;
	fetchTransactions: (goalId: number) => void;
	fetchLatestTransactions: () => void;
};

const TransactionsContext = createContext<TransactionsContextType>({
	transactions: [],
	latestTransactions: [],
	createTransaction: () => {},
	deleteTransaction: () => {},
	fetchTransactions: () => {},
	fetchLatestTransactions: () => {},
});

export const useTransactions = () => {
	return useContext(TransactionsContext);
};

export const TransactionsProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
	const [latestTransactions, setLatestTransactions] = useState<
		TransactionDTO[]
	>([]);

	const {
		createTransaction,
		getTransactions,
		getLatestTransaction,
		deleteTransaction,
	} = useTransactionRepository();

	const fetchTransactions = (goalId: number) => {
		const response = getTransactions(goalId);
		setTransactions(response);
	};

	const fetchLatestTransactions = () => {
		const response = getLatestTransaction();
		setLatestTransactions(response);
	};

	const handleCreateTransaction = ({
		goalId,
		amount,
		type,
	}: CreateTransactionProps) => {
		createTransaction({ goalId, amount, type });
		fetchTransactions(goalId);
		fetchLatestTransactions();
	};

	const handleDeleteTransaction = (id: number) => {
		deleteTransaction(id);

		const newTransactions = transactions.filter(
			(transaction) => transaction.id !== id,
		);

		const newLatestTransactions = latestTransactions.filter(
			(transaction) => transaction.id !== id,
		);

		setTransactions(newTransactions);
		setLatestTransactions(newLatestTransactions);
	};

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				latestTransactions,
				createTransaction: handleCreateTransaction,
				deleteTransaction: handleDeleteTransaction,
				fetchTransactions,
				fetchLatestTransactions,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
};
