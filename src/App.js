import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { blue, grey } from "@material-ui/core/colors";

import { pnoi } from "./bluetooth/Pnoi";
import { Chip, IconButton } from "@material-ui/core";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import SignalIcon from "@material-ui/icons/SignalCellularAlt";
import StartIcon from "@material-ui/icons/Adjust";
import StopIcon from "@material-ui/icons/HighlightOff";

import RecControl from "./components/RecControls";
const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		alignSelf: "center",
		backgroundColor: grey[200],
		padding: 0,

		height: "100vh",

		borderStyle: "solid",
		borderTopWidth: 1,
		borderBottomWidth: 0,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: blue[500],
		borderTopColor: "#fff",
	},
	box: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: grey[400],
		padding: 16,
		paddingBottom: 16,
	},
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
	recdiv: {
		display: "flex",
		flexDirection: "column-reverse",
		justifyContent: "center",
		flex: 1,
		paddingBottom: 64,
	},
}));

export default function App() {
	const classes = useStyles();

	const [device, setDevice] = React.useState(null);
	const [rssi, setRssi] = React.useState(null);

	const handleOn = () => {
		if (!device) {
			pnoi.request()
				.then(() => pnoi.connect(setDevice))
				.then(() => {
					setDevice(pnoi.device);
					console.log("connected");
					// handleRssi();
				})
				.catch((e) => {
					console.log(e);
					setDevice(null);
				});
		} else {
			pnoi.disconnect();
			setDevice(null);
		}
	};

	const handleRssi = () => {
		if (pnoi.device && !rssi) {
			pnoi.startProximityNotifications(updateRssi.bind(this));
		} else if (rssi) {
			pnoi.stopProximityNotifications().then(() => stopRssi());
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
		<Container
			className={classes.container}
			style={{ padding: 0 }}
			maxWidth="sm"
		>
			<Box className={classes.box} sx={{ my: 0 }}>
				<Typography
					style={{ color: blue[800], fontWeight: "bold" }}
					variant="h6"
				>
					Pnoi BLE
				</Typography>
				<IconButton variant="contained" onClick={handleOn}>
					<PowerIcon
						fontSize="large"
						color={device ? "primary" : "inherit"}
					/>
				</IconButton>
			</Box>

			<div className={classes.controls} sx={{ my: 4 }}>
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
			<div className={classes.recdiv} sx={{ my: 48 }}>
				<RecControl {...{ device }} />
			</div>
		</Container>
	);
}
