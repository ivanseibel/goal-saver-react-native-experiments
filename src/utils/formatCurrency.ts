export function formatCurrency(value: number) {
	return value.toLocaleString(undefined, {
		style: "currency",
		currency: "EUR",
		signDisplay: "never",
	});
}

export const formatCurrencyCrossPlatform = (value: number) => {
	const currencySymbol = "EUR ";

	const absoluteValue = Math.abs(value);

	const formattedValue = absoluteValue.toFixed(2);

	return `${currencySymbol}${formattedValue}`;
};
