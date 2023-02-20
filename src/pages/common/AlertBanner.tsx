import React from "react";
import { Alert } from "react-bootstrap";

export type AlertBannerProps = {
	message?: string;
	variant?: "danger" | string;
};
export const AlertBanner: React.FC<AlertBannerProps> = ({
	message,
	variant,
}) => {
	const alertMessage =
		message || "An unexpected error ocurred. Please try again later";
	const alertVariant = variant || "danger";
	return (
		<Alert
			variant={alertVariant}
			style={{ background: "red" }}
		>
			{alertMessage}
		</Alert>
	);
};
