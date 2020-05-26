import setModalPageData from '../utils/setModalPageData';

const defaultProps = {
  members: [{ memberId: 1 }, { memberId: 2 }, { memberId: 3 }],
  tasks: [{ taskId: 1 }, { taskId: 2 }, { taskId: 3 }],
  progress: [{ taskTrackId: 1 }, { taskTrackId: 2 }, { taskTrackId: 3 }],
};

describe('Set modal page data:', () => {
  it('should return array of members', () => {
    const pageType = 'MEMBERS_PAGE';
    const expected = defaultProps.members;

    const result = setModalPageData(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
  it('should return array of tasks', () => {
    const pageType = 'TASK_PAGE';
    const expected = defaultProps.tasks;

    const result = setModalPageData(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
  it('should return array of user progress', () => {
    const pageType = 'TRACK_PAGE';
    const expected = defaultProps.progress;

    const result = setModalPageData(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
});
