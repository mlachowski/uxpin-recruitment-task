import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Layout from "./Layout";
import steps from "./steps";

const styles = {
    container: {
        minHeight: 400,
    },
    textBox: {
        padding: 20,
    },
    imgBox: {
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
};

type Props = {
    step: number,
    maxStep: number,
    onNextStep: Function,
    classes: Object,
}

const MainPage = ( props: Props) => {
    const { step, maxStep, onNextStep, classes } = props;
    return (
        <Grid container wrap="nowrap" justify="space-between" className={classes.container}>
            <Grid container item xs={ 8 } className={ classes.textBox } spacing={ 32 }>
                <Grid item>
                    <Typography variant="h4">{ steps[ step ].title }</Typography>
                </Grid>
                <Grid item>
                    <Typography>{ steps[ step ].text }</Typography>
                </Grid>
                <Grid container item justify="space-between" alignItems="flex-end">
                    <Grid item>
                        <Typography>{ step }/{ maxStep }</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={ onNextStep }>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={ 4 }
                className={ classes.imgBox }
                style={{ backgroundImage: `url('${steps[ step ].image}'` }}
            />
        </Grid>
    );
};

export default withStyles( styles )( MainPage );
