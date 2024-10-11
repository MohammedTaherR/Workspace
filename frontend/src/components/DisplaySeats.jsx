import React from 'react'
import CancelDialog from './CancelDialog';
import AddSeatDialog from './AddSeatDialog';
import { Box, Flex, Table,Text, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react'

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
              onClick={() => setIsOpen(true)}
            >
              Add new Seats
            </Button>
            <AddSeatDialog isOpen={isOpen} onClose={onClose} />   
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
                    <CancelDialog isOpen={isOpen} onClose={onClose} item={item} cancelRef={cancelRef} />
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
            onClick={() => setIsOpen(true)}
          >
            <AddSeatDialog isOpen={isOpen} onClose={onClose} />   
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

