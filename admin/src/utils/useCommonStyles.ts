import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4)
    },
    innerPaper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: 0,
        marginRight: 0,
        padding: theme.spacing(4)
    }
}))