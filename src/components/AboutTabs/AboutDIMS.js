import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';

const AboutDIMS = () => (
  <>
    <Subtitle>What is DIMS?</Subtitle>
    <Paragraph>
      DIMS stands for &apos;Dev Incubator Management System&apos;. In the few words, it is a system for getting tasks
      and tracking time. There are several user roles in the DIMS:
    </Paragraph>
    <ul className='about-page__list'>
      <li>The first one is Admin;</li>
      <li>The second one is the Mentor;</li>
      <li>The last one is the Member. It&apos;s just like you!</li>
    </ul>
  </>
);

export default AboutDIMS;
