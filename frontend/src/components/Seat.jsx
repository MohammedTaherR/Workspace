import { Text, Button } from '@chakra-ui/react'
import React from 'react'

// Seat component that displays a seat number and its booking status
export default function Seat({ seat, handleClick}) {
    const {seatNumber, isBooked, isMonitorPresent} = seat;
    // TODO: modify seat color based on current booking status
    return (
        // Box component that represents the seat
        // bg/Background color based on booking status
        <Button color={"gray.700"} h="fit-content" w="50px" display={"flex"} justifyContent={"center"} p="1" bg={isBooked ? "#FFC107" : "#6CAC48"} rounded={"lg"} onClick={() => { handleClick(seat) }} >
            {/* seat number */}
            <Text align={"center"} fontSize='md' as="b"> {seatNumber} <br></br><i style={{fontSize:"10px"}}>{isMonitorPresent ? "Monitor" : null}</i></Text>
        </Button>
    )
}
