import React from 'react'
import axios from 'axios';
import { Box, Flex, Table,Text, Thead, Tbody, Tr, Th, Td, TableContainer, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody } from '@chakra-ui/react'
export default function DisplaySeats({data}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
    const BookedSeats = data?.filter((seat) => seat.isBooked);
    console.log(BookedSeats)
    if (!BookedSeats || BookedSeats.length === 0) {
      return (
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" gap="2">
          <Text as="b">No Booked Seats</Text>
          <Flex justifyContent="center" gap="2" mt="2">
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                window.location.href = "/addseats";
              }}
            >
              Add new Seats
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                window.location.href = "/removeseats";
              }}
              isDisabled={true}
            >
              Remove Seats
            </Button>
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" gap="2">
        <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" flexDirection="column" gap="2" backgroundColor="#ffffff" padding="4" borderRadius="md" boxShadow="md" marginTop={"2"}>
          <Text as ="b">Booked Seats</Text>
          <TableContainer>
              <Table variant="simple" size="lg">
                  <Thead backgroundColor="#f7f7f7">
              <Tr>
                <Th fontSize="lg" fontWeight="bold" color="gray.600">Seat Number</Th>
                <Th fontSize="lg" fontWeight="bold" color="gray.600">Emp ID</Th>
                <Th fontSize="lg" fontWeight="bold" color="gray.600">Emp Name</Th>
                <Th fontSize="lg" fontWeight="bold" color="gray.600">Monitor Availability</Th>
              </Tr>
            </Thead>
            <Tbody>
              {BookedSeats?.map((item) => (
                <Tr key={item._id} _hover={{ backgroundColor: '#f2f2f2' }}>
                  <Td fontSize="md" color="gray.800">{item.seatNumber}</Td>
                  <Td fontSize="md" color="gray.800">{item.empId || '-'}</Td>
                  <Td fontSize="md" color="gray.800">{item.empName || '-'}</Td>
                  <Td fontSize="md" color="gray.800">{item.isMonitorPresent ? 'Yes' : 'No'}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      ref={cancelRef}
                      onClick={() => setIsOpen(true)}
                    >
                      Cancel
                    </Button>
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
                              onClick={() => {
                                axios.post("http://localhost:8080/api/seats/cancel", {
                                  seatNumber: item.seatNumber,
                                  empId: item.empId,
                                  empName: item.empName,
                                })
                                  .then((res) => {
                                    console.log(res.data);
                                    window.location.reload();
                                  })
                                  .catch((err) => {
                                    console.error('Error while cancelling booking ',err);
                                  });
                                onClose();
                              }}
                              ml={3}
                            >
                              Yes
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="center" gap="2" mt="4">
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => {
              window.location.href = "/addseats";
            }}
          >
            Add new Seats
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => {
              window.location.href = "/removeseats";
            }}
            isDisabled={BookedSeats.length === 0}
          >
            Remove Seats
          </Button>
        </Flex>
        </Box>
      </Flex>
    )
  }

