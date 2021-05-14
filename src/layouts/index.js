import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import withRoot from "../withRoot";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setIsWideScreen } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent/";
import Loading from "../components/common/Loading/";
import Navigator from "../components/Navigator/";
import ActionsBar from "../components/ActionsBar/";
import InfoBar from "../components/InfoBar/";
import LayoutWrapper from "../components/LayoutWrapper/";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox/")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />
);

class Layout extends React.Component {
  timeouts = {};

  componentDidMount() {
    this.props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 500, this.resizeHandler);
  };

  resizeHandler = () => {
    this.props.setIsWideScreen(isWideScreen());
  };

  render() {
    const { children, data } = this.props;
    console.log(data.fonts);
    // TODO: dynamic management of tabindexes for keybord navigation
    return (
      <LayoutWrapper>
        {children()}
        <Navigator posts={data.posts.edges} />
        {!this.props.isWideScreen && <ActionsBar />}
        <InfoBar pages={data.pages.edges} parts={data.parts.edges} />
        {this.props.isWideScreen && <InfoBox pages={data.pages.edges} parts={data.parts.edges} />}
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setIsWideScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(injectSheet(globals)(Layout)));

//eslint-disable-next-line no-undef
export const query = graphql`
  query LayoutQuery {
    posts: allMarkdownRemark(
      filter: { id: { regex: "//posts//" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle

            cover {
              children {
                ... on ImageSharp {
                  sizes(maxWidth: 270, quality: 100) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                  resolutions(width: 270) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { id: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
    parts: allMarkdownRemark(filter: { id: { regex: "//parts//" } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
    fonts: allFile(
      filter: {
        extension: { regex: "/(woff2)|(woff)|(ttf)|(otf)|(eof)/" }
        sourceInstanceName: { eq: "fonts" }
      }
    ) {
      edges {
        node {
          sourceInstanceName
          relativePath
        }
      }
    }
  }
`;
