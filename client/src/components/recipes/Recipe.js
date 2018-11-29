import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitRecipe } from '../../actions/recipeActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup';

export class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      weighedin: 'grams',
      temptype: 'fahrenheit',
      title: '',
      temperature: '',
      fdt: '',
      flour: '',
      water: '',
      salt: '',
      yeast: '',
      addition: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.submitRecipe) {
      this.props.history.push('/recipes')
    } else if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const recipeData = {
      weighedin: this.state.weighedin,
      temptype: this.state.temptype,
      title: this.state.title,
      temperature: this.state.temperature,
      fdt: this.state.fdt,
      flour: this.state.flour,
      water: this.state.water,
      salt: this.state.salt,
      yeast: this.state.yeast,
      addition: this.state.addition,
    };

    this.props.submitRecipe(recipeData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="recipe">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 font-weight-normal text-center">
                Create a new recipe
              </h1>
              <form onSubmit={this.onSubmit} noValidate>
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
                          checked={this.state.weighedin === 'grams'}
                          onChange={this.onChange}
                        />
                        <label class="form-check-label" for="grams">
                          Grams
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="oz"
                          checked={this.state.weighedin === 'oz'}
                          onChange={this.onChange}
                        />
                        <label class="form-check-label" for="oz">
                          Ounces
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          value="cups"
                          checked={this.state.weighedin === 'cups'}
                          onChange={this.onChange}
                        />
                        <label class="form-check-label" for="cups">
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
                            checked={this.state.temptype === 'fahrenheit'}
                            onChange={this.onChange}
                          />
                          <label class="form-check-label" for="fahrenheit">
                            Fahrenheit
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            value="celsius"
                            checked={this.state.temptype === 'celsius'}
                            onChange={this.onChange}
                          />
                          <label class="form-check-label" for="celsius">
                            Celsius
                          </label>
                        </div>
                      </div>
                  </fieldset>
                </div>
                <InputFieldGroup
                  placeholder="Temperature"
                  name="temperature"
                  value={this.state.temperature}
                  onChange={this.onChange}
                  error={errors.temperature}
                />
                <InputFieldGroup
                  placeholder="Final Dough Temperature"
                  name="fdt"
                  value={this.state.fdt}
                  onChange={this.onChange}
                  error={errors.fdt}
                />
                <InputFieldGroup
                  placeholder="Flour"
                  name="flour"
                  value={this.state.flour}
                  onChange={this.onChange}
                  error={errors.flour}
                />
                <InputFieldGroup
                  placeholder="Water Temperature"
                  name="water"
                  value={this.state.water}
                  onChange={this.onChange}
                  error={errors.water}
                />
                <InputFieldGroup
                  placeholder="Salt"
                  name="salt"
                  value={this.state.salt}
                  onChange={this.onChange}
                  error={errors.salt}
                />
                <InputFieldGroup
                  placeholder="Yeast"
                  name="yeast"
                  value={this.state.yeast}
                  onChange={this.onChange}
                  error={errors.yeast}
                />
                <InputFieldGroup
                  placeholder="Additional ingredients"
                  name="addition"
                  value={this.state.addition}
                  onChange={this.onChange}
                  error={errors.addition}
                />
                <InputFieldGroup type="submit" className="btn btn-lg btn-primary btn-block"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Recipe.propTypes = {
  submitRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { submitRecipe })(withRouter(Recipe));
