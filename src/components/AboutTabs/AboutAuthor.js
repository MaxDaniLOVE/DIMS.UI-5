import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';
import { GithubIcon, LinkedInIcon } from '../../assets/icons';
import InTouchForm from '../InTouchForm';
import { SocialNetworksLink } from '../../UI/CustomLinks';

const AboutAuthor = () => (
  <>
    <Subtitle>About author</Subtitle>
    <Paragraph>
      Hi, my name is Max! I had graduated BNTU in 2019 as a logistician. In February of 2019, I&rsquo;ve started to
      learn front-end development, now I know JavaScript, HTML, CSS. Also, I know SASS, React.js and Node.js. If you
      want to watch some of my projects click the Github logo. If you want to hire me click LinkedIn logo and text me or
      click &quot;Hire me!&quot; button and send me mail:
    </Paragraph>
    <div className='about-author__footer'>
      <div className='social-links'>
        <SocialNetworksLink href='https://github.com/MaxDaniLOVE'>
          <GithubIcon />
        </SocialNetworksLink>
        <SocialNetworksLink href='https://www.linkedin.com/in/maksim-danilau-js/'>
          <LinkedInIcon />
        </SocialNetworksLink>
      </div>
      <InTouchForm />
    </div>
  </>
);

export default AboutAuthor;
