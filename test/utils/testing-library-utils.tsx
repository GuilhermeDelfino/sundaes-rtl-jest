/* eslint-disable import/export */
import { render, RenderOptions } from "@testing-library/react";

import { OrderDetailProvider } from "../../src/contexts/OrderDetail";

const renderWithOrderDetailContext = (
	ui: React.ReactElement,
	options?: RenderOptions
) =>
	render(ui, {
		wrapper: OrderDetailProvider,
		...options,
	});

export * from "@testing-library/react";
export { renderWithOrderDetailContext as render };
