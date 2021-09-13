import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { blue, grey } from "@material-ui/core/colors";

import { IconButton } from "@material-ui/core";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

export const Header = ({ handleOn, device }) => {
	const classes = useStyles();
	return (
		<Box className={classes.box} sx={{ my: 0 }}>
			<Typography
				style={{ color: blue[800], fontWeight: "bold" }}
				variant="h6"
			>
				Pnoi BLE v0x06
			</Typography>
			<IconButton variant="contained" onClick={handleOn}>
				<PowerIcon
					fontSize="large"
					color={device ? "primary" : "inherit"}
				/>
			</IconButton>
		</Box>
	);
};

const useStyles = makeStyles(() => ({
	box: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: grey[400],
		padding: 16,
		paddingBottom: 16,
	},
}));
