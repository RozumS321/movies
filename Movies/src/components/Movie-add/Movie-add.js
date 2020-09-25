import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/";
import { Form, Container, Button } from "react-bootstrap";
import "./Movie-add.css";

function MovieAdd(props) {
  const [movieInfo, setMovieInfo] = useState({});

  const onValueChange = (type) => {
    return (e) => {
      if (type === "stars") {
        let starsArr = e.target.value.split(",");
        setMovieInfo({ ...movieInfo, stars: starsArr });
      } else {
        setMovieInfo({ ...movieInfo, [type]: e.target.value });
      }
    };
  };

  return (
    <Container>
      <Form className="was-validated">
        <Form.Group>
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Movie title"
            onChange={onValueChange("title")}
            min="1"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Years</Form.Label>
          <Form.Control
            type="number"
            placeholder="release date"
            onChange={onValueChange("releaseYear")}
            min="1850"
            max="2020"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Actors</Form.Label>
          <Form.Control
            type="text"
            placeholder="Names of actors"
            onChange={onValueChange("stars")}
            min="1"
            required
          />
          <Form.Text muted>Actor names separated by commas ","</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Format:</Form.Label>

          <Form.Check
            type="radio"
            label="DVD"
            value="DVD"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            onChange={onValueChange("format")}
            required
          />
          <Form.Check
            type="radio"
            label="VHS"
            value="VHS"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            onChange={onValueChange("format")}
          />
          <Form.Check
            type="radio"
            label="Blu-Ray"
            value="Blu-Ray"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            onChange={onValueChange("format")}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => props.movieAdd(movieInfo)}
        >
          ADD
        </Button>
      </Form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movieInfo: state.movieInfo,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    movieAdd: (movieInfo) => dispatch(actions.movieAdd(movieInfo)),
    movieDelete: (_id) => dispatch(actions.movieDelete(_id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieAdd);
