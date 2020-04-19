import { connect } from "react-redux";
import React, { useEffect } from "react";
import { fetchUser } from "../actions";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

let Navbar = ({ user, fetchUser }) => {
  useEffect(() => {
    return fetchUser();
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand mb-0 h1">Trello Lite</span>
      <form action="/logout">
        <div className="mr-2">
          <img className="user-photo" src={user.photo} />
          <div className="user-name ml-3 mb-0">{user.name}</div>
          <Button variant="dark" type="submit">
            {" "}
            Sign Out
          </Button>
        </div>
      </form>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});

Navbar.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default Navbar;
