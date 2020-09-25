import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./Movie-upload.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/";
import * as constants from '../../redux/constants/'

function MovieUpload(props) {
  const [movieFile, setMovieFile] = useState(null);

  const onValueChange = (e) => {
    setMovieFile(e.target.files[0]);
  };
  const handleClose = () => props.clearMovieAddError()


  return (
    <Form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
      <Form.Group>
        <Form.File
          id="exampleFormControlFile1"
          onChange={onValueChange}
          label="Upload txt file"
          name="input-file"

        />
        <Button
          variant="primary"
          type="submit"
          onClick={() => movieFile && props.movieUpload(movieFile)}
        >
          Upload
        </Button>
      </Form.Group>
      <Modal show={props.error} onHide={handleClose}>
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
    </Form>
  );
}
const mapStateToProps = (state) => {
  return {
    movieFile: state.movieInfo,
    error: state.movieAddError

  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    movieUpload: (movieFile) => dispatch(actions.movieUpload(movieFile)),
    clearMovieAddError: () => dispatch({ movieAddError: '', type: constants.MOVIE_ADD_ERROR })

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieUpload);
