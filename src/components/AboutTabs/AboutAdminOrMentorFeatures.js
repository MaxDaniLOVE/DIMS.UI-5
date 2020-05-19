import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';
import ImageWrapper from '../../UI/ImageWrapper';
import membersPageExample from '../../assets/images/membersPageExample.png';
import membersModalExample from '../../assets/images/membersModalExample.png';
import userTasksPageExample from '../../assets/images/userTasksPageExample.png';
import progressPageExample from '../../assets/images/progressPageExample.png';
import tasksModalExample from '../../assets/images/tasksModalExample.png';
import tasksPageExample from '../../assets/images/tasksPageExample.png';

const AboutAdminOrMentorFeatures = () => {
  return (
    <>
      <Subtitle>How Admin and Mentor can use DIMS?</Subtitle>
      <Paragraph>
        After Log-in as Admin or Mentor you will be automatically redirected to members page, which looks like this:
      </Paragraph>
      <ImageWrapper>
        <img src={membersPageExample} alt='members_page' />
      </ImageWrapper>
      <Paragraph>
        If you are logged-in as Mentor there will be hidden buttons such as: register, edit, delete.
        Create/update/delete features availiable only for Admin. But both Admin and Mentor can click full name of user
        to read info about him/her.
      </Paragraph>
      <Paragraph>To register user click Register button and you will see empty register form. For example:</Paragraph>
      <ImageWrapper>
        <img src={membersModalExample} alt='members_modal' />
      </ImageWrapper>
      <Paragraph>Click Tasks button to see all members tasks. It will looks like this:</Paragraph>
      <ImageWrapper>
        <img src={userTasksPageExample} alt='members_tasks_page' />
      </ImageWrapper>
      <Paragraph>
        As you can see it&rsquo;s quite similar to tasks page when you log-in as Member, but Track button replaced by
        Mark buttons. Click it to set user mark (Fail or Success)
      </Paragraph>
      <Paragraph>Click progress button on Members page to watch all members tracks. Example:</Paragraph>
      <ImageWrapper>
        <img src={progressPageExample} alt='members_progress_page' />
      </ImageWrapper>
      <Paragraph>
        If you click on task name will be opened modal window to edit task. Set task name, description and assign
        members just like this:
      </Paragraph>
      <ImageWrapper>
        <img src={tasksModalExample} alt='task_modal' />
      </ImageWrapper>
      <Paragraph>Click save button to finish editing. Now you can see Task page:</Paragraph>
      <ImageWrapper>
        <img src={tasksPageExample} alt='task_page' />
      </ImageWrapper>
      <Paragraph>
        On this page features availiable for Mentor and Admin both. Feel free do add new tasks(Create button) and edit
        it(Edit button). Also you can delete task which you consider outdated
      </Paragraph>
    </>
  );
};

export default AboutAdminOrMentorFeatures;
