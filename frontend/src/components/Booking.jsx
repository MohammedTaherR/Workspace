import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Seat from './Seat'
import Form from './Form'

// Compartment component that displays the seat grid and booking status.
export default function Booking({handleBooking,seatNumber }) {
    return (
        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} h="full" gap="2" backgroundColor={"#ffffff"} >
            <Form handleBooking={handleBooking} seatNumber={seatNumber}></Form>
        </Box>
    )
}
