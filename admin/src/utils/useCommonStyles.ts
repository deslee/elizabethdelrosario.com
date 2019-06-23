import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4)
    },
    innerPaper: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(4)
    }
}))