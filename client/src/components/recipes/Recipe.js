import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup';

export class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      weighedin: 'Grams',
      temptype: 'Fahrenheit',
      title: '',
      temperature: '',
      fdt: '',
      flour: '',
      flouramount: '',
      water: '',
      salt: '',
      yeast: false,
      yeastamount: '',
      addition: '',
      additionamount: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(!this.props.auth.isAuthenticated || this.props.errors === "Unauthorized") {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const recipeData = {
      name: user.name,
      avatar: user.avatar,
      weighedin: this.state.weighedin,
      temptype: this.state.temptype,
      title: this.state.title,
      temperature: this.state.temperature,
      fdt: this.state.fdt,
      flour: this.state.flour,
      flouramount: this.state.flouramount,
      water: this.state.water,
      salt: this.state.salt,
      yeast: this.state.yeast,
      yeastamount: this.state.yeastamount,
      addition: this.state.addition,
      additionamount: this.state.additionamount,
    };

    this.props.addRecipe(recipeData);
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="recipe">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-5 font-weight-normal text-center">
                Create a new recipe
              </h1>
              <form onSubmit={this.onSubmit} key={user.id} noValidate>
                <InputFieldGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <hr />
                <div className="row">
                  <fieldset className="form-group">
                    <div className="col-md-2">
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="grams"
                          checked={this.state.weighedin === 'Grams'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label">
                          Grams
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="oz"
                          checked={this.state.weighedin === 'Ounces'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label">
                          Ounces
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="cups"
                          checked={this.state.weighedin === 'Cups'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label">
                          Cups
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="form-group">
                      <div className="col-md-2 offset-lg-8">
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="fahrenheit"
                            checked={this.state.temptype === 'Fahrenheit'}
                            onChange={this.onChange}
                          />
                          <label className="form-check-label">
                            Fahrenheit
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="celsius"
                            checked={this.state.temptype === 'Celsius'}
                            onChange={this.onChange}
                          />
                          <label className="form-check-label">
                            Celsius
                          </label>
                        </div>
                      </div>
                  </fieldset>
                </div>
                <InputFieldGroup
                  placeholder="Water Temperature"
                  name="temperature"
                  type="number"
                  value={this.state.temperature}
                  onChange={this.onChange}
                  error={errors.temperature}
                />
                <InputFieldGroup
                  placeholder="Final Dough Temperature"
                  name="fdt"
                  type="number"
                  value={this.state.fdt}
                  onChange={this.onChange}
                  error={errors.fdt}
                />
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <InputFieldGroup
                        placeholder="Flour Used"
                        name="flour"
                        value={this.state.flour}
                        onChange={this.onChange}
                        error={errors.flour}
                      />
                    </div>
                    <div className="col-sm-6">
                      <InputFieldGroup
                        placeholder="Flour Amount"
                        type="number"
                        name="flouramount"
                        value={this.state.flouramount}
                        onChange={this.onChange}
                        error={errors.flouramount}
                      />
                    </div>
                  </div>
                </div>
                <InputFieldGroup
                  placeholder="Water"
                  type="number"
                  name="water"
                  value={this.state.water}
                  onChange={this.onChange}
                  error={errors.water}
                />
                <InputFieldGroup
                  placeholder="Salt"
                  type="number"
                  name="salt"
                  value={this.state.salt}
                  onChange={this.onChange}
                  error={errors.salt}
                />
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="sourdough"
                          checked={this.state.yeast === false}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label">
                          Sourdough
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="yeast"
                          checked={this.state.yeast === true}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label">
                          Yeast
                        </label>
                      </div>
                    </div>
                    </div>
                    <div className="col-sm-6">
                      <InputFieldGroup
                        placeholder="Yeast Amount"
                        type="number"
                        name="yeastamount"
                        value={this.state.yeastamount}
                        onChange={this.onChange}
                        error={errors.yeastamount}
                      />
                    </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <InputFieldGroup
                        placeholder="Additional ingredients"
                        name="addition"
                        value={this.state.addition}
                        onChange={this.onChange}
                        error={errors.addition}
                      />
                    </div>
                    <div className="col-sm-6">
                      <InputFieldGroup
                        placeholder="Amount added"
                        type="number"
                        name="additionamount"
                        value={this.state.additionamount}
                        onChange={this.onChange}
                        error={errors.additionamount}
                      />
                    </div>
                  </div>
                </div>
                <input type="submit" className="btn btn-lg btn-primary btn-block"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Recipe.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { addRecipe })(Recipe);
