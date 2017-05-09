import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import filtredLections from '../lections/filtredLections';


class Teacher extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);
    }

    componentDidUpdate(prevProps,PrevState){
        if(this.state.isEditing){
            this.refs.firstName.focus();
            this.refs.firstName.select();
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let err = [];
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let company = this.refs.company.value;
        let description = this.refs.description.value;

        this.props.errorHide();
        if (firstName === ''){
            this.props.errorAdd("Укажите имя преподавателя");
            err++;
        }
        if (lastName === ''){
            this.props.errorAdd("Укажите фамилию преподавателя");
            err++;
        }

        if (err.length === 0) {
            this.props.onEdit(this.props.id, firstName, lastName, company, description);
            this.setState({isEditing:false});
        }
    }

    cancelEdit(event){
        event.preventDefault();
        this.setState({isEditing:false});
    }

    deleteTeacher(){
        this.props.errorHide();
        let err = [];
        let lectionsByTeacher = filtredLections(this.props.lections, {dateStart: new Date(), teacher: this.props.id});
        if(lectionsByTeacher.length >0){
            this.props.errorAdd("У преподавателя назначены лекции");
            err++;
        }
        if (err.length === 0) {
            this.props.onDelete(this.props.id);
            this.props.errorHide();
        }
    }


    renderForm(){
        return(
            <form onSubmit={this.handleSubmit} className="editForm">
                <div className="schedule-table__row">
                    <div className="schedule-table__col schedule-table__col_size_half">
                        <input className="input input_size_xl input_margin-b" type="text" ref="firstName" defaultValue={this.props.firstName}/>
                        <input className="input input input_size_xl input_margin-b" type="text" ref="lastName" defaultValue={this.props.lastName}/>
                        <input className="input input input_size_xl" type="text" ref="company" defaultValue={this.props.company}/>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_half">
                          <textarea className="textarea textarea_size_xl" ref="description" defaultValue={this.props.description}></textarea>
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
        let descriptionId = 'teacher_desc_'+ this.props.id;
        return(
            <div>
                <div className="schedule-table__row horisontal-line_color_gray">
                    <div className="schedule-table__col schedule-table__col_size_third " >
                        <a href={`#${descriptionId}`} className="schedule-table__link_type_prep" data-modal="inline">
                            {this.props.firstName} {this.props.lastName}
                        </a>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_third">
                        {this.props.company}
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_third">
                        <Button className="button button_edit button_color-sheme_gray" onClick={()=>this.setState({ isEditing:true})}>Редактировать</Button>
                        <Button className="button button_delete button_color-sheme_gray" onClick={this.deleteTeacher}>Удалить</Button>
                    </div>
                </div>
                <div className="hidden">
                    <div id={`${descriptionId}`}><div className="modal-desc">{this.props.description}</div></div>
                </div>
            </div>
        )
    }

    render(){
        return (this.state.isEditing ? this.renderForm() : this.renderDisplay());
    }
}


Teacher.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    company: PropTypes.string,
    description: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    lections: PropTypes.array
};


export default Teacher;