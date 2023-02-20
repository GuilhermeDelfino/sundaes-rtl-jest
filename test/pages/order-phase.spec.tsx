import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { hasUncaughtExceptionCaptureCallback } from "process";
import React from "react";

import { App } from "../../src/app";

describe("Order phases", () => {
	it("happy path", async () => {
		const user = userEvent.setup();

		const { unmount } = render(<App />);

		const vanillaInput = await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		await user.clear(vanillaInput);
		await user.type(vanillaInput, "1");

		const chocolateInput = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		await user.clear(chocolateInput);
		await user.type(chocolateInput, "2");

		const cherriesCheckbox = await screen.findByRole("checkbox", {
			name: /cherries/i,
		});

		await user.click(cherriesCheckbox);

		const orderSummaryButton = screen.getByRole("button", {
			name: /order sundae/i,
		});

		await user.click(orderSummaryButton);

		const summaryHeading = screen.getByRole("heading", {
			name: /order summary/i,
		});
		expect(summaryHeading).toBeInTheDocument();

		const scoopsHeading = screen.getByRole("heading", {
			name: /scoops: \$6.00/i,
		});
		expect(scoopsHeading).toBeInTheDocument();

		const toppingsHeading = screen.getByRole("heading", {
			name: /toppings: \$1.50/i,
		});
		expect(toppingsHeading).toBeInTheDocument();

		expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument();
		expect(screen.getByText(/2 chocolate/i)).toBeInTheDocument();
		expect(screen.getByText(/cherries/i)).toBeInTheDocument();

		const checkboxTerms = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});

		await user.click(checkboxTerms);

		const confirmOrderButton = screen.getByRole("button", {
			name: /confirm order/i,
		});

		await user.click(confirmOrderButton);

		const loading = screen.getByText(/loading/i);
		expect(loading).toBeInTheDocument();

		const thankyouHeading = await screen.findByRole("heading", {
			name: /thank you/i,
		});

		expect(thankyouHeading).toBeInTheDocument();

		const notLoading = screen.queryByText(/loading/i);
		expect(notLoading).not.toBeInTheDocument();

		const orderNumber = await screen.findByText(/order number/i);
		expect(orderNumber).toBeInTheDocument();

		const newOrderButton = screen.getByRole("button", {
			name: /new order/i,
		});
		expect(newOrderButton).toBeInTheDocument();

		await user.click(newOrderButton);

		const scoopsTotal = await screen.findByText(/scoops total: \$0.00/i);
		expect(scoopsTotal).toBeInTheDocument();
		const toppingsTotal = await screen.findByText(
			/toppings total: \$0.00/i
		);
		expect(toppingsTotal).toBeInTheDocument();

		unmount();
	});

	it("new order with no toppings", async () => {
		const user = userEvent.setup();
		const { unmount } = render(<App />);
		const inputChocolate = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		await user.clear(inputChocolate);
		await user.type(inputChocolate, "2");

		await user.click(
			screen.getByRole("button", {
				name: /order sundae/i,
			})
		);

		expect(await screen.findByText(/scoops:/i)).toHaveTextContent(/\$4.00/);

		expect(screen.queryByText(/toppings:/i)).not.toBeInTheDocument();

		unmount();
	});
});
