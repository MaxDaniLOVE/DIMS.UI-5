import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';
import { GithubIcon, LinkedInIcon } from '../../assets/icons';
import InTouchForm from '../InTouchForm';

const AboutAuthor = () => (
  <>
    <Subtitle>About author</Subtitle>
    <Paragraph>
      Hi, my name is Max! I had graduated BNTU in 2019 as a logistician. In February of 2019, I&rsquo;ve started to
      learn front-end development, now I know JavaScript, HTML, CSS. Also, I know SASS, React.js and Node.js. If you
      want to watch some of my projects click the Github logo, If you want to hire me click LinkedIn logo and text me!
    </Paragraph>
    <div className='social-links'>
      <a id='github-link' href='https://github.com/MaxDaniLOVE' target='_blank' rel='noopener noreferrer'>
        <GithubIcon />
      </a>
      <a
        id='github-link'
        href='https://www.linkedin.com/in/maksim-danilau-js/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <LinkedInIcon />
      </a>
      <InTouchForm />
    </div>
  </>
);

export default AboutAuthor;
