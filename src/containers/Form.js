import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormView from '../components/FormView'

class Form extends Component {

  componentDidMount(){
    this.props.getForm();
  }
  render() {
    return (
      <div className="app">
        <FormView  
         form={this.props.form} />
      </div>
    );
  }
}

const mapStateToProps= state=>({
    form:state.form
})

const mapDispatchToProps = dispatch => ({
    getForm: () => dispatch({
        type: 'GET_FORM_REQUEST',
    }),
  });

export default connect(mapStateToProps,mapDispatchToProps)(Form);



