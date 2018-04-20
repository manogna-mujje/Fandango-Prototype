import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fandangoLogo from './fandango-logo.jpg'
import './login.css'

class Signup extends Component{

    render(){
        return(
            <div class="site-wrap signin vipsignin">
                <div>
                    <header id="registration-header" class="registration-header" role="banner">
                        <nav  class="nav-bar">
                            <div class="row">
                                <div class="large-11 large-centered columns">
                                    <ul class="inline-items">
                                        <li class="site-logo">
                                            <Link class="fandango-logo" to="/">
                                                <img src={fandangoLogo} alt="Fandango Logo" class="brand-img" />
                                            </Link>
                                        </li>
                                    </ul>
                                    <div class="registration-mode right">

                                        <span>Already have a Fandango VIP Account?</span> &nbsp;<Link to="/login" class="cta">SIGN IN</Link>


                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="sign-form">
                    <div className="sub-panel">
                        <p class="join-header">FANDANGO<span class="page-header-emphasis">VIP</span>

                            <span class="registration-caption hide-for-small-only">(And Become eligible for VIP+ Points)</span>
                            <span class="registration-caption show-for-small-only">(And Become eligible for VIP+ Points)</span>

                        </p>
                        <label for="FirstnameBox" >First Name</label>
                        <input  type="text" id="FirstnameBox" />
                        <label for="UsernameBox" >Email Address</label>
                        <input  type="text" id="UsernameBox" />
                        <label for="PasswordBox" >Password</label>
                        <input  type="password" id="PasswordBox" />
                        <small class="password-instruction">Password should be at-least 8 in length.</small>
                        <label for="ConfirmPasswordBox" >Confirm Password</label>
                        <input  type="password" id="ConfirmPasswordBox" />
                        <button class="btn-cta full-width" alternatetext="Join Now for Free">Join Now for Free</button>

                    </div>

                </div>




            </div>
        )


    }
}

export default (Signup);