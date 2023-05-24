import React, { useState, useContext } from "react";
import { FormControl, Card, CardContent } from "@mui/material";
import MyButton from "@/components/MyButton.jsx";
import styles from "../styles/Form.module.css";
import OtherOptionsSection from "./OtherOptions";
import AvailableSpotsSection from "./AvailableSpots";
import TicketsSection from "./TicketSection";
import { formDataContext } from "@/contexts/bookingContext";

export default function MainTicket({ spotData, currentStepSetter }) {
  const [open, setOpen] = useState(false);

  //context call on the parent
  const { formData, dispatch } = useContext(formDataContext);

  const handleInfoClick = () => {
    setOpen(!open);
  };

  function reserveSpot(e) {
    e.preventDefault();
    fetch("http://localhost:8080/reserve-spot", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: formData.formData.area,
        amount: formData.formData.ticketAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);

        handleNextFormComponent();
      });
  }

  function handleNextFormComponent() {
    dispatch({ action: "NEXT" });
    dispatch({ action: "CREATE_ATTENDEE_STRUCTURE" });
    currentStepSetter(1); //change current step
  }

  return (
    <>
      <h1>Ticket details</h1>
      <div className={styles.formBackground}>
        <form className={styles.form} onSubmit={reserveSpot}>
          <FormControl variant="filled">
            <Card>
              <CardContent className={styles.formWrapper}>
                <TicketsSection />
                <AvailableSpotsSection areaData={spotData} />
                <OtherOptionsSection open={open} handleInfoClick={handleInfoClick} />
              </CardContent>
              <div className={styles.btn_container}>
                <MyButton type="submit">Go to payment</MyButton>
              </div>
            </Card>
          </FormControl>
        </form>
      </div>
    </>
  );
}
