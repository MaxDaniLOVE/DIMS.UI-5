import transformEditData from '../utils/transformEditData';

describe('Transforming data to edit:', () => {
  it('should return object with id=1 and date strings', () => {
    const pageType = 'MEMBERS_PAGE';
    const pageData = [
      {
        id: 0,
        birthDate: 1100000000000,
        startDate: 1590486108732,
      },
      {
        id: 1,
        birthDate: 1200000000000,
        startDate: 1590486108732,
      },
    ];
    const recievedId = 1;
    const expected = {
      id: 1,
      birthDate: '2008-01-10',
      startDate: '2020-05-26',
    };

    const result = transformEditData(pageType, pageData, recievedId);

    expect(result).toMatchObject(expected);
  });
  it('should return object with taskId=1 and date strings', () => {
    const pageType = 'TASK_PAGE';
    const pageData = [
      {
        taskId: 0,
        deadlineDate: 1100000000000,
        startDate: 1590486108732,
      },
      {
        taskId: 1,
        deadlineDate: 1200000000000,
        startDate: 1590486108732,
      },
    ];
    const recievedId = 1;
    const expected = {
      taskId: 1,
      deadlineDate: '2008-01-10',
      startDate: '2020-05-26',
    };

    const result = transformEditData(pageType, pageData, recievedId);

    expect(result).toMatchObject(expected);
  });
  it('should return object with taskTrackId=1 and date strings', () => {
    const pageType = 'TRACK_PAGE';
    const pageData = [
      {
        taskTrackId: 0,
        trackDate: 1100000000000,
      },
      {
        taskTrackId: 1,
        trackDate: 1200000000000,
      },
    ];
    const recievedId = 1;
    const expected = {
      taskTrackId: 1,
      trackDate: '2008-01-10',
    };

    const result = transformEditData(pageType, pageData, recievedId);

    expect(result).toMatchObject(expected);
  });
  it('should return null', () => {
    const pageType = '';
    const pageData = [
      {
        taskTrackId: 0,
        trackDate: 1100000000000,
      },
    ];
    const recievedId = 1;
    const expected = null;

    const result = transformEditData(pageType, pageData, recievedId);

    expect(result).toBe(expected);
  });
});
