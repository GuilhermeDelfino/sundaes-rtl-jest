import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useOrderDetail } from "../../contexts/OrderDetail";
import { ResponseModelOptions } from "./Options";

export type ScoopOptionProps = ResponseModelOptions;
export const ScoopOption: React.FC<ScoopOptionProps> = (props) => {
	const { addOrUpdateItem } = useOrderDetail();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (+value < 0 || +value > 10 || +value % Math.floor(+value) > 0) {
			setInputError(true);
			addOrUpdateItem("scoops", {
				count: 0,
				name: props.name,
			});
		} else {
			setInputError(false);
			addOrUpdateItem("scoops", {
				count: +value,
				name: props.name,
			});
		}
	};
	const [hasInputError, setInputError] = React.useState<boolean>(false);
	const classNameInput = hasInputError ? "is-invalid" : "";
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
				alt={`${props.name} scoop`}
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
						<Form.Control
							type="number"
							defaultValue={0}
							className={classNameInput}
							onChange={handleChange}
						/>
					</Col>
				</Form.Label>
			</Form.Group>
		</Col>
	);
};
