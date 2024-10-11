import {GoogleLogin, GoogleLogout} from 'react-google-login';

const clientId = "1049231966219-acsq85p6t0ccpd8orh0cdku3lq38qcs5.apps.googleusercontent.com";

function Logout({onLogout}) {
    const onSuccess = (res) => {
        console.log('Logout Success: currentUser:');
        onLogout(res); 
    };
    return (
        <div>
            <GoogleLogout
            clientId={clientId}
            buttonText={'Logout'}
            onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;