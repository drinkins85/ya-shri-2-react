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
            this.props.onAdd(firstName, lastName, company, description);
            this.refs.firstName.value = '';
            this.refs.lastName.value = '';
            this.refs.company.value = '';
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
                            Добавить преподавателя
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_size_half">
                                <input className="input input_size_xl input_margin-b" type="text" ref="firstName" placeholder="Имя"/>
                                <input className="input input input_size_xl input_margin-b" type="text" ref="lastName" placeholder="Фамилия"/>
                                <input className="input input input_size_xl"  type="text" ref="company" placeholder="Компания"/>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_half">
                                <textarea className="textarea textarea_size_xl" ref="description" placeholder="Дополнительная информация"></textarea>
                            </div>
                        </div>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_align_center schedule-table__col_size_full">
                                <Button className="button button_add button_color-sheme_yellow" type="submit">Добавить</Button>
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
    onAdd: PropTypes.func,
    errorAdd: PropTypes.func,
    errorHide: PropTypes.func
};

export default Form;