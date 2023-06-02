import React from 'react';
import { Redirect } from 'react-router-dom';
import fetcher from './api/fetcher';
import { setUser, getUser } from './api/auth';
import { validateLoginCustomerAndAdmin } from './shared/validation';
import './assets/style.css'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSignUp: false,
      isReset: false,
      customerRole: false,
      adminCompanyRole: false,
      userCompanyRole: false,
      statusCookie: true,
      role: '',
      msg: '',
      dataLogIn: {
        email: '',
        password: ''
      },
      formState: {},
      formMessages: {},
      validityState: {},
      roleLoginCustomers: {},

    }
  }

  onChangeHandler = event => {
    this.setState({ msg: '' });
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const savedData = { ...this.state.dataLogIn, [target.name]: value };
    this.setState({ dataLogIn: savedData });

  }

  onBlur = (fieldName, value) => {
    const nextState = { ...this.state.formState, [fieldName]: value };
    this.setState({ formState: nextState });

    validateLoginCustomerAndAdmin(nextState, fieldName)
      .done(this.handleValidationResult);
  }

  handleValidationResult = (result) => {
    const msgs = { ...this.state.formMessages };
    const validity = { ...this.state.validityState };
    result.tested.forEach((fieldName) => {


      if (result.hasErrors(fieldName)) {

        msgs[fieldName] = result.getErrors(fieldName)[0];
        validity[fieldName] = 'form-control is-invalid btn-round';

      } else if (result.hasWarnings(fieldName)) {
        msgs[fieldName] = result.getWarnings(fieldName)[0];
        validity[fieldName] = 'warning';
      } else {
        delete msgs[fieldName];
        validity[fieldName] = 'form-control is-valid btn-round';
      }
    });
    this.setState({ formMessages: msgs, validityState: validity });

  }

  onClickReset = () => {
    this.props.history.push('/reset');
    // this.setState({ isReset: true });
  }

  onClickSignUp = () => {
    // this.setState({ isSignUp: true });
    this.props.history.push('/signup')
  }

  onClickLogin = async () => {

    try {
      if (!validateLoginCustomerAndAdmin(this.state.formState).done(this.handleValidationResult).hasErrors()) {

        var { data } = await fetcher.post('/login/customers', this.state.dataLogIn)
        if (typeof (data) === 'string') {
          this.setState({
            msg: data,
            validityState: {
              email: 'form-control btn-round is-invalid',
              password: 'form-control btn-round is-invalid',
            }
          });
          return;
        } else {
          setUser(data);
          this.setState({ role: data.role.name })
        }
        if (data.role.name === 'customer') {
          this.props.history.push('/customer')
          // this.setState({ customerRole: true });
        } else if (data.role.name === 'adminCompany') {
          // this.setState({ adminCompanyRole: true });
          // this.props.history.replace('/company')
          this.props.history.push('/company')
          // this.props.history.length=0;

        } else if (data.role.name === 'userCompany') {
          // this.setState({ userCompanyRole: true });
          this.props.history.push('/company')

        }

      }

    } catch (error) {
      if (error instanceof TypeError) {
        this.setState({ msg: data })
      } else if (error instanceof Error) {
        this.setState({ msg: data })
      }

    }
  }


  componentDidMount = async () => {
    if (getUser()) {
      var loginValidateCustomers = JSON.parse(getUser());
      await this.setState({ roleLoginCustomers: loginValidateCustomers })
      switch (this.state.roleLoginCustomers.role.name) {
        case 'adminCompany':
          this.props.history.push('/company');
          break;
        case 'userCompany':
          this.props.history.push('/company')
          break;
        case 'customer':
          this.props.history.push('/customer')
          break;
        default:
          break;
      }
    }
  }
  handleKeyDown = (e, fieldName, value) => {
    const nextState = { ...this.state.formState, [fieldName]: value };
    this.setState({ formState: nextState });

    validateLoginCustomerAndAdmin(nextState, fieldName)
      .done(this.handleValidationResult);
    if (e.key === 'Enter') {
      this.onClickLogin();
    }
  }

  render() {
    // if (getUser()) return <Redirect to="/" />

    if (this.state.role !== '') {

      // return Homepages(this.state.role);
    }

    return (
      <div className="Login">
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <div className="form-group d-flex justify-content-center mt-4">
                      <img src={'./logoFinal/blackImageLogo.png'} alt="logo" width="300px"></img>
                    </div>
                    <div className="mb-3">
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            id="emailInput" type="email" className={this.state.validityState.email || "form-control"} placeholder="דואר אלקטרוני" name="email" value={this.state.dataLogIn.email} onChange={this.onChangeHandler} onBlur={() => this.onBlur('email', this.state.dataLogIn.email)}
                          />
                          <label className="float-right text-danger">{this.state.formMessages.email}</label>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Control

                            id="passwordInput" type="password" className={this.state.validityState.password || "form-control"} name="password" placeholder="סיסמה" onChange={this.onChangeHandler} onBlur={() => this.onBlur('password', this.state.dataLogIn.password)}
                          />
                           <Form.Group>
                          <div>
                          <label className="float-right text-danger">{this.state.formMessages.password}</label>
                          </div>

                           </Form.Group>
                      
                        </Form.Group>
                       <div>
                        
                     

                        </div>
                        <div className="d-grid">
                          <Button
                            type="button" id="loginButton" className="btn-dark btn-block" onClick={this.onClickLogin}
                          >
                            כניסה
                          </Button>
                          <Button
                            type="button" id="loginButton" className="btn-dark btn-block" onClick={this.onClickSignUp}
                          >
                            הרשמה
                          </Button>
                          <Form.Group className='d-flex justify-content-righ mt-3'>
                          {/* <div className="text-right d-flex justify-content-right"> */}
                            <a className="text-primary" href="/reset">
                              שכחת סיסמה?
                            </a>
                          {/* </div> */}
                        </Form.Group>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.state.isReset && <Redirect to="/reset" />}
        {this.state.isSignUp && <Redirect to="/signup" />}
      </div>

    )
  }
}
