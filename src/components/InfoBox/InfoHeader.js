import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { Link } from "gatsby";
import IconButton from "@material-ui/core/IconButton";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import avatar from "../../images/png/avatar.png";
import config from "../../../content/meta/config";

const styles = theme => ({
  header: {
    lineHeight: 1,
    position: "relative"
  },
  avatarLink: {
    willChange: "left, top",
    float: "left",
    display: "block",
    position: "relative",
    margin: "0 12px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 20px 0 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      position: "absolute",
      top: "10px",
      left: "50%",
      marginLeft: "-30px",
      transition: "all .5s",
      transitionTimingFunction: "ease",
      ".navigator-in-transition-from.navigator-is-opened &": {
        left: "50%"
      },
      ".is-aside.open &": {
        left: "8%",
        top: "0"
      }
    }
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "65% 75%",
    border: "1px solid #ddd",
    transition: "all .3s",
    transitionTimingFunction: "ease",
    display: "inline-block",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "44px",
      height: "44px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "60px",
      height: "60px"
    },
    "@media (hover: hover)": {
      "&:hover": {
        borderRadius: "75% 65%"
      }
    }
  },
  title: {
    willChange: "transform, left",
    fontSize: `${theme.info.fonts.boxTitleSize}em`,
    margin: 0,
    float: "left",
    textAlign: "left",
    transitionTimingFunction: "ease",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeL}em`,
      position: "absolute",
      left: "25%",
      transform: "translate(-50%)",
      transition: "all .5s",
      ".is-aside.open &": {
        left: "25%"
      }
    }
  },
  titleLink: {
    color: "inherit"
  },
  expand: {
    position: "absolute",
    top: "30px",
    right: "-25px",
    display: "none",
    color: theme.info.colors.text,
    ".is-aside.open &": {
      display: "block"
    }
  }
});

const InfoHeader = props => {
  const { classes, avatarOnClick, expandOnClick } = props;

  return (
    <header className={classes.header}>
      <Link className={classes.titleLink} onClick={avatarOnClick} to="/" title="back to Home page">
        <h1 className={classes.title}>{config.infoTitle.replace(/ /g, "\u00a0")}</h1>
      </Link>
      <IconButton
        aria-label="Expand the box"
        className={classes.expand}
        onClick={expandOnClick}
        title="Expand the box"
      >
        <ExpandMoreIcon />
      </IconButton>
    </header>
  );
};

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(InfoHeader);
