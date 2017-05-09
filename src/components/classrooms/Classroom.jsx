import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import filtredLections from '../lections/filtredLections';

class Classroom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteClassroom = this.deleteClassroom.bind(this);
    }

    componentDidUpdate(prevProps,PrevState){
        if(this.state.isEditing){
            this.refs.title.focus();
            this.refs.title.select();
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let err = [];
        let title = this.refs.title.value;
        let capacity = +this.refs.capacity.value;
        let description = this.refs.description.value;
        this.props.errorHide();
        if (title === ''){
            this.props.errorAdd("Укажите название аудитории");
            err++;
        }
        if (capacity === 0 ){
            this.props.errorAdd("Укажите вместимость аудитории");
            err++;
        }
        if (err.length === 0) {
            this.props.onEdit(this.props.id, title, capacity, description);
            this.setState({isEditing:false});
        }
    }

    cancelEdit(event){
        event.preventDefault();
        this.setState({isEditing:false});
    }

    deleteClassroom(){
        this.props.errorHide();
        let err = [];
        let lectionsByClassroom = filtredLections(this.props.lections, {dateStart: new Date(), classroom: this.props.id});
        if(lectionsByClassroom.length >0){
            this.props.errorAdd("В этой аудитории назначены лекции");
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
                        <input className="input input_size_xl input_margin-b" type="text" ref="title" defaultValue={this.props.title}/>
                        <input className="input input_size_xl" type="number" ref="capacity" defaultValue={this.props.capacity}/>
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
        let descriptionId = 'classroom_desc_'+ this.props.id;
        return(
            <div>
                <div className="schedule-table__row horisontal-line_color_gray">
                    <div className="schedule-table__col schedule-table__col_size_l " >
                        <a href={`#${descriptionId}`} className="schedule-table__link_type_prep" data-modal="inline">
                            {this.props.title}
                        </a>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_l">
                        {this.props.capacity} человек
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_xl">
                        <Button className="button button_edit button_color-sheme_gray" onClick={()=>this.setState({ isEditing:true})}>
                            Редактировать
                        </Button>
                        <Button className="button button_delete button_color-sheme_gray" onClick={this.deleteClassroom}>
                            Удалить
                        </Button>
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


Classroom.propTypes = {
    title: PropTypes.string,
    capacity: PropTypes.number,
    description: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    lections: PropTypes.array
};


export default Classroom;