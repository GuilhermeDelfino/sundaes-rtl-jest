export function numberToDollar(value: number): string {
	return value.toLocaleString("en-US", {
		currency: "USD",
		style: "currency",
		minimumFractionDigits: 2,
	});
}
