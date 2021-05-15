import React from 'react';
import { Helmet } from 'react-helmet';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const _FontHeader = ({ data }) => {
  const fonts = data.fonts || [];
  const fontsList = fonts.edges.map(
    (font) => <link key={font.id} rel='preload' as='font' href='relativePath' type={`font/${font.extension}`} />
  )

  return (<Helmet>
    {fontsList}
  </Helmet>)
}

const FontHeader = ({ data }) => (
  <StaticQuery
    query={graphql`
      query FontsQuery {
        fonts: allFile(
          filter: {
            extension: { regex: "/(woff2)|(woff)|(ttf)|(otf)|(eof)/" }
            sourceInstanceName: { eq: "fonts" }
          }
        ) {
          edges {
            node {
              id
              sourceInstanceName
              relativePath
              extension
            }
          }
        }
      }`
    }
    render={
      <Helmet>

      </Helmet>
    }
  />
)

