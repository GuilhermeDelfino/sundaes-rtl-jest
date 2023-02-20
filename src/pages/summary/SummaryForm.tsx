import React from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

import { OrderPhaseProps } from "@/app";

export const SummaryForm: React.FC<OrderPhaseProps> = ({ setOrderPhase }) => {
	const [termsChecked, setTermsChecked] = React.useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setOrderPhase("completed");
	};
	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>No ice cream will actually be delivered</Popover.Body>
		</Popover>
	);
	const checkboxLabel = (
		<span>
			I agree to
			<OverlayTrigger
				overlay={popover}
				placement="right"
			>
				<span style={{ color: "blue" }}>Terms and conditions</span>
			</OverlayTrigger>
		</span>
	);
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="c-summaryForm">
					<Form.Check
						type="checkbox"
						label={checkboxLabel}
						checked={termsChecked}
						onChange={(e) => setTermsChecked(e.target.checked)}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					disabled={!termsChecked}
				>
					Confirm Order
				</Button>
			</Form>
		</>
	);
};
