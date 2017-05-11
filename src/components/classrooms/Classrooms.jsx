import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Classroom from "./Classroom";
import ClassroomForm from './Form';

class Classrooms extends React.Component{

    render(){
        return(
            <div className="schedule-table"  >
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_color_dark schedule-table__col_align_center schedule-table__col_size_full schedule-table__col_vertical_middle" >
                        <h2>Аудитории</h2>
                    </div>
                </div>
                {
                    this.props.classrooms.length === 0 ?
                        <div className="loading"></div>
                        :
                        <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            {this.props.classrooms.map((classroom) => {
                                return (
                                    <Classroom title={classroom.title}
                                               capacity={classroom.capacity}
                                               description={classroom.description}
                                               id={classroom._id}
                                               key={classroom._id}
                                               onEdit={this.props.actions.editClassroom}
                                               onDelete={this.props.actions.deleteClassroom}
                                               errorAdd={this.props.errActions.addError}
                                               errorHide={this.props.errActions.deleteErrors}
                                               lections={this.props.lections}
                                    />
                                )})
                            }
                        </CSSTransitionGroup>
                }
                <ClassroomForm onAdd={this.props.actions.addClassroom}
                               errorAdd={this.props.errActions.addError}
                               errorHide={this.props.errActions.deleteErrors}
                />

            </div>
        )
    }

}

Classrooms.propTypes = {
    classrooms: PropTypes.array.isRequired,
    actions: PropTypes.object,
    errActions: PropTypes.object,
    lections: PropTypes.array
};

export default Classrooms;
