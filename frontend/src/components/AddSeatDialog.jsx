import React from 'react'

import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, FormControl,Text,  FormLabel, Input } from '@chakra-ui/react'

import axios from 'axios'

export default function AddSeatDialog({isOpen, onClose}) {
  const [seatNumber, setSeatNumber] = React.useState('')
  const [isMonitorPresent, setIsMonitorPresent] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const handleAddSeat = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/seats/add', {
        seatNumber: seatNumber,
        isMonitorPresent: isMonitorPresent
      })
      console.log(response.data)
      window.location.reload()
    } catch (error) {
      console.error(error)    
    }
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Add Seat
          </AlertDialogHeader>
          <AlertDialogBody>
            <FormControl isInvalid={isError}>
              <FormLabel>
                <Text fontSize="md" fontWeight="semibold">
                  Seat Number
                </Text>
              </FormLabel>
              <Input
                type="number"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="Enter a unique seat number"
                _placeholder={{ color: 'gray.500' }}
                focusBorderColor="blue.500"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>
                <Text fontSize="md" fontWeight="semibold">
                  Monitor Present
                </Text>
              </FormLabel>
              <select
                value={isMonitorPresent}
                onChange={(e) => setIsMonitorPresent(e.target.value === 'true')}
                style={{ width: '100%', height: '40px' }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </FormControl>
            {isError && (
              <Text mt={4} color="red.500" fontSize="md">
                Error adding seat
              </Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddSeat} ml={3}>
              Add Seat
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export { AddSeatDialog }