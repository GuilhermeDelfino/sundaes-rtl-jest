import userEvent from "@testing-library/user-event";
import React from "react";

import { SummaryForm } from "../../../src/pages/summary/SummaryForm";
import { render, screen } from "../../utils/testing-library-utils";

const makeSut = () => {
	const view = render(<SummaryForm />);
	return {
		sut: view,
	};
};
describe("SummaryForm", () => {
	it("Initial Conditions", () => {
		makeSut();
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		expect(checkbox).not.toBeChecked();
		const confirmButton = screen.getByRole(`button`, {
			name: /confirm order/i,
		});
		expect(confirmButton).toBeDisabled();
	});

	it("Checkbox enables button on first click and disables on second click", async () => {
		makeSut();
		const user = userEvent.setup();
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		const confirmButton = screen.getByRole(`button`, {
			name: /confirm order/i,
		});
		await user.click(checkbox);
		expect(confirmButton).toBeEnabled();

		await user.click(checkbox);
		expect(confirmButton).toBeDisabled();
	});

	it("Popover responds to hover", async () => {
		const user = userEvent.setup();
		const {
			sut: { unmount },
		} = makeSut();

		// popover starts out hidden
		const popoverNull = screen.queryByText(
			/No ice cream will actually be delivered/i
		);
		expect(popoverNull).not.toBeInTheDocument();

		// popover appears on mouseover of checkbox label
		const terms = screen.getByText(/terms and conditions/i);
		await user.hover(terms);
		const popover = screen.getByText(
			/No ice cream will actually be delivered/i
		);
		expect(popover).toBeInTheDocument();

		// popover disappears when we mouse out
		await user.unhover(terms);
		const popoverNullAgain = screen.queryByText(
			/No ice cream will actually be delivered/i
		);
		expect(popoverNullAgain).not.toBeInTheDocument();

		unmount();
	});
});
