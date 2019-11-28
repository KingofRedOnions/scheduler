import React from "react";

import "components/Application.scss";

import useApplicationData from 'hooks/useApplicationData';

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import { 
  getAppointmentsForDay, getInterview, getInterviewersForDay
} from '../helpers/selectors';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  console.log(state);

  const appointments = getAppointmentsForDay(state, state.day)
  .map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
            />
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}