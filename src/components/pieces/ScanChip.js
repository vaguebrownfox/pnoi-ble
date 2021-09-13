import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip } from "@material-ui/core";

import ScanIcon from "@material-ui/icons/Search";
import { ScanModal } from "./ScanModal";

export const ScanChip = ({ device }) => {
	const classes = useStyles();

	const [modal, setModal] = React.useState(true);

	const handleScan = () => {
		console.log("Start/End scan");
		setModal(true);
	};

	return (
		<div className={classes.controls}>
			<Chip
				className={classes.scanchip}
				icon={<ScanIcon />}
				label={`Scan`}
				clickable
				color="primary"
				onClick={handleScan}
				variant="default"
				size="medium"
				disabled={!device}
			/>
			<ScanModal modalOpen={modal} setModal={setModal} />
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

	scanchip: {
		position: "absolute",
		transform: "scale(1)",
		color: "#fff",
	},
}));
