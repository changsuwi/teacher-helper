import { Fragment } from "react";

interface GroupTableProps {
  groups: Student[][];
}

const GroupTable = ({ groups }: GroupTableProps) => {
  return (
    <table className="w-full border border-gray-500">
      <thead className="text-left border border-gray-500 ">
        <tr>
          <th>Group</th>
          <th>Student Number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((students, index) => (
          <Fragment key={index}>
            <tr>
              <td colSpan={3}>Group {index + 1}</td>
            </tr>
            {students.map((student) => (
              <tr key={student.studentNumber}>
                <td></td>
                <td>{student.studentNumber}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default GroupTable;