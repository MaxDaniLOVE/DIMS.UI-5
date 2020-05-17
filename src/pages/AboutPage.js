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
      <Subtitle>How members can use DIMS?</Subtitle>
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
      <div className='image-wrapper'>
        <img src={membersTasksExample} alt='members_tasks_page' />
      </div>
      <Paragraph>
        Click track button to add new track of your task. (By now feature availiable only for Fireabse service). You
        will be redirected to track page, where automatically will be opened pop-up form to add track.
      </Paragraph>
      <div className='image-wrapper'>
        <img src={trackModalExample} alt='track_modal' />
      </div>
      <Paragraph>
        Click save button to add new track. It&rsquo;s pretty simple. Now you can see Tracking page. Click task name to
        add new track or click track note to read more about it. On this page you can also delete unneccesary tracks and
        edit previously added tracks. Example of page:
      </Paragraph>
      <div className='image-wrapper'>
        <img src={trackPageExample} alt='track_page' />
      </div>
      <Paragraph>
        That&rsquo;s All features availiable for members, now I show you features availiable for Admin.
      </Paragraph>
    </div>
  );
};

export default AboutPage;
