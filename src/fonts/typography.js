import { graphql } from "gatsby";

// eslint-disable-next-line no-undef
export const query = graphql`
  query FontsQuery {
    fonts: allFile(filter: {
      extension: { regex: "/(woff2)|(woff)|(ttf)|(otf)|(eof)/" } },
      relativeDirectory: { eq: "fonts" }
    ) {
    edges {
      node {
        id
        name
      }
    }
  }
`;

export default {
  "@font-face": [
    {

    },
  ]
}

