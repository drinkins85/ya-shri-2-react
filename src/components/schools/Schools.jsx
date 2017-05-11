import React from 'react';
import PropTypes from 'prop-types';
import School from "./School";
import SchoolsForm from './Form';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


class Schools extends React.Component{

    render(){
        return(
            <div className="schedule-table" >
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_color_dark schedule-table__col_align_center schedule-table__col_size_full schedule-table__col_vertical_middle" >
                        <h2>Школы</h2>
                    </div>
                </div>
                {this.props.schools.length === 0 ?
                    <div className="loading"></div>
                    :
                    <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}>
                        {this.props.schools.map((school) => {
                            return (
                                <School title={school.title}
                                        amount={school.amount}
                                        id={school._id}
                                        key={school._id}
                                        onEdit={this.props.actions.editSchool}
                                        onDelete={this.props.actions.deleteSchool}
                                        errorAdd={this.props.errActions.addError}
                                        errorHide={this.props.errActions.deleteErrors}
                                        lections={this.props.lections}
                                />
                            )
                        })
                        }
                    </CSSTransitionGroup>
                }
                <SchoolsForm onAdd={this.props.actions.addSchool}
                             errorAdd={this.props.errActions.addError}
                             errorHide={this.props.errActions.deleteErrors}
                />
            </div>
        )
    }

}

Schools.propTypes = {
    schools: PropTypes.array.isRequired,
    lections: PropTypes.array,
    actions: PropTypes.object,
    errActions: PropTypes.object
};

export default Schools;
