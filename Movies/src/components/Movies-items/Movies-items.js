import React, { useEffect } from "react";
import * as actions from '../../redux/actions'
import MovieItem from "./Movies-item/Movies-item";
import { connect } from "react-redux";
import { Card, Container } from "react-bootstrap";
import MoviesFilter from "./Movies-filter/Movies-filter";
import "./Movies-items.css";

function MoviesItems({ movieInfo, fetchMovie }) {

  useEffect(() => {
    fetchMovie()
  }, [])

  const items = movieInfo.map((item) => {
    return (
      <MovieItem
        title={item.title}
        stars={item.stars}
        releaseYear={item.releaseYear}
        format={item.format}
        id={item._id}
        key={item._id}
      />
    );
  });
  return (
    <Container>
      <MoviesFilter />
      {items.length ? <div className="cards">{items}</div> : <div>Not found</div>}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return { movieInfo: state.movieInfo };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: () => dispatch(actions.fetchMovie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItems);
