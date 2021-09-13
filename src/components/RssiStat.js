import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip } from "@material-ui/core";
import SignalIcon from "@material-ui/icons/SignalCellularAlt";
import StartIcon from "@material-ui/icons/Adjust";
import StopIcon from "@material-ui/icons/HighlightOff";

export const RssiStat = ({ handleRssi, rssi, device }) => {
	const classes = useStyles();
	return (
		<div className={classes.controls}>
			<Chip
				className={classes.rssichip}
				icon={<SignalIcon />}
				label={rssi ? `rssi: ${rssi}` : `rssi`}
				clickable
				color="primary"
				onDelete={handleRssi}
				deleteIcon={rssi ? <StopIcon /> : <StartIcon />}
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
		flexDirection: "row-reverse",
		minHeight: 64,
		// border: "1px solid",
		// borderColor: blue[500],
	},

	rssichip: {
		position: "relative",
		transform: "scale(1.1)",
		top: 0,
		right: 0,
		margin: 16,
	},
}));
