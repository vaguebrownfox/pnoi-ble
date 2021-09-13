import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { blue, grey } from "@material-ui/core/colors";

import { pnoi } from "./bluetooth/pnoi";

import RecControl from "./components/RecControls";
import PnoiStat from "./components/PnoiStat";
import { Header } from "./components/Header";

export default function App() {
	const classes = useStyles();

	const [device, setDevice] = React.useState(null);

	const handleOn = () => {
		if (!device) {
			pnoi.request()
				.then(() => pnoi.connect(setDevice))
				.then(() => {
					setDevice(pnoi.device);
					console.log("connected");
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

	return (
		<Container className={classes.container} maxWidth="xs">
			<Header {...{ handleOn, device }} />
			<PnoiStat {...{ device }} />
			<div className={classes.recdiv}>
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
