import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { GatsbyImage } from "gatsby-plugin-image";
import LazyLoad from "react-lazyload";

const styles = theme => ({
  listItem: {
    "max-width": `${theme.list.sizes.listItemMaxWidth}`,
    margin: "0 0 .7em 0",
    transition: "height 1s",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 0 1.5rem 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        padding: ".7em 1em .7em 1em",
        margin: "0 0 0 0"
      }
    }
  },
  listLink: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",

    color: theme.navigator.colors.postsListItemLink,
    "@media (hover: hover)": {
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover,
        "& .pointer": {
          borderRadius: "65% 75%"
        }
      }
    }
  },
  listItemPointer: {
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    // borderRadius: "75% 65%",
    minWidth: "270px",
    height: "100%",

    margin: "0 0 0.5rem 0",
    transition: "all .5s",
    "& img": {
      width: "100%",
      height: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      transition: "all .3s",
      transitionTimingFunction: "ease"
    }
  },
  listItemText: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& h1": {
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: "-0.03em",
      margin: 0,
      fontSize: `${theme.navigator.sizes.postsListItemH1Font}em`,
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          fontSize: "1em",
          fontWeight: 400
        }
      }
    },
    "& h2": {
      lineHeight: 1.2,
      display: "block",
      fontSize: `${theme.navigator.sizes.postsListItemH2Font}em`,
      margin: ".3em 0 0 0",
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          display: "none"
        }
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 .5em"
      }
    }
  }
});

class ListItem extends React.Component {
  render() {
    const { classes, post, linkOnClick } = this.props;
    const cover = post.node.frontmatter.cover;

    return (
      <li
        className={`${classes.listItem} ${post.node.frontmatter.category}`}
        style={{ display: `block` }}
        key={post.node.fields.slug}
      >
        <Link
          activeClassName="active"
          className={classes.listLink}
          to={post.node.fields.slug}
          onClick={linkOnClick}
        >
          {post.node.frontmatter.cover && post.node.frontmatter.cover.children[0] && (
            <div className={`${classes.listItemPointer} pointer`}>
              <Img sizes={cover.children[0].sizes} />
            </div>
          )}

          <div className={classes.listItemText}>
            <h1>{post.node.frontmatter.title}</h1>
            {post.node.frontmatter.subTitle && <h2>{post.node.frontmatter.subTitle}</h2>}
          </div>
        </Link>
      </li>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(ListItem);
