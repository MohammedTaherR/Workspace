// import { useForm } from ''
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function HookForm({handleBooking,seatNumber}) {
    const [data,setData]=useState({
        empId:'',
        empName:'',
        seatNumber:seatNumber,
    });

    function onSubmit(e) {
        e.preventDefault();
        if(data.empId === '' || data.empName === ''){
            return;
        }
        handleBooking(data);
    }

    return (
      <Box
        w="lg"
        p={4}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        margin="auto"
      >
        <Heading as="h2" size="lg" mb={4}>
          Employee Details
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={data.empId === ''}>
            <FormLabel htmlFor="name">Employee ID</FormLabel>
            <Input
              id="emp_id"
              placeholder="Employee ID"
              value={data.empId}
              onChange={(e) => setData({ ...data, empId: e.target.value })}
            />
            {!data.empId ? (
              <FormErrorMessage>Employee ID is required.</FormErrorMessage>
            ) : null}
          </FormControl>
  
          <FormControl isInvalid={data.empName === ''}>
            <FormLabel htmlFor="name">Employee Name</FormLabel>
            <Input
              id="emp_name"
              placeholder="Employee Name"
              value={data.empName}
              onChange={(e) => setData({ ...data, empName: e.target.value })}
            />
            {!data.empName ? (
              <FormErrorMessage>Employee Name is required.</FormErrorMessage>
            ) : null}
          </FormControl>
  
          <Button mt={4} colorScheme="teal" type="submit" disabled={data.empId === '' || data.empName === ''}>
            Submit
          </Button>
        </form>
      </Box>  
  )
}