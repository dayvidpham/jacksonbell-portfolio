import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { forceCheck } from "react-lazyload";

import ListHeader from "./ListHeader";
import SpringScrollbars from "../SpringScrollbars";
import ListItem from "./ListItem";

const styles = theme => ({
  posts: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "100%"
  },
  inner: {
    padding: `calc(${theme.bars.sizes.infoBar}px + 1.3rem) 1.3rem calc(${theme.bars.sizes.actionsBar}px + 1.3rem) 1.3rem`,
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: `calc(${theme.bars.sizes.infoBar}px + 2rem) 2rem calc(${theme.bars.sizes.actionsBar}px + 2rem) 2rem`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      padding: `2rem  calc(1rem + 17px) calc(2rem + 17px) 2rem`,
      left: `${theme.info.sizes.width}px`,
      ".moving-featured &, .is-aside &": {
        padding: "1rem .5rem 1rem .5rem"
      }
    }
  },
  list: {
    display: "grid",
    "grid-template-columns": "repeat(auto-fit, minmax(270px, 1fr))",
    "grid-auto-flow": "row",
    "grid-gap": "1.5rem",

    // Horizontally centers boxes items inside grid cells
    justifyContent: "center",
    justifyItems: "center",

    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      "max-width": "600px", // In non-widescreen mode, limits to two columns
      margin: "auto"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      "max-width": "100%"
    },

    listStyle: "none",
    margin: 0,
    padding: 0,
    ".is-aside.closed &, .moving-featured.closed &": {
      display: "none"
    }
  }
});

class List extends React.Component {
  render() {
    // eslint-disable-next-line prettier/prettier
    const {
      classes,
      posts,
      linkOnClick,
      expandOnClick,
      navigatorShape,
    } = this.props;

    return (
      <div className={classes.posts}>
        <SpringScrollbars forceCheckOnScroll={true} isNavigator={true}>
          <div className={classes.inner}>
            <ListHeader expandOnClick={expandOnClick} navigatorShape={navigatorShape} />
            <ul className={classes.list}>
              {posts &&
                // eslint-disable-next-line prettier/prettier
                posts.map((post, i) => (
                  <ListItem
                    key={i}
                    post={post}
                    linkOnClick={linkOnClick}
                  />
                ))
              }
            </ul>
          </div>
        </SpringScrollbars>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired
};

export default injectSheet(styles)(List);
