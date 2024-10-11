import {GoogleLogin} from 'react-google-login';
import { Flex, Button, Box, Text, Image } from '@chakra-ui/react';
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
        <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear-gradient(90deg, #56B3FA 0%, #2E8BC0 100%)">
        <Image src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo192.png" boxSize="200px" mb={10} borderRadius="50%" boxShadow="lg" />            <Box bg="white" p={10} rounded="lg" shadow="xl" w="lg">
                <Text fontSize="3xl" fontWeight="bold" mb={5} color="gray.700" textAlign="center">
                    MulticoreWare Seat booking
                </Text>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                        <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            bg="red.500"
                            color="white"
                            _hover={{ bg: "blue.700" }}
                            w="full"
                            p={5}
                            fontSize="lg"
                        >
                            Login with Google
                        </Button>
                    )}
                />
            </Box>
        </Flex>
    );
}

export default Login
