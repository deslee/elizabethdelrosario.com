import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(1.5),
        padding: theme.spacing(4, 2)
    },
    innerPaper: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(4)
    }
}))