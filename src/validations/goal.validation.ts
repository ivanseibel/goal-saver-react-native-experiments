export const goalValidation = {
	name: (value: string) => {
		if (!value.trim()) return "Goal name is required";
		if (value.length < 3) return "Goal name must be at least 3 characters";
		return null;
	},
	amount: (value: string) => {
		const trimmedValue = value.trim();
		const numericValue = Number.parseFloat(trimmedValue);

		// Check if the value is numeric and matches the input value after conversion to a string
		// Direct comparison may fail for decimal values due to floating-point representation
		// An approach is to check if round-tripping (string -> number -> string) maintains the original value
		const isNumeric =
			!Number.isNaN(numericValue) && trimmedValue === numericValue.toString();

		if (!trimmedValue) return "Goal amount is required";
		if (!isNumeric) return "Goal amount must be a number";
		if (numericValue < 1) return "Goal amount must be greater than 0";

		return null;
	},
};
