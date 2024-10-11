import './App.css';
import { Flex } from '@chakra-ui/react';
import Compartment from './components/Compartment';
import Booking from './components/Booking';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplaySeats from './components/DisplaySeats';
import { gapi } from 'gapi-script';
import Login from './components/login';
import Logout from './components/logout';

const clientId = "1049231966219-acsq85p6t0ccpd8orh0cdku3lq38qcs5.apps.googleusercontent.com";

function App() {

  // State variables
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [seatNumber, setSeatNumber] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');


  // Fetch seat data on component mount
  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  const checkLoginStatus = () => {
    try {
      const userEmail = localStorage.getItem('email');
      if (userEmail) {
        setIsLoggedIn(true);
        return;
      }
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: clientId,
          scope: ''
        })
      });
    } catch (e) {
      console.error(`Error while loading gapi : ${e}`);
    }

  }
  const storeToLocalStorage = (email) => {
    if (email.trim().length === 0) {
      return;
    }
    try {
      localStorage.setItem('email', email);
    } catch (e) {
      console.error(`Unable to store email in local storage : ${e}`);
    }
  }

  const removeFromLocalStorage = () => {
    try {
      localStorage.removeItem('email');
    } catch (e) {
      console.error(`Unable to remove email from local storage : ${e}`);
    }
  }

  const handleLogin = (response) => {
    const email = response.profileObj.email;
    if(!email || email == ''){
      console.error('Failure in resolution of user email');
      setIsLoggedIn(false);
      return;
    }
    storeToLocalStorage(email);
    setIsLoggedIn(true);
    setUserEmail(email);

  }

  const handleLogout = (failed) => {
    removeFromLocalStorage();
    setIsLoggedIn(failed);
  }
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

  const checkBookingStatus = (seatNumber) => {
    if(!data){
      return;
    }
    const seat = data.find(seat => seat.seatNumber == seatNumber);
    console.log('seat : ',seat);
    if(seat && seat.isBooked){
      console.log(`user email : ${seat.empGmail} == ${userEmail}`);
      if(seat.empGmail !== userEmail){
        return;
      }
      if(seat.empGmail === userEmail){
        const cancelConfirmation = window.confirm('Are you sure you want to unbook this seat?');
        if(cancelConfirmation === true){
          handleCancel(seatNumber);
        }
      }
    }else{
      console.log('booking seatNumber : ',seatNumber);
      setSeatNumber(seatNumber);
      setBooking(true);
    }
  }

  const handleCancel = (seatNumber) => {
    console.log('cancel seatNumber : ',seatNumber);
    // TODO: handle if not all params are available and make the repective api call
  }

  const handleClick = (seatNumber) => {
    checkBookingStatus(seatNumber);
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
        if (!res.data.ok) {
          alert(`booking failed ${res.data.message}`);
        }
        fetchData();
        setBooking(false);
      })
      .catch((err) => {
        console.log('error while booking ', err);
        setBooking(false);
      });
  }
  return (
    <>
      {
        !isLoggedIn ?
          (
            <Login onLogin={handleLogin} />
          )
          :
          (<div>
            <Logout onLogout={handleLogout} />
            {/* create a state to handle admin user and normal user, move the below portions to a ternary operator for better readability */}
            <Flex justify={"space-around"} align={"center"} h="100vh" minHeight={"fit-content"} bg={"#E5E7EB"} >
              {/* Compartment component to display seat grid */}
              {
                new URLSearchParams(window.location.search).get('admin') === 'true' ? <DisplaySeats data={data} /> :
                  !booking ? <Compartment data={data} loading={loading} handleClick={handleClick} /> : <Booking seatNumber={seatNumber} handleBooking={handleBooking}></Booking>
              }
            </Flex>
          </div>)
      }
    </>
  );
}

export default App;
