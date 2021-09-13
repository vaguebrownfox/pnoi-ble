import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip } from "@material-ui/core";
import SignalIcon from "@material-ui/icons/SignalCellularAlt";
import StartIcon from "@material-ui/icons/Adjust";
import StopIcon from "@material-ui/icons/HighlightOff";

import { pnoi } from "../../bluetooth/pnoi";

export const RssiStat = ({ device }) => {
	const classes = useStyles();

	const [rssi, setRssi] = React.useState(null);

	const handleRssi = async () => {
		if (pnoi.device && !rssi) {
			pnoi.startProximityNotifications(updateRssi.bind(this));
		} else if (rssi) {
			await pnoi.stopProximityNotifications();
			stopRssi();
		}
	};
	const updateRssi = (event) => {
		const r = event.target.value;
		setRssi(r.getFloat32());
	};
	const stopRssi = (e) => {
		console.log("stop rssi e ", e);
		setRssi(null);
	};

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
