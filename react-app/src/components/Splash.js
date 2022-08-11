import React from 'react';
// import SplashSignupModal from "./SplashSignupModal";
// import SplashLoginModal from './SplashLoginModal';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import DemoUser from '../auth/DemoUser/DemoUser';
import './Splash.css';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LinkedIn from '@mui/icons-material/LinkedIn';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

const Splash = () => {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <div className='SplashWholePage'>
                <div className='SplashNoFoot'>
                    <div className='SplashLeft'>
                        <img className='SplashImage' src='https://art.pixilart.com/ed23896fd2a9eb1.png' alt='standup' />
                    </div>
                    <div className='SplashRightContainer'>
                        <div className='SplashRight'>
                            <div className='SplashIconContainer'>
                            <link
                                rel="stylesheet"
                                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                                integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                                crossorigin="anonymous"
                            />
                            <i class="fas fa-paw" id="mylogo"></i>
                            </div>
                            <p className='SplashSlogan'>Critter</p>
                            <p className='SplashText'>Join Critter today.</p>
                            <div className='SplashSignupContainer'>
                                {/* <DemoUser /> */}
                                <div className='SplashBorderManipulation'>
                                    <div className='SplashBorder'></div>
                                    <p className='SplashBorderOr'>or</p>
                                    <div className='SplashBorder'></div>
                                </div>
                                <SignUpForm/>
                            </div>
                            <div className='SplashLoginContainer'>
                                <p className='SplashAccText'>Already have an account?</p>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <footer className='SplashFooter'>
                    <a className='SplashAbout' href='https://github.com/okaymoe'>Github
                    <GitHubIcon className='SplashGithub' />
                    </a>
                    <a className='SplashAbout' href='https://www.linkedin.com/in/mohamadamirhussein/'>Linkedin
                    <LinkedIn className='SplashLinkedin' />
                    </a>
                </footer> */}
            </div>
        </>
    )
}

export default Splash