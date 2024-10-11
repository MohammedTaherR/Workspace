import { Text, Button } from '@chakra-ui/react'
import React from 'react'

// Seat component that displays a seat number and its booking status
export default function Seat({ seatNumber, isBooked, handleClick , isMonitor}) {
    return (

        // Box component that represents the seat
        // bg/Background color based on booking status
        <Button color={"gray.700"} h="fit-content" w="50px" display={"flex"} justifyContent={"center"} p="1" bg={isBooked ? "#FFC107" : "#6CAC48"} rounded={"lg"} onClick={() => { handleClick(seatNumber) }} >
            {/* seat number */}
            <Text align={"center"} fontSize='md' as="b"> {seatNumber} <br></br><i style={{fontSize:"10px"}}>{isMonitor ? "Monitor" : null}</i></Text>
        </Button>
    )
}
