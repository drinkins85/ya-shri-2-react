import React from 'react';
import PropTypes from 'prop-types';
import Lection from "./Lection";
import LectionForm from './Form';
import LectionFilter from './Filter';
import filtredLections from './filtredLections';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Lections extends React.Component{

    render(){
        let lections = this.props.lections;
        if(this.props.lectionsFilter){
            lections = filtredLections(this.props.lections, this.props.lectionsFilter);
        }
        return(
            <div className="schedule-table">
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_color_dark schedule-table__col_align_center schedule-table__col_size_full schedule-table__col_vertical_middle" >
                        <h2>Расписание лекций</h2>
                    </div>
                </div>
                <LectionFilter classrooms={this.props.classrooms}
                               teachers={this.props.teachers}
                               schools={this.props.schools}
                               onFilter={this.props.actions.filterLection}
                               onReset={this.props.actions.filterLectionClear}/>
                <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {lections.map((lection) => {
                        return (
                            <Lection  key={lection.id}
                                      id={lection.id}
                                      theme={lection.theme}
                                      dateStart={lection.dateStart}
                                      dateFinish={lection.dateFinish}
                                      classroom={lection.classroom}
                                      teacher={lection.teacher}
                                      schools={lection.schools}
                                      onEdit={this.props.actions.editLection}
                                      onDelete={this.props.actions.deleteLection}
                                      errorAdd={this.props.errActions.addError}
                                      errorHide={this.props.errActions.deleteErrors}
                                      allClassrooms={this.props.classrooms}
                                      allTeachers={this.props.teachers}
                                      allSchools={this.props.schools}
                                      lections={this.props.lections}
                            />
                        )})
                    }
                </CSSTransitionGroup>
                <LectionForm onAdd={this.props.actions.addLection}
                             lections={this.props.lections}
                             classrooms={this.props.classrooms}
                             teachers={this.props.teachers}
                             schools={this.props.schools}
                             errorAdd={this.props.errActions.addError}
                             errorHide={this.props.errActions.deleteErrors}
                />

            </div>
        )
    }

}

Lections.propTypes = {
    lections: PropTypes.array.isRequired,
    classrooms: PropTypes.array,
    schools: PropTypes.array,
    teachers: PropTypes.array,
    actions: PropTypes.object,
    errActions: PropTypes.object,
    lectionsFilter: PropTypes.object
};

export default Lections;

