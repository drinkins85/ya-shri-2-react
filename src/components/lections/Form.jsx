import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import ClassroomsSelect from '../classrooms/Select'
import TeachersSelect from '../teachers/Select'
import SchoolsSelect from '../schools/Select'
import filtredLections from './filtredLections';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let err = [];
        let theme = this.refs.theme.value;
        let date = this.refs.date.value;
        let timeStart = this.refs.timeStart.value;
        let timeFinish = this.refs.timeFinish.value;
        let classroomId = +this.refs.classroom.state.selected;
        let teacherId = +this.refs.teacher.state.selected;
        let schoolIds = this.refs.schools.state.selected;

        this.props.errorHide();

        if (theme === ''){
            this.props.errorAdd("Укажите тему лекции");
            err++;
        }
        if (classroomId < 0){
            this.props.errorAdd("Укажите аудиторию");
            err++;
        }
        if (teacherId < 0){
            this.props.errorAdd("Укажите преподавателя");
            err++;
        }
        if (schoolIds.length === 0 ){
            this.props.errorAdd("Укажите школу");
            err++;
        }
        let dateStart = new Date(Date.parse(date+"T"+timeStart+":00.000+03:00"));
        let dateFinish = new Date(Date.parse(date+"T"+timeFinish+":00.000+03:00"));

        //есть ли лекции в это время
        let lectionsByDates = filtredLections(this.props.lections, {dateStart: dateStart, dateFinish: dateFinish});

        if (lectionsByDates.length > 0){
            // не пересекается ли аудитория
            let filterByClassroom = filtredLections(lectionsByDates, {classroom: classroomId});
            if(filterByClassroom.length >0){
                this.props.errorAdd("В данной аудитории уже назначены лекции в это время");
                err++;
            }
            // не пересекается ли преподаватель
            let filterByTeacher = filtredLections(lectionsByDates, {teacher: teacherId});
            if(filterByTeacher.length >0){
                this.props.errorAdd("У преподавателя уже назначены лекции в это время");
                err++;
            }
            // не пересекаются ли школы
            schoolIds.forEach((schoolId) => {
                let filterBySchool = filtredLections(lectionsByDates, {schools: [schoolId]});
                if (filterBySchool.length > 0){
                    let school = filterBySchool[0].schools.filter(school => school.id === schoolId)[0];
                    this.props.errorAdd(`Для ${school.title} уже назначены лекции в это время`);
                    err++;
                }
            });
        }

        if (err.length === 0) {
            let classroom = this.props.classrooms.filter(classroom => classroom._id === classroomId)[0];
            let teacher = this.props.teachers.filter(teacher => teacher._id === teacherId)[0];
            let schools = this.props.schools.filter(school => schoolIds.some((id) => id === school._id));

            let totalStudentsCount = schools.reduce(function(sum, school) {
                return sum + school.amount;
            }, 0);

            if (totalStudentsCount > classroom.capacity){
                this.props.errorAdd("Аудитория не вмещает такое количество студентов");
            } else {
                this.props.onAdd(theme, dateStart, dateFinish, classroom, teacher, schools);
                this.refs.theme.value = '';
                this.refs.date.value = '';
                this.refs.timeStart.value = '';
                this.refs.timeFinish.value = '';
                this.refs.classroom.setState({selected: -1});
                this.refs.teacher.setState({selected: -1});
                this.refs.schools.setState({selected: []});
            }
        }
    }

    render()
    {
        return (
            <div className="addForm">
                <div className="schedule-table">
                    <div className="schedule-table__row">
                        <div className="schedule-table__col schedule-table__col_size_xl">
                            Добавить лекцию
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_size_full">
                                <input className="input input_size_xl"
                                       type="text"
                                       placeholder="Тема лекции"
                                       ref="theme"
                                       onChange={this.props.errorHide}/>
                            </div>
                        </div>
                        <div className="schedule-table__row  horisontal-line_color_gray" >
                            <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                                <label>Дата</label>
                                <input className="input input_size_xm"  type="date" ref="date" onChange={this.props.errorHide}/>
                                <label> Начало</label>
                                <input className="input input_size_m" type="time" ref="timeStart"  onChange={this.props.errorHide}/>
                                <label> Окончание</label>
                                <input className="input input_size_m" type="time" ref="timeFinish" onChange={this.props.errorHide}/>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                                <div className="select-container select-classroom">
                                    <ClassroomsSelect classrooms={this.props.classrooms} ref="classroom" selectedId={-1}/>
                                </div>
                                <div className="select-container">
                                    <TeachersSelect teachers={this.props.teachers} ref="teacher" selectedId={-1} />
                                </div>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                                <div className="select-container">
                                    <SchoolsSelect schools={this.props.schools} ref="schools" selectedId={[]}/>
                                </div>
                            </div>
                        </div>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_size_full schedule-table__col_align_center">
                                <Button className="button button_add button_color-sheme_yellow" type="submit" >Добавить</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

Form.propTypes = {
    classrooms: PropTypes.array,
    lections: PropTypes.array,
    teachers: PropTypes.array,
    schools: PropTypes.array,
    onAdd: PropTypes.func,
    errorAdd: PropTypes.func,
    errorHide: PropTypes.func
};

export default Form;