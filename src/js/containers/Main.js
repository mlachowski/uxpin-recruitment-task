import React from "react";
import { withRouter } from "react-router-dom";

import MainPage from "../components/MainPage";
import routeConstants from "../routes";

type Props = {
    match: Object,
    history: Object,
};

type State = {
    currentStep: number,
    userId: string,
};

const firstStep = 1;
const maxStep = 4;

class MainContainer extends React.Component<Props, State> {
    constructor ( props ) {
        super( props );
        const userId = props.match.params.id;
        const step = parseInt( props.match.params.step, 10 );
        this.state = {
            currentStep: step >= firstStep && step <= maxStep ? step : firstStep,
            userId,
        };
        this.goToNextStep = this.goToNextStep.bind( this );
    }

    goToNextStep() {
        this.setState( previousState => {
            let newUserId = previousState.userId;
            if ( !previousState.userId ) {
                newUserId = "abc";
            }
            const newStep = previousState.currentStep + 1;

            this.props.history.push( routeConstants.INDEX_ROUTE( newUserId, newStep ) );
            return { userId: newUserId, currentStep: newStep };
        } );
    }

    render () {
        const { currentStep } = this.state;

        if ( currentStep === maxStep ) {
            return null;
        }

        return (
            <MainPage
                step={ currentStep }
                maxStep={ 3 }
                onNextStep={ this.goToNextStep }
            />
        );
    }
}

export default withRouter( MainContainer );
