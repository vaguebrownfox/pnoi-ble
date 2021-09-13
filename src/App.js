import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { blue, grey } from "@material-ui/core/colors";

import { pnoi } from "./bluetooth/Pnoi";

import RecControl from "./components/RecControls";
import { RssiStat } from "./components/RssiStat";
import { Header } from "./components/Header";
import { RecMenu } from "./components/RecMenu";

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
			<Header {...{ handleOn, device }} />

			<RssiStat {...{ handleRssi, rssi, device }} />

			<RecMenu />

			<div className={classes.recdiv} sx={{ my: 48 }}>
				<RecControl {...{ device }} />
			</div>
		</Container>
	);
}

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

	recdiv: {
		display: "flex",
		flexDirection: "column-reverse",
		justifyContent: "center",
		flex: 1,
		paddingBottom: 64,
	},
}));
