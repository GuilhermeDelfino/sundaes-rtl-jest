import userEvent from "@testing-library/user-event";
import React from "react";

import { Options } from "../../../src/pages/entry/Options";
import { OrderEntry } from "../../../src/pages/entry/OrderEntry";
import { render, screen, waitFor } from "../../utils/testing-library-utils";

describe("totalUpdates", () => {
	it("update scoop subtotal when scoops changes", async () => {
		const user = userEvent.setup();
		render(<Options optionsType="scoops" />);

		// make sure total starts out at $0.00
		const scoopSubtotal = screen.getByText(/Scoops total/i);
		expect(scoopSubtotal).toHaveTextContent("$0.00");

		// update vanilla scoops to 1, and check subtotal
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});

		await user.clear(vanillaInput);
		await user.type(vanillaInput, "1");
		expect(scoopSubtotal).toHaveTextContent("$2.00");

		// update chocolate scoops to 2, and check subtotal
		const chocolateInput = await screen.findByRole("spinbutton", {
			name: "Chocolate",
		});

		await user.clear(chocolateInput);
		await user.type(chocolateInput, "2");
		expect(scoopSubtotal).toHaveTextContent("$6.00");
	});

	it("update toppings subtotal when scoops changes", async () => {
		const user = userEvent.setup();
		render(<Options optionsType="toppings" />);

		expect(screen.getByText(/1.50 each/i));

		const totals = screen.getByText(/Toppings total/);

		expect(totals).toHaveTextContent("0.00");

		const cherriesCheck = await screen.findByRole("checkbox", {
			name: "Cherries",
		});
		await user.click(cherriesCheck);

		expect(totals).toHaveTextContent("1.50");

		await user.click(cherriesCheck);

		expect(totals).toHaveTextContent("0.0");
	});
});

describe("grand total", () => {
	it("should be initialize with 0", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByText(/grand total/i);

		expect(grandTotal).toHaveTextContent("0.00");
	});
	it("should be change grand total if scoops added first", async () => {
		const user = userEvent.setup();
		render(<OrderEntry />);

		const grandTotal = screen.getByText(/grand total/i);
		const scoopInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});

		await user.clear(scoopInput);
		await user.type(scoopInput, "1");

		expect(grandTotal).toHaveTextContent("2.00");
	});
	it("should be change grand total if toppings added first", async () => {
		const user = userEvent.setup();
		render(<OrderEntry />);

		const grandTotal = screen.getByText(/grand total/i);
		const toppingInput = await screen.findByRole("checkbox", {
			name: "Cherries",
		});

		await user.click(toppingInput);

		expect(grandTotal).toHaveTextContent("1.50");
	});
	it("grand total should be change if an item is removed", async () => {
		const user = userEvent.setup();
		render(<OrderEntry />);

		const grandTotal = screen.getByText(/grand total/i);
		const toppingInput = await screen.findByRole("checkbox", {
			name: "Cherries",
		});

		await user.click(toppingInput);
		await user.click(toppingInput);

		expect(grandTotal).toHaveTextContent("0.00");
	});
});
