import React from 'react';
import PropTypes from 'prop-types';



class Select extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected: this.props.selectedId
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event){
        let selectedId = event.target.value;
        this.setState({selected: selectedId})
    }


    render(){
        return(
            <select name="teachers" onChange={this.handleChange} value={this.state.selected}>
                <option value="-1" >Преподаватель</option>
                {
                    this.props.teachers.map((teacher) => {
                        return (
                            <option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                        )
                    })
                }
            </select>
        )
    }

}

Select.propTypes = {
    teachers: PropTypes.array.isRequired,
    onChange: PropTypes.func
};


export default Select;
