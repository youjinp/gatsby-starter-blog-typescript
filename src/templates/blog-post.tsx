/* eslint-disable react/no-danger */
import React from "react";
import { Link, graphql, PageRendererProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import { Query, SitePageContext } from "../@types/graphql-types";

const BlogPostTemplate = (
  props: PageRendererProps & { pageContext: SitePageContext; data: Query }
) => {
  const data = props.data!;
  const post = data.markdownRemark!;
  const excerpt = post.excerpt!;
  const frontmatter = post.frontmatter!;
  const title = frontmatter.title!;
  const html = post.html!;
  const siteTitle = data.site!.siteMetadata!.title!;

  // const post = props.data.markdownRemark;
  // const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={title} description={frontmatter.description || excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              marginBottom: rhythm(1),
            }}
          >
            {frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields!.slug!} rel="prev">
                ← {previous.frontmatter!.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields!.slug!} rel="next">
                {next.frontmatter!.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
