import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import ClassroomsSelect from '../classrooms/Select';
import TeachersSelect from '../teachers/Select';
import SchoolsSelect from '../schools/Select';
import filtredLections from './filtredLections';

class Lection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate(prevProps,PrevState){
        if(this.state.isEditing){
            this.refs.theme.focus();
            this.refs.theme.select();
        }
    }

    handleSubmit(event){
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
        let dateStart = new Date(Date.parse(date+"T"+timeStart+":00.000+03:00"));
        let dateFinish = new Date(Date.parse(date+"T"+timeFinish+":00.000+03:00"));

        //есть ли лекции в это время
        let lectionsByDates = filtredLections(this.props.lections, {_id:this.props.id, dateStart: dateStart, dateFinish: dateFinish});

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
                    let school = filterBySchool[0].schools.filter(school => school._id === schoolId)[0];
                    this.props.errorAdd(`Для ${school.title} уже назначены лекции в это время`);
                    err++;
                }
            });
        }
        if (err.length === 0) {
            let classroom = this.props.allClassrooms.filter(classroom => classroom._id === classroomId)[0];
            let teacher = this.props.allTeachers.filter(teacher => teacher._id === teacherId)[0];
            let schools = this.props.allSchools.filter(school => schoolIds.some((id) => id === school._id));
            this.props.onEdit(this.props.id, theme, dateStart, dateFinish, classroom, teacher, schools);
            this.setState({isEditing:false});
        }

    }

    cancelEdit(event){
        event.preventDefault();
        this.setState({isEditing:false});
    }


    renderForm(){
        let year = this.props.dateStart.getFullYear();
        let month = this.props.dateStart.toLocaleString('ru', {month: '2-digit'});
        let day = this.props.dateStart.toLocaleString('ru', {day: '2-digit'});
        let timeStart = this.props.dateStart.toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});
        let timeFinish = this.props.dateFinish.toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});
        let date = year + '-' + month + '-' + day;
        return(
            <form onSubmit={this.handleSubmit} className="editForm">
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_size_full">
                        <input  className="input input_size_xl" type="text" ref="theme" defaultValue={this.props.theme}/>
                    </div>
                </div>
                <div className="schedule-table__row  horisontal-line_color_gray" >
                    <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                        <label>Дата</label>
                        <input className="input input_size_xm" type="date" ref="date" defaultValue={date}/>
                        <label> Начало</label>
                        <input className="input input_size_m" type="time" ref="timeStart" defaultValue={timeStart} />
                        <label> Окончание</label>
                        <input className="input input_size_m" type="time" ref="timeFinish" defaultValue={timeFinish} />
                     </div>
                    <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                        <div className="select-container select-classroom">
                            <ClassroomsSelect classrooms={this.props.allClassrooms} ref="classroom" selectedId={this.props.classroom._id}/>
                        </div>
                        <div className="select-container">
                            <TeachersSelect teachers={this.props.allTeachers} ref="teacher" selectedId={this.props.teacher._id} />
                        </div>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_third schedule-table__col_vertical_middle" >
                        <div className="select-container">
                            <SchoolsSelect schools={this.props.allSchools}
                                           ref="schools"
                                           selectedId={this.props.schools.map(school => school._id)}/>
                        </div>
                    </div>
                </div>
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_align_right schedule-table__col_size_half">
                        <Button className="button button_add button_color-sheme_yellow" type="submit">Сохранить</Button>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_half">
                        <Button className="button button_color-sheme_gray" onClick={this.cancelEdit}>Отменить</Button>
                    </div>
                </div>
            </form>
        )
    }

    renderDisplay(){
        let date = this.props.dateStart.getDate();
        let month = this.props.dateStart.toLocaleString('ru', {day: "2-digit", month: 'long'}).slice(2);
        let year = this.props.dateStart.getFullYear();
        let timeStart = this.props.dateStart.toLocaleString('ru', { hour: 'numeric', minute: 'numeric'});
        let timeFinish = this.props.dateFinish.toLocaleString('ru', { hour: 'numeric', minute: 'numeric'});
        let teacherDescriptionId = 'teacher_desc_'+ this.props.teacher._id;
        let classroomDescriptionId = 'classroom_desc_'+ this.props.classroom._id;
        return(
            <div className="schedule-table__row horisontal-line_color_gray" >
                <div className="schedule-table__col schedule-table__col-date schedule-table__col_size_m">
                    <span className="schedule-table__date">{date}</span>
                    <span className="schedule-table__month">{month}</span> <span className="schedule-table__year">{year}</span>
                </div>
                <div className="schedule-table__col schedule-table__col-time schedule-table__col_size_s">
                    <span className="schedule-table__time-from">{timeStart}</span> <span className="schedule-table__time-to">{timeFinish}</span>
                </div>
                <div className="schedule-table__col schedule-table__col-lection schedule-table__col_size_xl " >
                    <a href="#" className={`schedule-table__link_type_lection ${this.props.dateStart < Date.now() ? 'link_noactive' : ''}`}>
                        { this.props.theme }
                    </a>
                    {
                        this.props.schools.map(school => {
                            return(
                                <a className="schedule-table__school schedule-table__school_triangle" title={school.title}  key={school._id}>
                                    {school.title}
                                </a>
                             )
                        })
                    }
                </div>
                <div className="schedule-table__col schedule-table__col-prep schedule-table__col_size_l">
                    <a href={`#${teacherDescriptionId}`}  className="schedule-table__link_type_prep" data-modal="inline">
                        {this.props.teacher.firstName} {this.props.teacher.lastName}
                    </a>
                    <span className="schedule-table__prep-info">{this.props.teacher.company}</span>
                    <span className="schedule-table__location-label">Аудитория:</span>
                    <a href={`#${classroomDescriptionId}`} className="schedule-table__link_type_location" data-modal="inline">
                        {this.props.classroom.title}
                    </a><br/>
                    <Button className="button button_edit button_color-sheme_gray" onClick={()=>this.setState({ isEditing:true})}>Редактировать</Button>
                    <Button className="button button_delete button_color-sheme_gray" onClick={()=> this.props.onDelete(this.props.id)}>Удалить</Button>
                </div>
            </div>
        )
    }

    render(){
        return (this.state.isEditing ? this.renderForm() : this.renderDisplay());
    }
}


Lection.propTypes = {
    theme: PropTypes.string,
    classroom: PropTypes.object,
    dateStart: PropTypes.object,
    lections: PropTypes.array,
    dateFinish: PropTypes.object,
    teacher: PropTypes.object,
    schools: PropTypes.array,
    allClassrooms: PropTypes.array,
    allTeachers:PropTypes.array,
    allSchools:PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};


export default Lection;