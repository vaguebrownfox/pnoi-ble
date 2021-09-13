import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Modal, Backdrop, Fade, Button } from "@material-ui/core";

import { ScanDeviceList } from "./ScanDeviceList";

const useStyleModal = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(255, 255, 255, 0.9)",
		border: "2px solid",
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 2, 3),
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		marginTop: theme.spacing(4),
		alignSelf: "center",
	},
}));

export const ScanModal = ({ modalOpen, setModal }) => {
	const classes = useStyleModal();

	const handleStopScan = () => {
		console.log("Stop Scan");
		setModal(false);
	};

	const devices = [
		{
			name: "Device 1",
			address: "11:22:33",
		},
		{
			name: "Device 2",
			address: "44:55:66",
		},
	];

	return (
		<Modal
			className={classes.modal}
			style={{ overflow: "scroll" }}
			open={modalOpen}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={modalOpen}>
				<div className={classes.modalContent}>
					<ScanDeviceList devices={devices} />
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleStopScan}
						className={classes.button}
					>
						Stop scanning
					</Button>
				</div>
			</Fade>
		</Modal>
	);
};
