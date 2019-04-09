import React from "react";
import { withRouter } from "react-router-dom";
import shortid from "shortid";
import axios from "axios";

import MainPage from "../components/MainPage";
import routeConstants from "../routes";
import { API_URL } from "../constants";

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
    constructor( props ) {
        super( props );

        this.goToNextStep = this.goToNextStep.bind( this );
        this.getStep = this.getStep.bind( this );

        this.state = {
            currentStep: maxStep,
            userId: "",
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id || this.createUser();
        this.getStep( userId );
    }

    getStep( userId ) {
        axios.get( `${ API_URL }user/${ userId }` )
            .then( response => {
                if( response.data === "User not found" ) {
                    this.createUser( userId );
                    this.setState( {
                        userId,
                        currentStep: firstStep,
                    } );
                } else {
                    this.setState( {
                        userId,
                        currentStep: response.data.step,
                    } );
                }
            } );
    }

    createUser( userId ) {
        let id = userId;
        if ( !id ) {
            id = shortid.generate();
        }
        axios.post( `${ API_URL }user/`, {
            id,
            step: firstStep,
        } );
        return id;
    }

    goToNextStep() {
        this.setState( previousState => {
            const newStep = previousState.currentStep + 1;

            this.props.history.push( routeConstants.INDEX_ROUTE( previousState.userId ) );
            this.saveStep( previousState.userId, newStep );
            return { currentStep: newStep };
        } );
    }

    saveStep( userId, step ) {
        axios.put( `${ API_URL }user/${ userId }`, { step } );
    }

    render() {
        const { currentStep } = this.state;

        if (currentStep === maxStep) {
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
