import React from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, FormControl, FormLabel, Input, Button, AlertDialogOverlay } from '@chakra-ui/react'
import { Box, Flex, Text } from '@chakra-ui/react'

export default function  RemoveSeatDialog({isOpen, onClose}) {
    const [seatNumber, setSeatNumber] = React.useState('')
    const [isMonitorPresent, setIsMonitorPresent] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const handleRemoveSeat = () => {
        
    }
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Remove Seat
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
                placeholder="Enter a seat number to remove "
                _placeholder={{ color: 'gray.500' }}
                focusBorderColor="blue.500"
              />
            </FormControl>
            </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={handleRemoveSeat}
                        >
                            Remove
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}