import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useOrderDetail } from "@/contexts/OrderDetail";

import { ResponseModelOptions } from "./Options";

export type ToppingOptionProps = ResponseModelOptions;
export const ToppingOption: React.FC<ToppingOptionProps> = (props) => {
	const { addOrUpdateItem } = useOrderDetail();
	const handleCheck = () => {
		setChecked(!checked);
		addOrUpdateItem("toppings", {
			count: checked ? 0 : 1,
			name: props.name,
		});
	};
	const [checked, setChecked] = React.useState<boolean>(false);
	return (
		<Col
			xs={12}
			sm={6}
			md={4}
			lg={3}
			style={{ textAlign: "center" }}
		>
			<img
				style={{ width: "75%" }}
				src={`http://localhost:3030/${props.imagePath}`}
				alt={`${props.name} topping`}
			/>
			<Form.Group
				controlId={props.name + "-count"}
				as={Row}
				style={{ marginTop: 10 }}
			>
				<Form.Label
					column
					xs="6"
					style={{ textAlign: "right" }}
				>
					{props.name}
					<Col
						style={{ textAlign: "left" }}
						xs={5}
					>
						<Form.Check
							checked={checked}
							onChange={handleCheck}
						/>
					</Col>
				</Form.Label>
			</Form.Group>
		</Col>
	);
};
