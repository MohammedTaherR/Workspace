import React from 'react'
import CancelDialog from './CancelDialog';
import RemoveSeatDialog from './RemoveSeatDialog';
import AddSeatDialog from './AddSeatDialog';
import { Box, Flex, Table, Text, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react'

export default function DisplaySeats({ data }) {


  const cancelRef = React.useRef()

  const [itemToCancel, setItemToCancel] = React.useState("")

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)

  const [isAddSeatOpen, setIsAddSeatOpen] = React.useState(false)
  const onAddSeatClose = () => setIsAddSeatOpen(false)

  const [isRemoveSeatOpen, setIsRemoveSeatOpen] = React.useState(false)
  const onRemoveSeatClose = () => setIsRemoveSeatOpen(false)
  const BookedSeats = data?.filter((seat) => seat.isBooked);


  const tableWidths = ["sm", "md", "full"]
  const fontSizes = ["sm"];

  if (!BookedSeats || BookedSeats.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" gap="2">
        <Text as="b">No Booked Seats</Text>
        <Flex justifyContent="center" gap="2" mt="2">
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => setIsAddSeatOpen(true)}
          >
            Add new Seats
          </Button>
          <AddSeatDialog isOpen={isAddSeatOpen} onClose={onAddSeatClose} />
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => setIsRemoveSeatOpen(true)}
          >
            Remove Seats
          </Button>
          <RemoveSeatDialog isOpen={isRemoveSeatOpen} onClose={onRemoveSeatClose} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" gap="2">
      <Box display="flex" justifyContent="center" alignItems="center" height="fit-content" width="full" flexDirection="column" padding="5"  borderRadius="sm" boxShadow="sm">
        <Text as="b" fontFamily={"monospace"}>Booked Seats</Text>
        <TableContainer width={tableWidths}>
          <Table variant="simple" width={tableWidths}>
            <Thead backgroundColor="#f7f7f7">
              <Tr>
                <Th fontSize={fontSizes} fontWeight="500" color="gray.600">Seat Number</Th>
                <Th fontSize={fontSizes} fontWeight="500" color="gray.600">Emp Gmail</Th>
                <Th fontSize={fontSizes} fontWeight="500" color="gray.600">Emp Name</Th>
                <Th fontSize={fontSizes} fontWeight="500" color="gray.600">Monitor Availability</Th>
                <Th fontSize={fontSizes} fontWeight="500" color="gray.600">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {BookedSeats?.map((item) => (
                <Tr key={item._id} _hover={{ backgroundColor: '#f2f2f2' }}>
                  <Td fontSize={fontSizes} color="gray.800">{item.seatNumber}</Td>
                  <Td fontSize={fontSizes} color="gray.800">{item.empGmail || '-'}</Td>
                  <Td fontSize={fontSizes} color="gray.800">{item.empName || '-'}</Td>
                  <Td fontSize={fontSizes} color="gray.800">{item.isMonitorPresent ? 'Yes' : 'No'}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setIsOpen(true);
                        setItemToCancel(item);
                      }}
                    >
                      Cancel
                    </Button>
                    <CancelDialog isOpen={isOpen} onClose={onClose} item={itemToCancel} cancelRef={cancelRef} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-evenly" alignItems="center" gap="2" mt="4" width={"full"}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => setIsAddSeatOpen(true)}
          >
            <AddSeatDialog isOpen={isAddSeatOpen} onClose={onAddSeatClose} />
            Add new Seats
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => setIsRemoveSeatOpen(true)}
          >
            Remove Seats
          </Button>
          <RemoveSeatDialog isOpen={isRemoveSeatOpen} onClose={onRemoveSeatClose} />
        </Flex>
      </Box>
    </Flex>
  )
}

