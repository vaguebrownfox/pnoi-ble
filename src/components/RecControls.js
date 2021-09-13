import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip, Typography } from "@material-ui/core";

import RecordStartIcon from "@material-ui/icons/FiberManualRecordRounded";
import RecordStopIcon from "@material-ui/icons/StopRounded";

import { pnoi } from "../bluetooth/pnoi";

const RecControl = ({ device, recDone }) => {
	const classes = useStyles();

	const [recorder, setRecorder] = React.useState(false);

	const handleRecord = () => {
		if (device) {
			if (!recorder) {
				pnoi.recordControl(0x0a).then(() => setRecorder(true));
			} else {
				pnoi.recordControl(0x0b).then(() => setRecorder(false));
			}
		}
	};

	return (
		<div className={classes.root}>
			<div className={classes.controls}>
				<div className={classes.controlIconRec}>
					<IconButton
						aria-label="record"
						onClick={handleRecord}
						color="secondary"
					>
						<Tooltip
							title={`${
								recorder ? "Stop recording" : "Start recording"
							}`}
							placement="top"
							arrow
						>
							{recorder ? (
								<RecordStopIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							) : (
								<RecordStartIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							)}
						</Tooltip>
					</IconButton>

					<Typography color="secondary" variant="caption">
						{`${
							recorder
								? "Recording..."
								: recDone
								? "Redo?"
								: "Start"
						}`}
					</Typography>
				</div>
				{/* <div className={classes.controlIconRec}>
					<IconButton
						aria-label="next"
						onClick={handleDone}
						disabled={!recDone}
					>
						<Tooltip arrow title="Save and Continue">
							<DoneIcon className={classes.controlIcon} />
						</Tooltip>
					</IconButton>
					{recDone && (
						<Typography color="secondary" variant="caption">
							Continue
						</Typography>
					)}
				</div> */}
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		margin: theme.spacing(8),
		padding: theme.spacing(2),

		borderStyle: "solid",
		borderWidth: 0,
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
	},
	controls: {
		display: "flex",
		alignItems: "flex-start",
		width: "100%",
		maxWidth: theme.spacing(64),
		justifyContent: "space-evenly",
	},
	recIcon: {
		background: theme.palette.primary,
		boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		animation: `$glowee 3000ms ${theme.transitions.easing.easeInOut} 400ms infinite`,
		borderRadius: "50%",
	},
	controlIcon: {
		height: 32,
		width: 32,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	controlIconOlp: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	recbutton: {
		position: "relative",
	},

	"@keyframes glowee": {
		"0%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
		"50%": {
			boxShadow: `0 0 7px 4px ${theme.palette.secondary.main}`,
		},
		"100%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
	},
	playerShow: {
		// display: "none",
		transform: "scale(0.8)",
	},
	playerHide: {
		display: "none",
	},
	controlIconRec: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

export default RecControl;
