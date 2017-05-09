import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import filtredLections from '../lections/filtredLections';


class School extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteSchool = this.deleteSchool.bind(this);
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
        let amount = +this.refs.amount.value;
        this.props.errorHide();
        if (title === ''){
            this.props.errorAdd("Укажите название школы");
            err++;
        }
        if (amount === 0 ){
            this.props.errorAdd("Укажите количество учеников");
            err++;
        }
        if (err.length === 0) {
            this.props.onEdit(this.props.id, title, amount);
            this.setState({isEditing:false});
        }
    }

    cancelEdit(event){
        event.preventDefault();
        this.setState({isEditing:false});
    }

    deleteSchool(){
        this.props.errorHide();
        let err = [];
        let lectionsBySchool = filtredLections(this.props.lections, {dateStart: new Date(), schools: [this.props.id]});
        if(lectionsBySchool.length >0){
            this.props.errorAdd("Для школы назначены лекции");
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
                    <div className="schedule-table__col schedule-table__col_size_xl">
                        <input  className="input input_size_xl" type="text" ref="title" defaultValue={this.props.title}/>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_m">
                        <input className="input input input_size_xl" type="number" ref="amount" defaultValue={this.props.amount}/>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_l schedule-table__col_align_right">
                        <Button type="submit" className="button button_add button_color-sheme_yellow" >Сохранить</Button>
                    </div>
                    <div className="schedule-table__col schedule-table__col_size_m">
                        <Button className="button button_color-sheme_gray" onClick={this.cancelEdit}>Отменить</Button>
                    </div>
                </div>
            </form>
        )
    }

    renderDisplay(){
        return(
            <div className="schedule-table__row horisontal-line_color_gray">
                <div className="schedule-table__col schedule-table__col_size_third " >{this.props.title}</div>
                <div className="schedule-table__col schedule-table__col_size_third">{this.props.amount} человек</div>
                <div className="schedule-table__col schedule-table__col_size_third">
                    <Button className="button button_edit button_color-sheme_gray" onClick={()=>this.setState({ isEditing:true})}>
                        Редактировать
                    </Button>
                    <Button className="button button_delete button_color-sheme_gray" onClick={this.deleteSchool}>
                        Удалить
                    </Button>
                </div>
            </div>
        )
    }

    render(){
        return (this.state.isEditing ? this.renderForm() : this.renderDisplay());
    }
}


School.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};


export default School;