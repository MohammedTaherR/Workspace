import logo from './logo.svg';
import './App.css';
import { Flex } from '@chakra-ui/react';
import Compartment from './components/Compartment';
import Booking from './components/Booking';
import InputBox from './components/InputBox';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  // State variables
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [seatNumber, setSeatNumber] = useState(0);


  // Fetch seat data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch seat data from the server
  const fetchData = async () => {

    setLoading(false);

    try {
      const response = await axios.get("http://localhost:8080/api/seats");
      setLoading(true);
      setData(response.data.availableSeats);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(true);
    }
  };
  const handleClick = (seatNumber) => {
    console.log(seatNumber);
    setSeatNumber(seatNumber);
    setBooking(true);
  }

  function getNextMonday() {
    const today = new Date();
    const daysUntilMonday = (8 - today.getDay()) % 7;
    const nextMonday = new Date(today.setDate(today.getDate() + daysUntilMonday));
    return nextMonday;
  }

  function getNextFriday() {
    const today = new Date();
    const daysUntilFriday = (5 - today.getDay() + 7) % 7;
    const nextFriday = new Date(today.setDate(today.getDate() + daysUntilFriday));
    return nextFriday;
  }

  const handleBooking = (data) => {
    console.log('booking ....');
    console.log(data);
    /*
      {
        seatNumber, 
        EID,
        Ename,
        date from and date to,
      }
    */
    // TODO: clean up code and modify synatx with await 
    let datefrom = getNextMonday();
    let dateTo = getNextFriday();
    // compute the nearest upcomming monday from today, for datefrom and nearest upcomming friday for dateto
    let payload = {
      ...data,
      dateFrom: datefrom,
      dateTo: dateTo
    }
    console.log('final data to send to server', payload);
    // send the data to the server
    axios.post("http://localhost:8080/api/seats/book", payload)
      .then((res) => {
        console.log(res.data);
        if(!res.data.ok){
          alert(`booking failed ${res.data.message}`);
        }
        fetchData();
        setBooking(false);
      })
      .catch((err) => {
        console.log('error while booking ',err);
        setBooking(false);
      });    
  }
  return (
    <Flex justify={"space-around"} align={"center"} h="100vh" minHeight={"fit-content"} bg={"#E5E7EB"} >

      {/* Compartment component to display seat grid */}
      {
        !booking ? <Compartment data={data} loading={loading} handleClick={handleClick} /> : <Booking seatNumber={seatNumber} handleBooking={handleBooking}></Booking>
      }
    </Flex>
  );
}

export default App;
