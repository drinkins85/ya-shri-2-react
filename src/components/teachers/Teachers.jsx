import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Teacher from "./Teacher";
import TeachersForm from './Form';


class Teachers extends React.Component{

    render(){
        return(
            <div className="schedule-table">
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_color_dark schedule-table__col_align_center schedule-table__col_size_full schedule-table__col_vertical_middle" >
                        <h2>Преподаватели</h2>
                    </div>
                </div>
                {this.props.teachers.length === 0 ?
                    <div className="loading"></div>
                    :
                    <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}>
                        {this.props.teachers.map((teacher) => {
                            return (
                                <Teacher key={teacher._id}
                                         id={teacher._id}
                                         firstName={teacher.firstName}
                                         lastName={teacher.lastName}
                                         company={teacher.company}
                                         description={teacher.description}
                                         onEdit={this.props.actions.editTeacher}
                                         onDelete={this.props.actions.deleteTeacher}
                                         errorAdd={this.props.errActions.addError}
                                         errorHide={this.props.errActions.deleteErrors}
                                         lections={this.props.lections}
                                />
                            )
                        })
                        }
                    </CSSTransitionGroup>
                }
                <TeachersForm onAdd={this.props.actions.addTeacher}
                              errorAdd={this.props.errActions.addError}
                              errorHide={this.props.errActions.deleteErrors}
                />
            </div>
        )
    }

}

Teachers.propTypes = {
    teachers: PropTypes.array.isRequired,
    actions: PropTypes.object,
    errActions: PropTypes.object,
    lections: PropTypes.array
};

export default Teachers;
