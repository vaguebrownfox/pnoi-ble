import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MuiMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const fs = [
	{
		key: "8k",
		value: 8000,
	},
	{
		key: "16k",
		value: 16000,
	},
];

export const RecMenu = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<p>menu</p>
			<Menu />
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const Menu = ({ options }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls="sampling-frequency"
				aria-haspopup="true"
				variant="contained"
				color="secondary"
				onClick={handleClick}
			>
				Sampling Frequency
			</Button>
			<MuiMenu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{fs.map((f) => (
					<MenuItem onClick={handleClose}>{f.key}</MenuItem>
				))}
			</MuiMenu>
		</div>
	);
};
