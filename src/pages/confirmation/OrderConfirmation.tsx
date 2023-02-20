import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

import { OrderPhaseProps } from "@/app";
import { useOrderDetail } from "@/contexts/OrderDetail";

import { AlertBanner } from "../common/AlertBanner";

export type CreateOrderResponse = {
	orderNumber: number;
};

export const OrderConfirmation: React.FC<OrderPhaseProps> = ({
	setOrderPhase,
}) => {
	const { resetOrder } = useOrderDetail();
	const [orderNumber, setOrderNumber] = React.useState<number | null>(null);
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		axios
			.post<CreateOrderResponse>("http://localhost:3030/order")
			.then((res) => {
				setOrderNumber(res.data.orderNumber);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	function handleClick() {
		resetOrder();
		setOrderPhase("inProgress");
	}

	if (error) {
		return (
			<div style={{ textAlign: "center" }}>
				<AlertBanner />
				<Button onClick={handleClick}>Create new order</Button>
			</div>
		);
	}
	if (orderNumber != null) {
		return (
			<div style={{ textAlign: "center" }}>
				<h1>Thank you!</h1>
				<p>Your order number is {orderNumber}</p>
				<p style={{ fontSize: "25%" }}>
					as per terms and conditions, nothing will happen now
				</p>
				<Button onClick={handleClick}>Create new order</Button>
			</div>
		);
	}
	return <div>Loading</div>;
};
