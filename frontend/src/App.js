import './App.css';
import { Flex } from '@chakra-ui/react';
import Compartment from './components/Compartment';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });


  // Fetch seat data on component mount
  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  const checkLoginStatus = () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
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
  const storeToLocalStorage = (key, value) => {
    if (!key || !value) return;
    try {
      // TODO: add a expiration time for stored kvs
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Unable to store ${key} in local storage : ${e}`);
    }
  }

  const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Unable to remove ${key} from local storage : ${e}`);
    }
  }

  const checkIsAdmin = async (email) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/admin`, {
        email: email
      });
      return response.data.isAdmin;
    } catch (error) {
      console.error('Error checking if user is admin:', error);
      return false;
    }
  }

  const handleLogin = async (response) => {
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    if (!email || email == '' && !name || name == '') {
      console.error('Failure in resolution of user email');
      setIsLoggedIn(false);
      return;
    }
    const isAdmin = await checkIsAdmin(email);
    const user = {
      name: name,
      email: email,
      isAdmin: isAdmin
    };
    storeToLocalStorage('user', user);
    setIsLoggedIn(true);
    setUser(user);

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

  const checkBookingStatus = (seat) => {
    const { seatNumber } = seat;
    if (!data) {
      return;
    }
    if (seat && seat.isBooked) {
      if (seat.empGmail !== user.email) {
        return;
      }
      const cancelConfirmation = window.confirm('Are you sure you want to unbook this seat?');
      if (cancelConfirmation === true) {
        handleCancel(seatNumber);
      }
    } else {
      const dataPayload = {
        seatNumber,
        empGmail: user.email,
        empName: user.name,
      }
      setBooking(true);
      handleBooking(dataPayload);
    }
  }

  const handleCancel = (seatNumber) => {
    const payload = {
      seatNumber: seatNumber
    }
    // TODO: handle if not all params are available and make the repective api call
    axios.post("http://localhost:8080/api/seats/cancel", payload)
      .then((res) => {
        if (!res.data.ok) {
          alert(`booking failed ${res.data.message}`);
        }
        fetchData();
      })
      .catch((err) => {
        console.log('error while booking ', err);
      });
  }

  const handleClick = (seat) => {
    checkBookingStatus(seat);
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
    /*
      {
        seatNumber, 
        user gmail, 
        user name,
        date from,
        date to,
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
    // send the data to the server
    axios.post("http://localhost:8080/api/seats/book", payload)
      .then((res) => {
        if (!res.data.ok) {
          alert(`booking failed ${res.data.message}`);
        }
        setBooking(false);
        fetchData();
      })
      .catch((err) => {
        console.log('error while booking ', err);
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
            <Flex justify={"space-around"} align={"center"} h="100vh" minHeight={"fit-content"} bg={"#E5E7EB"} flexDirection={"column"}>
              {/* Compartment component to display seat grid */}
              {/* TODO: add loaders with booking state*/}
              {user.isAdmin ?  <DisplaySeats data={data} /> : null}
              <Compartment data={data} loading={loading} handleClick={handleClick} />
            </Flex>
          </div>)
      }
    </>
  );
}

export default App;
