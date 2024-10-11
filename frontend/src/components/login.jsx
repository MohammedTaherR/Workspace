import {GoogleLogin} from 'react-google-login';
import { Flex, Button } from '@chakra-ui/react';
import Compartment from './Compartment';
import Booking from './Booking';
import InputBox from './InputBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplaySeats from './DisplaySeats';
import {gapi} from 'gapi-script';

const clientId = "1049231966219-acsq85p6t0ccpd8orh0cdku3lq38qcs5.apps.googleusercontent.com";

function Login({onLogin}) {
    
    const onSuccess = (res) => {
        onLogin(res);
        console.log('Login Success: currentUser:', res.profileObj);
        return true;
    };
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login