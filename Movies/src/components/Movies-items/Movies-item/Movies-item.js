import React, { useState } from "react";
import * as actions from "../../../redux/actions/";
import SweetAlert from 'react-bootstrap-sweetalert';

import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import "./Movies-item.css";

function MovieItem(props) {

  const [showDetail, setShowDetail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { title, stars, releaseYear, format, id, movieDelete } = props;


  const onOpenDetail = () => {
    setShowDetail(!showDetail)
  };
  const showModalDelete = () => {
    return (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          setShowConfirm(false);
          movieDelete(id)
        }}
        onCancel={() => setShowConfirm(false)}
        focusCancelBtn
      >
        You will not be able to recover this movie!
      </SweetAlert>
    )
  }

  const DetailShow = () => {
    return (
      <>
        <hr />
        <Card.Body>
          <Card.Text>{"actors: " + stars.join(',')}</Card.Text>
          <Card.Text>{"format: " + format}</Card.Text>
          <Card.Text>{"ID: " + id}</Card.Text>
          {showConfirm && showModalDelete()}
          <Button
            variant="danger"
            type="submit"
            onClick={() => setShowConfirm(true)}
          >
            Delete
            </Button>
        </Card.Body>
      </>
    );
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{"Year: " + releaseYear}</Card.Text>
      {showDetail ? <DetailShow /> : null}

      <Button
        onClick={() => onOpenDetail()}
        variant="primary"
        className="detail"
      >
        Show Details
        </Button>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return { movieDelete: (id) => dispatch(actions.movieDelete(id)) };
};
export default connect(null, mapDispatchToProps)(MovieItem);