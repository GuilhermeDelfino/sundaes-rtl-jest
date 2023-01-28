import { render } from "@testing-library/react";
import React from "react";

const App = () => <div>Oi</div>;
describe("react test", () => {
	it("should be able to return a component", () => {
		const { getByText, baseElement } = render(<App />);

		expect(baseElement).toBeInTheDocument();
		expect(getByText(/oi/i)).toBeInTheDocument();
	});
});
