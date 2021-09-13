import React from "react";

import { Grid } from "@material-ui/core";

import { RssiStat } from "./pieces/RssiChip";
import { ScanChip } from "./pieces/ScanChip";
import { DeviceChip } from "./pieces/DeviceChip";

const PnoiStat = ({ device }) => {
	return (
		<Grid container justify="flex-end">
			<Grid item xs={4}>
				<DeviceChip name="Device Name" device={device} />
			</Grid>
			<Grid item xs={4}>
				<RssiStat {...{ device }} />
			</Grid>
			<Grid item xs={4}>
				<ScanChip {...{ device }} />
			</Grid>
		</Grid>
	);
};

export default PnoiStat;
