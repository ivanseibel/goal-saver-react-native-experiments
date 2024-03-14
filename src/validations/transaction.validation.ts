export const transactionValidation = {
	amount: (value: string): string | null => {
		console.log("value", value);

		const trimmedValue = value.trim();
		const numericValue = Number.parseFloat(trimmedValue);

		// Checks if the value is numeric and matches the input value after conversion to a string
		// Direct comparison might fail for decimal values due to floating-point representation
		// The approach is to check if round-tripping (string -> number -> string) maintains the original value
		const isNumeric =
			!Number.isNaN(numericValue) && trimmedValue === numericValue.toString();

		if (!trimmedValue) return "Transaction amount is required";
		if (!isNumeric) return "Transaction amount must be a number";
		if (numericValue < 1) return "Transaction amount must be greater than 0";

		return null;
	},

	type: (value: string): string | null => {
		// Validates that the transaction type is either 'deposit' or 'withdrawal'
		if (value !== "deposit" && value !== "withdrawal")
			return "Transaction type is invalid";
		return null;
	},
};
