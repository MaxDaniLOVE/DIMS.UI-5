import React from 'react';
import { MainTitle, Subtitle, Paragraph } from '../UI/Titles';
import Table from '../UI/Table';
import TableHeader from '../UI/TableHeader';
import infoTableFields from '../utils/infoTableFields';
import Layout from '../components/Layout';
import { infoTableHeaders as headers } from '../utils/tableHeaders';
import { ReactComponent as Checked } from '../assets/icons/check.svg';
import { ReactComponent as Cross } from '../assets/icons/cross.svg';
import membersTasksExample from '../assets/images/membersTasksExample.png';
import trackModalExample from '../assets/images/trackModalExample.png';
import trackPageExample from '../assets/images/trackPageExample.png';
import membersPageExample from '../assets/images/membersPageExample.png';
import membersModalExample from '../assets/images/membersModalExample.png';
import userTasksPageExample from '../assets/images/userTasksPageExample.png';
import progressPageExample from '../assets/images/progressPageExample.png';
import tasksModalExample from '../assets/images/tasksModalExample.png';
import tasksPageExample from '../assets/images/tasksPageExample.png';
import ImageWrapper from '../UI/ImageWrapper';

const AboutPage = () => {
  const tableBody = infoTableFields.map(({ actions, admin, mentor, member }) => {
    return (
      <tr key={actions}>
        <td>{actions}</td>
        <td>{admin ? <Checked /> : <Cross />}</td>
        <td>{mentor ? <Checked /> : <Cross />}</td>
        <td>{member ? <Checked /> : <Cross />}</td>
      </tr>
    );
  });
  return (
    <div className='about-page'>
      <MainTitle>Welcome to DIMS!</MainTitle>
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
      <Subtitle>What can the roles do?</Subtitle>
      <Paragraph>There is a little table which can provide you all info about user roles:</Paragraph>
      <Layout>
        <Table className='info-table'>
          <>
            <TableHeader headers={headers} />
            <tbody>{tableBody}</tbody>
          </>
        </Table>
      </Layout>
      <Subtitle>How Members can use DIMS?</Subtitle>
      <Paragraph>
        First of all you have to contact your Mentor or Admin. They will add your profile to the database. After this
        you can register on DIMS. If you try to register in DIMS before adding your profile to the databse you will
        fail. After registration you will automatically log-in to the managment system. Use toggle switch bellow form to
        set Azure as service to use. By default it will be Firebase.
      </Paragraph>
      <Paragraph>
        Was you successfull? Of course you were! Now you see your tasks page. There will be shown all your tasks from
        DevIncubator. It will look something like this:
      </Paragraph>
      <ImageWrapper>
        <img src={membersTasksExample} alt='members_tasks_page' />
      </ImageWrapper>
      <Paragraph>
        Click track button to add new track of your task. (By now feature availiable only for Fireabse service). You
        will be redirected to track page, where automatically will be opened pop-up form to add track.
      </Paragraph>
      <ImageWrapper>
        <img src={trackModalExample} alt='track_modal' />
      </ImageWrapper>
      <Paragraph>
        Click save button to add new track. It&rsquo;s pretty simple. Now you can see Tracking page. Click task name to
        add new track or click track note to read more about it. On this page you can also delete unneccesary tracks and
        edit previously added tracks. Example of page:
      </Paragraph>
      <ImageWrapper>
        <img src={trackPageExample} alt='track_page' />
      </ImageWrapper>
      <Paragraph>
        That&rsquo;s All features availiable for members, now I show you features availiable for Admin.
      </Paragraph>
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
      <Subtitle>Author</Subtitle>
      <Paragraph>Will be added later</Paragraph>
    </div>
  );
};

export default AboutPage;
