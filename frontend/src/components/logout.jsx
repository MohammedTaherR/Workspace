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
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear-gradient(90deg, #56B3FA 0%, #2E8BC0 100%)"
    >
      <Text fontSize="4xl" fontWeight="bold" color="white" mb={4}>
        Dashboard
      </Text>

      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <Button
            variant="solid"
            size="lg"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            colorScheme="blue"
          >
            Logout with Google
          </Button>
        )}
      />
    </Flex>
  );
}

export default Logout;
