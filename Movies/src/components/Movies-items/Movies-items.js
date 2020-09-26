import React, { useEffect, useState } from "react";
import * as actions from '../../redux/actions'
import MovieItem from "./Movies-item/Movies-item";
import { connect } from "react-redux";
import { Card, Container, Pagination } from "react-bootstrap";
import MoviesFilter from "./Movies-filter/Movies-filter";
import "./Movies-items.css";

function MoviesItems({ movieInfo, movieCount, movieSearch, filters }) {
  const paginationCount = 10;
  const [paginationPage, setPaginationPage] = useState(0)


  useEffect(() => {
    movieSearch(filters.searchStar, filters.searchTitle, filters.nameSort ? "ASC" : "DESC", paginationCount, paginationPage * paginationCount)
  }, [filters, paginationPage])


  const onPaginationItemClick = (number) => () => {
    setPaginationPage(number)
  }


  const paginationItems = []
  for (let number = 0; number < Math.ceil(movieCount / paginationCount); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === paginationPage} onClick={onPaginationItemClick(number)}>
        {number + 1}
      </Pagination.Item>,
    );
  }

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
      {items.length ? <div className="cards">{items}</div> : <div className="cards notFound">Not found</div>}
      <Pagination>{paginationItems}</Pagination>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return { movieInfo: state.movieInfo, movieCount: state.moviesCount, filters: state.filters };
};
const mapDispatchToProps = (dispatch) => {
  return {
    movieSearch: (star, title, sort, limit, skip) => dispatch(actions.movieSearch(star, title, sort, limit, skip))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItems);
