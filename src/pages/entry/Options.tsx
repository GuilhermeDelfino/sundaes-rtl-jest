import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { useOrderDetail } from "@/contexts/OrderDetail";

import { SCOOPS_PRICE, TOPPINGS_PRICE } from "../../constants/Price";
import { numberToDollar } from "../../utilities";
import { AlertBanner } from "../common/AlertBanner";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

export type OptionsProps = {
	optionsType: "scoops" | "toppings";
};
export type ResponseModelOptions = {
	name: string;
	imagePath: string;
};
export const Options: React.FC<OptionsProps> = (props) => {
	const { totals } = useOrderDetail();

	const [items, setItems] = useState<ResponseModelOptions[]>(
		[] as ResponseModelOptions[]
	);
	const [error, setError] = useState<boolean>(false);
	useEffect(() => {
		axios
			.get<ResponseModelOptions[]>(
				`http://localhost:3030/${props.optionsType}`
			)
			.then((res) => setItems(res.data))
			.catch(() => {
				setError(true);
			});
	}, [props.optionsType]);

	if (error) {
		return <AlertBanner />;
	}

	const ItemComponent =
		props.optionsType === "scoops" ? ScoopOption : ToppingOption;

	const optionsItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));
	const title =
		props.optionsType[0].toUpperCase() + props.optionsType.slice(1);
	const pricePerItem =
		props.optionsType === "scoops" ? SCOOPS_PRICE : TOPPINGS_PRICE;

	return (
		<>
			<h2>{title}</h2>
			<p>{numberToDollar(pricePerItem)} each</p>
			<p>
				{title} total: {numberToDollar(totals[props.optionsType])}
			</p>
			<Row>{optionsItems}</Row>
		</>
	);
};
