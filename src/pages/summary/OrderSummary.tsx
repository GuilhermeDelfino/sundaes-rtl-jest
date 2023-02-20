import React from "react";

import { OrderPhaseProps } from "@/app";
import { useOrderDetail } from "@/contexts/OrderDetail";
import { numberToDollar } from "@/utilities";

import { SummaryForm } from "./SummaryForm";

export const OrderSummary: React.FC<OrderPhaseProps> = ({ setOrderPhase }) => {
	const { totals, scoops, toppings } = useOrderDetail();
	const scoopsTotalFormated = numberToDollar(totals.scoops);
	const toppingsTotalFormated = numberToDollar(totals.toppings);
	const scoopsList = scoops.map(({ count, name }, index) => (
		<li key={index + name}>
			{count} {name}
		</li>
	));
	const toppingsList = toppings.map(({ name }, index) => (
		<li key={name + index}>{name}</li>
	));
	const toppingsRender = () =>
		toppings.length > 0 ? (
			<>
				<h2>Toppings: {toppingsTotalFormated}</h2>
				{toppingsList}
			</>
		) : (
			<></>
		);
	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops: {scoopsTotalFormated}</h2>
			{scoopsList}
			{toppingsRender()}
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	);
};
