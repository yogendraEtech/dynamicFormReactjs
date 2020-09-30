import React, { Component } from "react";
import "../styles/FormView.scss"
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

class FormView extends Component {
  constructor() {
    super();
    this.state = {
      err: {},
      touched: {}
    };
  }

  validate = () => {
    let err = {};
    this.props.form.response.data.forEach((v, i) => {
      if (v.validations) {
        v.validations.forEach((m, j) => {
          if (m.name === "required") {
            if (!this.state[v.name]) {
              err[v.name] = m.message;
            }
          } else if (m.name === "min") {
            if (v.inputType === "number") {
              if (this.state[v.name] && this.state[v.name] < m.value) {
                err[v.name] = m.message;
              }
            } else {
              if (this.state[v.name] && this.state[v.name].length < m.value) {
                err[v.name] = m.message;
              }
            }
          } else if (m.name === "max") {
            if (v.inputType === "number") {
              if (this.state[v.name] && this.state[v.name] > m.value) {
                err[v.name] = m.message;
              }
            } else {
              if (this.state[v.name] && this.state[v.name].length > m.value) {
                err[v.name] = m.message;
              }
            }
          }
        });
      }
    });
    this.setState({ err });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // handleBlur = e => {
  //   this.validate();
  // };
  handleFocus = e => {
    let touched = this.state.touched;
    if (this.state.touched && !this.state.touched[e.target.name]) {
      touched[e.target.name] = true;
      this.setState({ touched });
    }
  };
  render() {
    return (
      <div className='form container-fluid'>
     <div className="row">
      {
        this.props.form.response ?
        <form
        className=" col-lg-6 offset-lg-3 "
        onSubmit={e => {
          e.preventDefault();
          this.validate();
          let touched = {};
          this.props.form.response.data.forEach((v, i) => {
            touched[v.name] = true;
          });
          this.setState({ touched });
          if (!Object.keys(this.state.err).length && this.state.touched.name && this.state.touched.age)  {
            const {name, age}= this.state
            fetch(this.props.form.response.data[2].api.uri, {
              method: "POST",
              body: JSON.stringify({name:name,age:age})
            });
            toast.success("Data is submitted successfully!");
          }
        }}
      >
        <h3>Form</h3>
        {this.props.form.response &&
          this.props.form.response.data.map((m, i) => (
            <div key={i} className='form-group form-group-div'>
              {m.type == "input" ? (
                <div className="input-field" >
                  <label className="col-6">{m.label}*</label>
                  <m.type
                    name={m.name}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    // onBlur={this.handleBlur}
                    type={m.inputType}
                    className="col-12 form-control"
                  />
                  <div className='error'>
                    {this.state.touched &&
                    this.state.err &&
                    this.state.touched[m.name]
                      ? this.state.err[m.name]
                      : null}
                  </div>
                </div>
              ) : m.type == "button" ? (
                <m.type className='btn btn-lg btn-danger submit-button'>{m.label}</m.type>
              ) : null}
            </div>
          ))}
      </form>
      :
      <div className="loader-div">
        <Loader type="Oval" color="#00FFFF" height="60" width="100vw" />
      </div>
      }

      </div>
      </div>
 
    );
  }
}

export default FormView;
