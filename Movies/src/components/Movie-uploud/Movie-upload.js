import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Movie-upload.css";
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'


function MovieUpload(props) {
  const [movieFile, setMovieFile] = useState({});

  const onValueChange = (e) => {
    setMovieFile(e.target.files[0]);
  }


  return (
    <Form enctype="multipart/form-data" enctype="multipart/form-data">
      <Form.Group  >
        <Form.File id="exampleFormControlFile1" onChange={onValueChange} label="Upload txt file" name='input-file' />
        <Button variant="primary" type="button" onClick={() => props.movieUpload(movieFile)}>
          Upload
        </Button>
      </Form.Group>
    </Form>
  );
}
const mapStateToProps = (state) => {
  return {
    movieFile: state.movieInfo,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    movieUpload: (movieFile) => dispatch(actions.movieUpload(movieFile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieUpload)