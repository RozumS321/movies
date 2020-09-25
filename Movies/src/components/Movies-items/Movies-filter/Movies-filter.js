import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

function MoviesFilter(props) {
  const [searchText, setSearchText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [nameSort, setNameSort] = useState(false);

  const onChangeValue = () => {
    return (e) => {
      setSearchText(e.target.value);
    };
  };

  const onChangeTitleValue = () => {
    return (e) => {
      setSearchTitle(e.target.value);
    };
  };

  const sortName = () => {
    setNameSort(!nameSort);
  };

  useEffect(() => {
    props.movieSearch(searchText, searchTitle, nameSort ? "ASC" : "DESC");
  }, [nameSort, searchText, searchTitle]);

  return (
    <>
      <Form
        onSubmit={(e) => e.preventDefault()}
      >
        <FormControl
          type="text"
          placeholder="Search by star"
          className="mr-sm-2"
          onChange={onChangeValue()}
        />
        <FormControl
          type="text"
          placeholder="Search by title"
          className="mr-sm-2"
          onChange={onChangeTitleValue()}
        />

        {/* <Button
          variant="primary"
          onSubmit={(e) => e.preventDefault()}
          onChange={() =>
            props.movieSearch(
              searchText,
              searchTitle,
              nameSort ? "ASC" : "DESC"
            )
          }
          onClick={() =>
            props.movieSearch(
              searchText,
              searchTitle,
              nameSort ? "ASC" : "DESC"
            )
          }
        >
          Search
        </Button> */}
      </Form>
      <Button variant="primary" className="mr-sm-2" onClick={() => sortName()}>
        Sort Title
      </Button>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    movieSearch: (stars, title, sort) =>
      dispatch(actions.movieSearch(stars, title, sort)),
  };
};
export default connect(null, mapDispatchToProps)(MoviesFilter);
