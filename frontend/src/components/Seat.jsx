import { Text, Button } from '@chakra-ui/react'
import React from 'react'
import CancelDialog from './CancelDialog' 
import BookDialog from './BookDialog'

export default function Seat({ user, seat, handleClick}) {

    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

  
    const {seatNumber, isBooked, isMonitorPresent} = seat;
    return (
        // Box component that represents the seat
        <Button color={"gray.700"} h="fit-content" w="50px" display={"flex"} justifyContent={"center"} p="1" bg={isBooked && seat.empGmail === user.email ? "#C39BD3" : isBooked ? "#FFC107" : "#6CAC48"} rounded={"lg"} onClick={() => { setIsOpen(true) }} >
            {isBooked && seat.empGmail === user.email && <CancelDialog isOpen={isOpen} item = {seat} onClose={onClose} cancelRef={cancelRef}  />}
            {!isBooked &&  <BookDialog isOpen={isOpen} onClose={onClose} seat={seat} user={user} handleClick={handleClick} />}
            {/* {isBooked && seat.empGmail === user.email && <UnBookDialog isOpen={isOpen} onClose={onClose} handleClick={handleClick} />} */}
            <Text align={"center"} fontSize='md' as="b"> {seatNumber} <br></br><i style={{fontSize:"10px"}}>{isMonitorPresent ? "Monitor" : null}</i></Text>
        </Button>
    )
}
