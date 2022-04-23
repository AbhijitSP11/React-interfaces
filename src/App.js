import { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import AddAppointments from "./components/AddAppointments";
import Search from "./components/Search";
import Appointmentinfo from "./components/AppointmentInfo";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");


 //This array shows the filtered list. We created this beacuse we dont want to disturb previous array
  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLowerCase()) || 
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) )
    }
  ).sort((a,b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
    ? -1 * order : 1 * order
    )
  })
  const fetchData = useCallback(()=> {
    fetch('./data.json')
    .then(response => response.json())
    .then(data=> 
      {setAppointmentList(data)
    });
  }, [])

  useEffect(() => {
    fetchData()}, [fetchData]
  )

 // We are using Js FetchApi 
 //We issue a promise method and say that our data will be retrived
 //then we are receiving the response from the server we are asking for
 //arrow function takes response from server and converts it into json 
 //then we use another promise where we will recive all data 
 //We are receiving data and asking useCallback to monitor changes that happen to that data  
 


 return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Book Your Appointments
      </h1>
      <Search  query={query} 
      onQueryChange = {myQuery => setQuery(myQuery)}

      // query will get pass along our local variable and 
      // then onQueryChange its going to receive something from event 
      // and then use the setQuery method and pass along what we receive
/>
      <AddAppointments />
      <ul className="divide-y divide-gray-200">
        {" "}
        {/* //Importing json */}
        {filteredAppointments.map((appointment) => (
          <Appointmentinfo 
          key={appointment.id} 
          appointment={appointment}
          onDeleteAppointment = {
            appointmentId => setAppointmentList(appointmentList
              .filter(appointment => appointment.id !== appointmentId)
            )} />
        ))}
      </ul>
    </div>
  );
}

export default App;
