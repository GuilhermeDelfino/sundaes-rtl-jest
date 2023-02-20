import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";

import { OrderEntry } from "../../../src/pages/entry/OrderEntry";
import { server } from "../../mocks/server";
import { render, screen, waitFor } from "../../utils/testing-library-utils";

describe("OrderEntry", () => {
	it("handlers error for scoops and topping routes", async () => {
		server.resetHandlers(
			rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
				res(ctx.status(500))
			),
			rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
				res(ctx.status(500))
			)
		);

		render(<OrderEntry />);

		const alerts = await screen.findAllByRole("alert");
		await waitFor(async () => {
			expect(alerts).toHaveLength(2);
		});
	});

	it("it not should be able to confirm if no scoops", async () => {
		render(<OrderEntry />);
		const user = userEvent.setup();

		const checkboxCherries = await screen.findByRole("checkbox", {
			name: /cherries/i,
		});
		const orderSundaeButton = screen.getByRole("button", {
			name: /order sundae/i,
		});
		await user.click(checkboxCherries);
		expect(orderSundaeButton).toBeDisabled();

		const inputChocolate = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		await user.clear(inputChocolate);
		await user.type(inputChocolate, "1");

		expect(orderSundaeButton).toBeEnabled();
	});

	it("should be red input when set invalid number in scoops input", async () => {
		const user = userEvent.setup();
		render(<OrderEntry />);

		const chocolateInput = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});

		const isinvalid = "is-invalid";
		await user.clear(chocolateInput);
		await user.type(chocolateInput, "-1");

		expect(chocolateInput).toHaveClass(isinvalid);
		await user.clear(chocolateInput);
		expect(chocolateInput).not.toHaveClass(isinvalid);
		await user.type(chocolateInput, "1.5");
		expect(chocolateInput).toHaveClass(isinvalid);
		await user.clear(chocolateInput);
		expect(chocolateInput).not.toHaveClass(isinvalid);
		await user.type(chocolateInput, "11");
		expect(chocolateInput).toHaveClass(isinvalid);

		expect(screen.getByText(/grand total/i)).toHaveTextContent(/0.00/);
	});
});
