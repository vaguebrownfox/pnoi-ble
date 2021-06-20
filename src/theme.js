import { blue, grey, orange, red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[400],
		},
		secondary: {
			main: orange[900],
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});

export default theme;
