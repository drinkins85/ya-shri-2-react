import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import ClassroomsSelect from '../classrooms/Select';
import TeachersSelect from '../teachers/Select';
import SchoolsSelect from '../schools/Select';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReset: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    resetFilter(event){
        event.preventDefault();
        this.props.onReset();
        this.refs.classroom.setState({selected: -1});
        this.refs.teacher.setState({selected: -1});
        this.refs.school.setState({selected: -1});
        this.refs.dateStart.value = '';
        this.refs.dateFinish.value = '';

        this.setState({showReset: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        let classroomId = +this.refs.classroom.state.selected;
        let teacherId = +this.refs.teacher.state.selected;
        let schoolId = +this.refs.school.state.selected;
        let dateStart = this.refs.dateStart.value;
        let dateFinish = this.refs.dateFinish.value;


        let filter = {};
        if (classroomId >=0){
            filter.classroom = classroomId;
        }
        if (teacherId >=0){
            filter.teacher = teacherId;
        }
        if (schoolId >=0){
            filter.schools = [schoolId];
        }
        if (dateStart !== ''){
            filter.dateStart = new Date(Date.parse(dateStart));
        }
        if (dateFinish !== ''){
            filter.dateFinish = new Date(Date.parse(dateFinish));
        }

        this.props.onFilter(filter);
        this.setState({showReset: true});

    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="schedule-table__row  horisontal-line_color_gray schedule-table__row_color_lightgray" id="filter">
                    <div className="schedule-table__col schedule-table__col_size_l schedule-table__col_vertical_middle" >
                        <input className="input input_size_xl input_prefix_from input_margin-b"  type="date" ref="dateStart"/>
                        <input className="input input_size_xl input_prefix_to" type="date" ref="dateFinish"/>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_l schedule-table__col_vertical_middle" >
                        <div className="select-container select-classroom">
                            <ClassroomsSelect classrooms={this.props.classrooms} ref="classroom" selectedId={-1}/>
                        </div>
                        <div className="select-container">
                            <TeachersSelect teachers={this.props.teachers} ref="teacher" selectedId={-1} />
                        </div>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                        <div className="select-container">
                            <SchoolsSelect schools={this.props.schools} ref="school" selectedId={-1}/>
                        </div>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_l schedule-table__col_vertical_middle schedule-table__col_align_center" >
                        <Button className="button button_color-sheme_yellow" type="submit" >Фильтр</Button>
                        { this.state.showReset ?
                            <Button className="button button_color-sheme_gray" onClick={this.resetFilter}>Сбросить фильтр</Button>
                            :
                            ''
                        }
                    </div>
                </div>
            </form>
        )
    }


}

Filter.propTypes = {
    classrooms: PropTypes.array,
    teachers: PropTypes.array,
    schools: PropTypes.array,
    onFilter: PropTypes.func,
    onReset: PropTypes.func
};

export default Filter;