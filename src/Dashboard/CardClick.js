import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { uniqueSubjects } from './dashBoardUtils';

const CardClick = ({handleCardClick}) => {
    const toggles = useSelector(state => state.toggle);
    const { questions, studentCount } = toggles;
    const subjectsCount = uniqueSubjects(questions, true);

    const dashBoardMainItems = [
      {id: 1, icons: <i class='bx bxs-graduation'></i>, CardName: "Available Courses", numbers: subjectsCount},
      {id: 2, icons: <i class='bx bx-library'></i>, CardName: "All Questions", numbers: questions.length},
      {id: 3, icons: <i class='bx bx-male-female'></i>, CardName: "Students", numbers: studentCount},
      {id: 4, icons: <i class='bx bx-code'></i>, CardName: "Trending", numbers: 1024},
    ];

  return (
    <div className="CardBox">
      {dashBoardMainItems.map(item => (
          <div className="Cards" key={item.id} id={item.id} onClick={() => handleCardClick(item.id)}>
              <div>
                  <div className="Numbers">{item.numbers}</div>
                  <div className="CardName">{item.CardName}</div>
              </div>
              <div className="iconBx">
                  {item.icons}
              </div>
          </div>
      ))}
    </div>
);
}

CardClick.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
};

export default CardClick;