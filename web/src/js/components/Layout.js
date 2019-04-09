import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    grid: {
        height: "100%",
        margin: "auto",
    },
    paper: {
        padding: 0,
        overflow: "hidden",
        minHeight: 100,
        width: "100%",
    },
};

type Props = {
    children: React.Node,
    classes: Object,
}

const Layout = ( props: Props ) => {
    const { children, classes } = props;

    return (
        <Grid
            container
            item
            justify="center"
            className={ classes.grid }
            alignContent="center"
            xs={8}
        >
            <Paper className={ classes.paper }>
                { children }
            </Paper>
        </Grid>
    );
};

export default withStyles( styles )( Layout );
