import { TransactionsProvider } from "./transactions.context";

export const ContextAppProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return <TransactionsProvider>{children}</TransactionsProvider>;
};
