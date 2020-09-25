import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/";
import * as constants from '../../redux/constants/'
import { Form, Container, Button, Modal } from "react-bootstrap";
import "./Movie-add.css";

function MovieAdd(props) {
  const [movieInfo, setMovieInfo] = useState({});
  const [formValid, setFormValid] = useState(null);
  const formRef = useRef(null);


  const onValueChange = (type) => {
    return (e) => {
      if (type === "stars") {
        let starsArr = e.target.value.split(",");
        if (new Set(starsArr).size !== starsArr.length) {
          return setFormValid(false)
        }
        setFormValid(true)
        setMovieInfo({ ...movieInfo, stars: starsArr });
      } else {
        setMovieInfo({ ...movieInfo, [type]: e.target.value });
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false || formValid == false) {
      return;
    }
    props.movieAdd(movieInfo)
    formRef.current.reset();
    setFormValid(null)
  }

  const handleClose = () => props.clearMovieAddError()


  return (
    <Container>
      <Form ref={formRef} validated={formValid} onSubmit={handleSubmit}  >
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
          <Form.Control.Feedback type="invalid">
            min:1850 max:2020
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  >
          <Form.Label>Actors</Form.Label>
          <Form.Control
            type="text"
            placeholder="Names of actors"
            onChange={onValueChange("stars")}
            required
            isInvalid={formValid === false}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a unique actors
          </Form.Control.Feedback>
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
        >
          ADD
        </Button>
      </Form>
      <Modal show={!!props.error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie add error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Movie not unique</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movieInfo: state.movieInfo,
    error: state.movieAddError
  };
};

function mapDispatchToProps(dispatch) {
  return {
    movieAdd: (movieInfo) => dispatch(actions.movieAdd(movieInfo)),
    movieDelete: (_id) => dispatch(actions.movieDelete(_id)),
    clearMovieAddError: () => dispatch({ movieAddError: '', type: constants.MOVIE_ADD_ERROR })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieAdd);
