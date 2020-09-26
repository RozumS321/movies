import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as constants from "../../../redux/constants";

function MoviesFilter(props) {
  const [searchStar, setSearchText] = useState("");
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
    props.nameSort(nameSort);
  }, [nameSort]);

  useEffect(() => {
    props.searchStar(searchStar);
  }, [searchStar]);

  useEffect(() => {
    props.searchTitle(searchTitle);
  }, [searchTitle]);

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

      </Form>
      <Button variant="primary" className="mr-sm-2" onClick={() => sortName()}>
        Sort Title
      </Button>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchStar: (star) => dispatch({ type: constants.SEARCH_STAR, searchStar: star }),
    searchTitle: (title) => dispatch({ type: constants.SEARCH_TITLE, searchTitle: title }),
    nameSort: (sort) => dispatch({ type: constants.NAME_SORT, nameSort: sort })
  };
};
export default connect(null, mapDispatchToProps)(MoviesFilter);
