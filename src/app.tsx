import React from "react";
import { Container } from "react-bootstrap";

import { OrderDetailProvider } from "./contexts/OrderDetail";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";

export type OrderPhaseProps = {
	setOrderPhase: React.Dispatch<OrderPhase>;
};

export type OrderPhase = "inProgress" | "review" | "completed";
export const App: React.FC = () => {
	const [orderPhase, setOrderPhase] =
		React.useState<OrderPhase>("inProgress");

	let Component: React.FC<OrderPhaseProps> = OrderEntry;
	if (orderPhase === "inProgress") {
		Component = OrderEntry;
	} else if (orderPhase === "review") {
		Component = OrderSummary;
	} else {
		Component = OrderConfirmation;
	}

	return (
		<Container>
			<OrderDetailProvider>
				<Component setOrderPhase={setOrderPhase} />
			</OrderDetailProvider>
		</Container>
	);
};
