import React from 'react';
import { Subtitle, Paragraph } from '../../UI/Titles';
import Layout from '../Layout';
import Table from '../../UI/Table';
import TableHeader from '../../UI/TableHeader';
import { infoTableHeaders as headers } from '../../utils/tableHeaders';
import infoTableFields from '../../utils/infoTableFields';
import { ReactComponent as Checked } from '../../assets/icons/check.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';

const AboutRoles = () => {
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
    <>
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
    </>
  );
};

export default AboutRoles;
