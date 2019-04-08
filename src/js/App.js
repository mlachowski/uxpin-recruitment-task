import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Main from "./containers/Main";
import routeConstants from "./routes";
import Layout from "./components/Layout";

const App = () => (
    <Router>
        <CssBaseline />
        <Layout>
            <Route
                exact
                path={ routeConstants.INDEX_ROUTE( ":id?", ":step?" ) }
                component={ Main }
            />
        </Layout>
    </Router>
);

ReactDOM.render( <App />, document.getElementById( "app" ) );
