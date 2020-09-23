import React from "react";
import * as actions from "../../../redux/actions/";

import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import "./Movies-item.css";

class MovieItem extends React.Component {
  state = { showDetail: false };

  onOpenDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    });
  };

  render() {
    const { title, stars, releaseYear, format, id, movieDelete } = this.props;
    const DetailShow = () => {
      return (
        <>
          <hr />
          <Card.Body>
            <Card.Text>{"actors: " + stars + ","}</Card.Text>
            <Card.Text>{"format: " + format}</Card.Text>
            <Card.Text>{"ID: " + id}</Card.Text>
            <Button
              variant="danger"
              type="submit"
              onClick={() => movieDelete(id)}
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
        {this.state.showDetail ? <DetailShow /> : null}

        <Button
          onClick={this.onOpenDetail}
          variant="primary"
          className="detail"
        >
          Show Details
        </Button>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { movieDelete: (id) => dispatch(actions.movieDelete(id)) };
};
export default connect(null, mapDispatchToProps)(MovieItem);
