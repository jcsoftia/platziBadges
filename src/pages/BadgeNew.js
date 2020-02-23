import React from 'react';

import './styles/BadgeNew.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from "../api";
import md5 from "md5"


class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
      avatarUrl: ''
    },
  };
  
  handleSubmit = async e => {
    
    e.preventDefault()

    this.state.form.avatarUrl = `https://www.gravatar.com/avatar/${md5(this.state.form.email)}?d=identicon`

    this.setState({loading: true, error: null})
    try {
      await api.badges.create(this.state.form)
      this.setState({loading: false})

      this.props.history.push('/badges');
    } catch (error) {
      
      this.setState({loading: false, error: error})
    }
  }

  handleChange = e => {
    
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
        avatarUrl: this.avatar
      },
    });
  };

  render() {
    if (this.state.loading) {
      return <PageLoading/>
    }
    if (this.state.error) {
      return <PageError error={this.state.error}/>
    }
    return (
      <React.Fragment>
        <div className="BadgeNew__hero ">
          <img className="img-fluid BadgeNew__hero-image" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME' }
                lastName={this.state.form.lastName || 'LAST_NAME'}
                twitter={this.state.form.twitter || 'TWITTER'}
                jobTitle={this.state.form.jobTitle || 'JOB'}
                email={this.state.form.email || 'EMAIL'}
                avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
              />
            </div>

            <div className="col-6">
            <h1>New Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
