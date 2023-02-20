import { rest } from "msw";

import { CreateOrderResponse } from "../../src/pages/confirmation/OrderConfirmation";
import { ResponseModelOptions } from "../../src/pages/entry/Options";

export const handlers = [
	rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
		return res(
			ctx.json<ResponseModelOptions[]>([
				{
					name: "Chocolate",
					imagePath: "/images/chocolate.png",
				},
				{
					name: "Vanilla",
					imagePath: "/images/vanilla.png",
				},
			])
		);
	}),

	rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
		return res(
			ctx.json<ResponseModelOptions[]>([
				{
					name: "Cherries",
					imagePath: "/images/cherries.png",
				},
				{
					name: "M&Ms",
					imagePath: "/images/m-and-m.png",
				},
				{
					name: "Hot fudge",
					imagePath: "/images/hot-fudge.png",
				},
			])
		);
	}),
	rest.post("http://localhost:3030/order", (req, res, ctx) => {
		return res(
			ctx.json<CreateOrderResponse>({
				orderNumber: Math.random() * 1000000,
			})
		);
	}),
];
