import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { flightData } from "./data";
import dayjs from "dayjs";

function App() {
  let [returnDates, setReturnDates] = useState([]);

  useEffect(() => {
    let reDates = [];
    let minReturnDate = flightData[0].returnFlights[0].returnFlightDate;
    let maxReturnDate = flightData[0].returnFlights[0].returnFlightDate;

    flightData.forEach((flight) => {
      flight.returnFlights.forEach((item) => {
        if (item.returnFlightDate < minReturnDate)
          minReturnDate = item.returnFlightDate;
        if (item.returnFlightDate > maxReturnDate)
          maxReturnDate = item.returnFlightDate;
      });
    });

    reDates[0] = minReturnDate;

    while (!reDates.includes(maxReturnDate)) {
      reDates.push(
        dayjs(reDates[reDates.length - 1])
          .add(+1, "days")
          .format("YYYY-MM-DD")
      );
    }

    setReturnDates(reDates);
  }, []);

  const hoverGenerator = (indexRow, indexCol) => {
    console.log(indexRow, indexCol, "enter");

    const tdcol = document.querySelectorAll(
      `table tr td:nth-child(${indexCol + 2})`
    );
    const tdrow = document.querySelectorAll(
      `table tr:nth-child(${indexRow + 2}) td`
    );
    const tds = document.querySelectorAll(
      " table tr:not(:first-child) td:not(:first-child)"
    );
    const cell = document.querySelectorAll(
      `table tr:nth-child(${indexRow + 2}) td:nth-child(${indexCol + 2})`
    );
    cell[0].classList.add("hover-cell");

    for (let i = 0; i < tds.length; i++) {
      tds[i].style.backgroundColor = "white";
    }

    [...tdcol].forEach((td, row) => {
      if (row <= indexRow + 1) td.classList.add("hover-style");
    });

    [...tdrow].forEach((td, col) => {
      if (col <= indexCol + 1) td.classList.add("hover-style");
    });
  };

  const removeHover = () => {
    const tds = document.querySelectorAll("table tr td");
    for (let i = 0; i < tds.length; i++) {
      tds[i].classList.remove("hover-style");
      tds[i].classList.remove("hover-cell");
    }
  };

  const TdData = (item, index) => {
    return returnDates.map((it, i) => {
      const findPriceItem = item.returnFlights.find(
        (m, n) => m.returnFlightDate === it
      );
      return (
        <td
          key={i}
          onMouseOver={() => hoverGenerator(index, i)}
          onMouseLeave={() => removeHover()}
        >
          {findPriceItem ? findPriceItem.price : "-"}
        </td>
      );
    });
  };

  const mobileDay = (day) => {
    switch (day) {
      case "Saturday":
        return "Sat";
      case "Sunday":
        return "Sun";
      case "Monday":
        return "Mon";
      case "Tuesday":
        return "Tue";
      case "Wednesday":
        return "Wed";
      case "Thursday":
        return "Thur";
      case "Friday":
        return "Fri";
      default:
        return "Saturday";
    }
  };

  const mobileMonth = (Month) => {
    switch (Month) {
      case "January":
        return "Jan.";
      case "February":
        return "Feb.";
      case "March":
        return "Mar.";
      case "April":
        return "Apr.";
      case "May":
        return "May";
      case "June":
        return "Jun.";
      case "July":
        return "Jul.";
      case "August":
        return "Aug.";
      case "September":
        return "Sep.";
      case "October":
        return "Oct.";
      case "November":
        return "Nov.";
      case "December":
        return "Dec.";
      default:
        return "Saturday";
    }
  };

  const mobileDate = (date) => {
    const dateArr = date.split(" ");
    return `${mobileDay(dateArr[0])} ${dateArr[1]} ${mobileMonth(dateArr[2])}`;
  };

  const horizontalHeader = returnDates.map((item, index) => (
    <td c key={index}>
      <span className="isMobile">
        {mobileDate(dayjs(item).format("dddd DD MMMM"))}
      </span>
      <span className="isDesc" key={index}>
        {dayjs(item).format("dddd DD MMMM")}
      </span>
    </td>
  ));
  const Tds = flightData.map((item, index) => (
    <tr key={index}>
      <td>
        <span className="isMobile">
          {mobileDate(dayjs(item.flightDate).format("dddd DD MMMM"))}
        </span>
        <span className="isDesc">
          {dayjs(item.flightDate).format("dddd DD MMMM")}
        </span>
      </td>
      {TdData(item, index)}
    </tr>
  ));

  return (
    <div className="App">
      <table>
        <tr>
          <td className="horizontal-title">
            <div className="vertical-title"></div>
          </td>
          {horizontalHeader}
        </tr>
        {Tds}
      </table>
    </div>
  );
}

export default App;
