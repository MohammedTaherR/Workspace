import { Text, Button } from '@chakra-ui/react'
import React from 'react'
import monitorIcon from '../assets/monitor.png'
// Seat component that displays a seat number and its booking status
export default function Seat({ seat, handleClick }) {
    const { seatNumber, isBooked, isMonitorPresent } = seat;
    // TODO: modify seat color based on current booking status
    return (
        // Box component that represents the seat
        // bg/Background color based on booking status
        // TODO: improve UI this sucks!!
        /**
         * Ideas for improvement :
         * 1. newer fonts, color schema
         * 2. stack monitor icon and seat number
         * 3. add functionality to highlight currently booked seat vs available seat and seat blocked by others
         * 4. 
         */
        <Button color={"gray.900"} 
            h="50px" 
            w="50px" 
            display={"flex"} 
            justifyContent={"center"} 
            p="2.5" 
            rounded={"lg"} 
            onClick={() => { handleClick(seat) }} 
            // backgroundAttachment={isMonitorPresent ? monitorIcon : "none"}
            bg={isBooked ? "#FFC107" : "#6CAC48"} 
            >
            {/* seat number */}
            <Text align={"center"} fontSize='md' as="b">
                {/* monitor icon */}
                {isMonitorPresent?<img src={monitorIcon} alt="" width={"20px"} /> : null}
                {seatNumber}
            </Text>
        </Button>
    )
}
