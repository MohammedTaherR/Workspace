import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'

const CancelDialog = ({ isOpen, onClose, item, cancelRef }) => {
  const handleCancel = () => {
    axios
      .post('http://localhost:8080/api/seats/cancel', {
        seatNumber: item.seatNumber
      })
      .then((res) => {
        console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.error('Error while cancelling booking ', err)
      })
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cancel Booking
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to cancel booking for seat number {item.seatNumber}?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>

            <Button
              colorScheme="red"
              onClick={handleCancel}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default CancelDialog
