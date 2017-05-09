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
        let attr = 'selected';

        return(
            <select name="classrooms" onChange={this.handleChange} value={this.state.selected} >
                <option value="-1" >Аудитория</option>
                {
                    this.props.classrooms.map((classroom) => {
                        return (
                            <option key={classroom.id} value={classroom.id}>{classroom.title}</option>
                        )
                    })
                }
            </select>
        )
    }

}

Select.propTypes = {
    classrooms: PropTypes.array.isRequired,
    selectedId: PropTypes.number,
    onChange: PropTypes.func
};


export default Select;
