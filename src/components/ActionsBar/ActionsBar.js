import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { setNavigatorPosition, setNavigatorShape, setScrollToTop } from "../../state/store";
import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";

const styles = theme => ({
  actionsBar: {
    position: "absolute",
    background: theme.bars.colors.background,
    left: 0,
    //top: `calc(100vh - ${theme.bars.sizes.actionsBar}px)`,
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    padding: `0 ${theme.base.sizes.linesMargin}`,
    justifyContent: "space-between",
    height: `${theme.bars.sizes.actionsBar}px`,
    width: "100%",
    "&::before": {
      content: `""`,
      position: "absolute",
      left: theme.base.sizes.linesMargin,
      right: theme.base.sizes.linesMargin,
      height: 0,
      top: 0,
      borderTop: `1px solid ${theme.base.colors.lines}`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: `0 calc(${theme.base.sizes.linesMargin} * 1.5)`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      flexDirection: "column",
      top: 0,
      right: 0,
      left: "auto",
      height: "100%",
      padding: `${theme.base.sizes.linesMargin} 0`,
      width: `${theme.bars.sizes.actionsBar}px`,
      "&::before": {
        top: theme.base.sizes.linesMargin,
        bottom: theme.base.sizes.linesMargin,
        left: 0,
        right: "auto",
        width: 0,
        height: "auto",
        borderLeft: `1px solid ${theme.base.colors.lines}`
      }
    }
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      flexDirection: "column"
    }
  },
  button: {
    color: theme.bars.colors.icon
  }
});

class ActionsBar extends React.Component {
  homeOnClick = featureNavigator.bind(this);

  arrowUpOnClick = () => {
    this.props.setScrollToTop(true);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.actionsBar}>
        <div className={classes.group}>
          <IconButton
            aria-label="Back to list"
            onClick={this.homeOnClick}
            title="Back to the list"
            className={classes.button}
          >
            <HomeIcon />
          </IconButton>
        </div>
        <div className={classes.group}>
          <IconButton aria-label="Back to top" onClick={this.arrowUpOnClick} title="Scroll to top">
            <ArrowUpwardIcon className={classes.button} />
          </IconButton>
        </div>
      </div>
    );
  }
}

ActionsBar.propTypes = {
  classes: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  setScrollToTop: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(ActionsBar));
