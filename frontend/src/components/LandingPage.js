import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/landingpage.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import HomePage from './HomePage';
import UserAccount from './UserAccount';
import Team from './Team';
import Surveys from "./Surveys";
import SurveyBuilder from "./SuveryBuilder";
import ShareSurvey from "./ShareSurvey";
import TakeSurvey from "./TakeOpenSurvey";
import UniqueLinkSurvey from "./UniqueLinkSurvey";
import About from "./About";
import swal from 'sweetalert';
class LandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <header >
                    <nav style={{'background-color':'#ffffff'}} className="navbar navbar-expand-lg navbar-dark fixed-top mb-5" id="mainNav">
                        <a className="navbar-brand d-flex align-items-center pointer " onClick={() => {
                            this.props.history.push("/");
                        }}>
                            <span className="righteous purple pt-3 pl-5 " style={{'font-size':'2em'}}>Survey Ape</span>
                        </a>
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/About");
                                }}>About</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/Team");
                                }}>Team</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignIn");
                                }}>Sign in</a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignUp");
                                }}><button class="signupnav">SIGN UP</button></a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SurveyBuilder");
                                }}><button class="signupnav">CREATE A SURVEY</button></a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {console.log('User Account');
                                }}><UserAccount/></a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="pt-5 mt-5">
                    <Route exact path="/" render={() => (
                        <div>
                            <HomePage/>
                        </div>
                    )}/>
                    <Route exact path="/About" render={() => (
                        <div>

                        </div>
                    )}/>
                    <Route exact path="/signUp" render={() => (
                        <div>
                            <SignUp/>
                        </div>
                    )}/>
                    <Route exact path="/signIn" render={() => (
                        <div>
                            <SignIn/>
                        </div>
                    )}/>
                    <Route exact path="/Surveys" render={() => (
                        <div>
                            <Surveys/>
                        </div>
                    )}/>
                    <Route exact path="/SurveyBuilder" render={() => (
                        <div>
                            <SurveyBuilder/>
                        </div>
                    )}/>
                    <Route exact path="/ShareSurvey" render={() => (
                        <div>
                            <ShareSurvey/>
                        </div>
                    )}/>
                    <Route exact path='/TakeSurvey/:type/:surveyId' render={(props) => (
                        <div>
                            <TakeSurvey {...props}/>
                        </div>
                    )}/>
                    <Route exact path='/TakeSurvey/u/:surveyId' render={(props) => (
                        <div>
                            <UniqueLinkSurvey {...props}/>
                        </div>
                    )}/>
                    <Route exact path="/Team" render={() => (
                        <div>
                            <Team/>
                        </div>
                    )}/>
                    <Route exact path="/About" render={() => (
                        <div>
                            <About/>
                        </div>
                    )}/>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage);
