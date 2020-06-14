import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';
import ImageWrapper from '../../UI/ImageWrapper';
import membersTasksExample from '../../assets/images/membersTasksExample.png';
import trackModalExample from '../../assets/images/trackModalExample.png';
import trackPageExample from '../../assets/images/trackPageExample.png';

const AboutMemberFeatures = () => (
  <>
    <Subtitle>How Members can use DIMS?</Subtitle>
    <Paragraph>
      First of all you have to contact your Mentor or Admin. They will add your profile to the database. After this you
      can register on DIMS. If you try to register in DIMS before adding your profile to the databse you will fail.
      After registration you will automatically log-in to the managment system. Use toggle switch bellow form to set
      Heroku as service to use. By default it will be Firebase.
    </Paragraph>
    <Paragraph>
      Was you successfull? Of course you were! Now you see your tasks page. There will be shown all your tasks from
      DevIncubator. It will look something like this:
    </Paragraph>
    <ImageWrapper>
      <img src={membersTasksExample} alt='members_tasks_page' />
    </ImageWrapper>
    <Paragraph>
      Click track button to add new track of your task. You will be redirected to track page, where automatically will
      be opened pop-up form to add track.
    </Paragraph>
    <ImageWrapper>
      <img src={trackModalExample} alt='track_modal' />
    </ImageWrapper>
    <Paragraph>
      Click save button to add new track. It&rsquo;s pretty simple. Now you can see Tracking page. Click track button to
      add new track or click track note to read more about it. On this page you can also delete unneccesary tracks and
      edit previously added tracks. Example of page:
    </Paragraph>
    <ImageWrapper>
      <img src={trackPageExample} alt='track_page' />
    </ImageWrapper>
    <Paragraph>
      That&rsquo;s All features availiable for members, now I show you features availiable for Admin.
    </Paragraph>
  </>
);

export default AboutMemberFeatures;
