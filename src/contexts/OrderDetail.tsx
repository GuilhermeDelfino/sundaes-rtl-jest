import React from "react";

import { SCOOPS_PRICE, TOPPINGS_PRICE } from "../constants/Price";

export type ItemOptions = {
	name: string;
	count: number;
};
type OptionType = "scoops" | "toppings";
export type OrderDetailResponse = {
	scoops: ItemOptions[]; // {name: Chocolate, count: 1};
	toppings: ItemOptions[];
	addOrUpdateItem: (optionType: OptionType, newItem: ItemOptions) => void;
	resetOrder: () => void;
	totals: {
		scoops: number;
		toppings: number;
	};
};
export const OrderDetail = React.createContext<OrderDetailResponse>(
	{} as OrderDetailResponse
);

export const useOrderDetail = (): OrderDetailResponse => {
	const ctx = React.useContext<OrderDetailResponse>(OrderDetail);

	if (!ctx) {
		throw new Error(
			"useOrderDetails must be called inside a OrderDetailProvider"
		);
	}

	return ctx;
};

export const OrderDetailProvider: React.FC<{ children: React.ReactNode }> = (
	props
) => {
	type OptionsCountType = {
		scoops: ItemOptions[];
		toppings: ItemOptions[];
	};
	const [optionsCount, setOptionsCount] = React.useState<OptionsCountType>({
		scoops: [],
		toppings: [],
	} as OptionsCountType);

	function addOrUpdateItem(
		optionType: "scoops" | "toppings",
		newItem: ItemOptions
	) {
		const options = { ...optionsCount };
		const oldItemIndex = options[optionType].findIndex(
			(opt) => opt.name === newItem.name
		);
		if (oldItemIndex >= 0) {
			options[optionType][oldItemIndex] = newItem;
		} else {
			options[optionType].push(newItem);
		}

		setOptionsCount(options);
	}

	function resetOrder() {
		setOptionsCount({} as OptionsCountType);
	}

	function calculateTotal(optionType: OptionType) {
		if (!optionsCount[optionType]) return 0;
		const totalCount = optionsCount[optionType].reduce(
			(prev, current) => prev + current.count,
			0
		);

		const price = optionType === "scoops" ? SCOOPS_PRICE : TOPPINGS_PRICE;

		return totalCount * price;
	}

	const totals = {
		scoops: calculateTotal("scoops"),
		toppings: calculateTotal("toppings"),
	};
	const value: OrderDetailResponse = {
		scoops: optionsCount.scoops,
		toppings: optionsCount.toppings,
		addOrUpdateItem,
		resetOrder,
		totals,
	};

	return (
		<OrderDetail.Provider value={value}>
			{props.children}
		</OrderDetail.Provider>
	);
};
