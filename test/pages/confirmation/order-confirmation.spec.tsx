import { rest } from "msw";
import React from "react";

import { OrderConfirmation } from "../../../src/pages/confirmation/OrderConfirmation";
import { server } from "../../mocks/server";
import { getByText, render, screen } from "../../utils/testing-library-utils";

describe("OrderConfirmation", () => {
	it("should be show banner with error when returns error from request", async () => {
		server.resetHandlers(
			rest.post("http://localhost:3030/order", (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);
		const { unmount } = render(<OrderConfirmation />);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"An unexpected error ocurred."
		);
		unmount();
	});
});
