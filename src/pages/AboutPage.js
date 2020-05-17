import React from 'react';
import { MainTitle, Subtitle, Paragraph } from '../UI/Titles';
import Table from '../UI/Table';
import TableHeader from '../UI/TableHeader';
import { LinkButton } from '../UI/Buttons';
import infoTableFields from '../utils/infoTableFields';
import Layout from '../components/Layout';

const AboutPage = () => {
  const tableBody = infoTableFields.map(({ actions, admin, mentor, member }) => (
    <tr key={actions}>
      <td>{actions}</td>
      <td>{admin}</td>
      <td>{mentor}</td>
      <td>{member}</td>
    </tr>
  ));
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
            <TableHeader headers={['Actions', 'Admin', 'Mentor', 'Member']} />
            <tbody>{tableBody}</tbody>
          </>
        </Table>
      </Layout>
      <Subtitle>How to use DIMS?</Subtitle>
      <Paragraph>I don&apos;t know...</Paragraph>
      <Subtitle>Are you excited? Click button bellow to start using DIMS!</Subtitle>
      <LinkButton link='/'>GO</LinkButton>
    </div>
  );
};

export default AboutPage;
