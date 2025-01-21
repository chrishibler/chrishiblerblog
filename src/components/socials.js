import { SocialIcon } from "react-social-icons";
import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Socials = () => {
  const data = useStaticQuery(graphql`
    query SocialsQuery {
      site {
        siteMetadata {
          social {
            linkedin
            twitter
            instagram
            facebook
            github
          }
        }
      }
    }
  `);

  const social = data.site.siteMetadata?.social;
  const bg = "#3A3D40";
  return (
    <div className="socials">
      <SocialIcon
        url={`https://www.linkedin.com/in/${social.linkedin}`}
        bgColor={bg}
      />
      <SocialIcon
        url={`https://www.twitter.com/${social.twitter}`}
        bgColor={bg}
      />
      <SocialIcon
        url={`https://www.instagram.com/${social.instagram}`}
        bgColor={bg}
      />
      <SocialIcon
        url={`https://www.facebook.com/${social.facebook}`}
        bgColor={bg}
      />
      <SocialIcon
        url={`https://www.github.com/${social.github}`}
        bgColor={bg}
      />
    </div>
  );
};

export default Socials;
