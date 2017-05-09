import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
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
            this.props.onAdd(title, capacity, description);
            this.refs.title.value = '';
            this.refs.capacity.value = '';
            this.refs.description.value = '';
        }
    }

    render()
    {
        return (
            <div className="addForm">
                <div className="schedule-table">
                    <div className="schedule-table__row">
                        <div className="schedule-table__col schedule-table__col_size_xl">
                            Добавить аудиторию
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_size_half">
                                <input className="input input_size_xl input_margin-b"
                                       type="text"
                                       placeholder="Название аудитории"
                                       ref="title"
                                       onChange={this.props.errorHide}/>
                                <input className="input input_size_xl" type="number" ref="capacity" placeholder="Вместимость"/>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_half">
                                <textarea className="textarea textarea_size_xl"  placeholder="Дополнительная информация" ref="description"></textarea>
                            </div>

                        </div>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_align_center schedule-table__col_size_full">
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
    onAdd: PropTypes.func,
    errorAdd: PropTypes.func,
    errorHide: PropTypes.func
};

export default Form;