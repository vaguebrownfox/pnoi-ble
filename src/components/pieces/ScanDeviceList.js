import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
	Divider,
	Typography,
	Avatar,
	List,
	ListItemText,
	ListItemAvatar,
	ListItem,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

import BluetoothIcon from "@material-ui/icons/Bluetooth";

export const ScanDeviceList = ({ devices }) => {
	const classes = useStyleModal();

	return (
		<>
			<Typography variant="h6" component="h6" gutterBottom>
				Searching...
			</Typography>

			<div>
				<Divider className={classes.divider} />
				<List className={classes.root}>
					{devices.map((d, i) => {
						return (
							<ListItem key={i} button>
								<ListItemAvatar>
									<Avatar
										style={{
											backgroundColor: "transparent",
										}}
									>
										<BluetoothIcon
											style={{ color: blue[500] }}
										/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={`${d.name}`}
									secondary={`${d.address}`}
									onClick={() =>
										console.log("select device", d.name)
									}
								/>
							</ListItem>
						);
					})}
				</List>
			</div>
		</>
	);
};

const useStyleModal = makeStyles((theme) => ({
	root: {
		width: "100%",
		minWidth: 192,
		maxWidth: 360,
	},
	divider: {
		marginBottom: theme.spacing(2),
	},
}));
