import { Button, Flex, Text } from '@chakra-ui/react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "1049231966219-acsq85p6t0ccpd8orh0cdku3lq38qcs5.apps.googleusercontent.com";

function Logout({ onLogout }) {
  const onSuccess = (res) => {
    console.log('Logout Success: currentUser:');
    onLogout(res);
  };
  return (
    <Flex
      position="fixed"
      top={2}
      right={2}
      align="center"
      justify="center"
    >
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <Button
            size="sm"
            variant="outline"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            bg="blue.300"
            color="white"
          >
            Logout
          </Button>
        )}
      />
    </Flex>
  );
}

export default Logout;
