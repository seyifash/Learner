import React from 'react';
import './student.css';

class MyTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="studentTable">
        <h1>Student Scores</h1>
        <table>
          <thead className="table-header">
            <tr>
              <th>Quiz Taken</th>
              <th>Subject</th>
              <th>Candidate Name</th>
              <th>Candidate Score</th>  
            </tr>
          </thead>
          <tbody>
            {data.map((quiz, index) => (
              quiz.student.map((student, idx) => (
                <tr key={`${index}-${idx}`}>
                  {idx === 0 && (
                    <React.Fragment>
                      <td rowSpan={quiz.student.length} className="quiz-info">Quiz {index + 1}</td>
                      <td rowSpan={quiz.student.length} className="subject-info">{quiz.subject}</td>
                    </React.Fragment>
                  )}
                  <td className="candidate-info">{student.lastname} {student.firstname}</td>
                  <td className="candidate-info">{student.score}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyTable;
