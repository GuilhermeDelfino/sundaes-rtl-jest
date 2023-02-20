import React from "react";

import { Options } from "../../../src/pages/entry/Options";
import { render, screen } from "../../utils/testing-library-utils";

describe("Options", () => {
	it(`display image for each scoop option from server`, async () => {
		render(<Options optionsType="scoops" />);

		// find images
		const scoopImages = await screen.findAllByRole<HTMLImageElement>(
			`img`,
			{
				name: /scoop$/i,
			}
		);
		expect(scoopImages).toHaveLength(2);

		// confirm alt text of images
		const altText = scoopImages.map((el) => el.alt);
		expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
	});
	it(`display image for each topping option from server`, async () => {
		render(<Options optionsType="toppings" />);

		// find images
		const scoopImages = await screen.findAllByRole<HTMLImageElement>(
			`img`,
			{
				name: /topping$/i,
			}
		);
		expect(scoopImages).toHaveLength(3);

		// confirm alt text of images
		const altText = scoopImages.map((el) => el.alt);
		expect(altText).toEqual([
			"Cherries topping",
			"M&Ms topping",
			"Hot fudge topping",
		]);
	});
});
