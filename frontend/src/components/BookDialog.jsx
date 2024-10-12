import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

import React from 'react'

export default function BookDialog({ isOpen, onClose, seat, user, handleClick }) {
    const dataPayload = {
        seatNumber: seat.seatNumber,
        empGmail: user.email,
        empName: user.name,
      }


  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Booking Details
          </AlertDialogHeader>

          <AlertDialogBody>
            <FormControl mt={4}>
              <FormLabel>Name :</FormLabel>
              <Input value={user.name} isReadOnly />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email:</FormLabel>
              <Input value={user.email} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Seat Number:</FormLabel>
              <Input value={seat.seatNumber} isReadOnly />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Monitor Available:</FormLabel>
              <Input value={seat.isMonitorPresent ? "Yes" : "No"} isReadOnly />
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
            <Button colorScheme="blue" onClick={() => handleClick(dataPayload)} ml={3}>
              Book Seat
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
