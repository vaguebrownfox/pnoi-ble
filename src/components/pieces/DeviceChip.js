import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip } from "@material-ui/core";

export const DeviceChip = ({ name, address, device }) => {
	const classes = useStyles();

	return (
		<div className={classes.controls}>
			<Chip
				className={classes.rssichip}
				label={device ? device.name : "Not connected"}
				color="primary"
				variant="outlined"
				size="medium"
				disabled={!device}
			/>
		</div>
	);
};

const useStyles = makeStyles(() => ({
	controls: {
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: 64,
		// border: "1px solid blue",
	},

	rssichip: {
		position: "absolute",
		transform: "scale(1)",
	},
}));
