import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";

const Post = props => {
  const { post, author, slug } = props;
  const frontmatter = (post || {}).frontmatter;
  const title = ((post || {}).frontmatter || {}).title;
  const subTitle = ((post || {}).frontmatter || {}).subTitle;
  const date = ((post || {}).fields || {}).prefix;
  const html = (post || {}).html;
  const sharpImages = frontmatter.cover.childImageSharp;
  const responsiveSizes = sharpImages.responsiveSizes;

  return (
    <Article>
      <PostHeader title={title} subTitle={subTitle} date={date} />
      <Img responsiveSizes={responsiveSizes} />
      <Content html={html} />
    </Article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
};

export default Post;
