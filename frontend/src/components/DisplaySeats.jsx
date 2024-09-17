import React from 'react'

import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import Seat from './Seat'
export default function DisplaySeats({data}) {
    const BookedSeats = data?.filter((seat) => seat.isBooked);
    console.log(BookedSeats)
    return (
        <Box display="flex" justifyContent="center" flexDirection="column" h="full" gap="2" backgroundColor="#ffffff">
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Seat Number</Th>
                            <Th>emp Id </Th>
                            <Th>emp Name</Th>
                            <Th>Availability of Monitor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {BookedSeats?.map((item) => (
                            <Tr key={item._id}>
                                <Td>{item.seatNumber}</Td>
                                <Td>{item.empId || '-'}</Td>
                                <Td>{item.empName || '-'}</Td>
                                <Td>{item.isMonitorPresent ? 'Yes' : 'No'}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
