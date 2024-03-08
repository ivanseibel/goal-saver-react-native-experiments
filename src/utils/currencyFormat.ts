export function currencyFormat(value: number) {
	return value.toLocaleString("eu", {
		style: "currency",
		currency: "EUR",
	});
}
