import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

import { OrderPhaseProps } from "@/app";
import { useOrderDetail } from "@/contexts/OrderDetail";
import { numberToDollar } from "@/utilities";

import { Options } from "./Options";

export const OrderEntry: React.FC<OrderPhaseProps> = ({ setOrderPhase }) => {
	const [isButtonEnable, setButtonEnable] = React.useState<boolean>(false);
	const {
		totals: { scoops, toppings },
	} = useOrderDetail();

	useEffect(() => {
		setButtonEnable(scoops > 0);
	}, [scoops]);
	const grandTotal = numberToDollar(scoops + toppings);
	return (
		<div>
			<h1>Design your sundae!</h1>
			<Options optionsType="scoops" />
			<Options optionsType="toppings" />
			<h2>Grand total: {grandTotal}</h2>
			<Button
				disabled={!isButtonEnable}
				onClick={() => setOrderPhase("review")}
			>
				Order Sundae!
			</Button>
		</div>
	);
};
