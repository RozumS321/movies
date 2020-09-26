import React, { useEffect } from "react";
import * as actions from "../../redux/actions/";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MovieHeader from "../Movie-header/Movie-header";
import MovieAdd from "../Movie-add/Movie-add";
import MovieUpload from "../Movie-uploud/Movie-upload";
import MovieItems from "../Movies-items/Movies-items";
import "./App.css";

function App({ }) {



  return (
    <Router>
      <MovieHeader />
      <Switch>
        <Route exact path="/" component={MovieItems} />
        <Route path="/add" component={MovieAdd} />
        <Route path="/upload" component={MovieUpload} />
      </Switch>
    </Router>
  );
}

export default App;
