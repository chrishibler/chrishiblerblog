/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Socials from "./socials";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;

  return (
    <>
      <div className="bio-container">
        <div className="bio">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "jpeg", "png"]}
            src="../images/profile-pic.jpg"
            width={50}
            height={50}
            quality={95}
            alt="Profile picture"
          />
          {author?.name && (
            <p>
              Written by <strong>{author.name}</strong>{" "}
              {author?.summary || null}
            </p>
          )}
        </div>
        <Socials />
      </div>
    </>
  );
};

export default Bio;
