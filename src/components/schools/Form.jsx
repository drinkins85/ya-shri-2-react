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
            this.props.onAdd(title, amount);
            this.refs.title.value = '';
            this.refs.amount.value = '';
        }
    }

    render()
    {
        return (
            <div className="addForm">
                <div className="schedule-table">
                    <div className="schedule-table__row">
                        <div className="schedule-table__col schedule-table__col_size_xl">
                            Добавить школу
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="schedule-table__row">
                            <div className="schedule-table__col schedule-table__col_size_xl">
                                <input type="text"
                                       className="input input_size_xl"
                                       placeholder="Название школы"
                                       ref="title"
                                       onChange={this.props.errorHide}/>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_l">
                                <input type="number" ref="amount" className="input input input_size_xl" placeholder="Количество учеников"/>
                            </div>
                            <div className="schedule-table__col schedule-table__col_size_l">
                                <Button type="submit" className="button button_add button_color-sheme_yellow" >Добавить</Button>
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