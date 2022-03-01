import { useState } from 'react';
import Cleave from 'cleave.js/react';

const AgeGate = (props) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const handleChange = ({ target }) => {
    if (target.name === 'month') {
      if (target.value.length >= 2) {
        if (target.value > 12) {
          setMonth('12');
        } else if (target.value < 1) {
          setMonth('01');
        } else {
          setMonth(target.value);
        }
        target.nextElementSibling.focus();
      } else {
        setMonth(target.value);
      }
    } else if (target.name === 'day') {
      if (target.value.length >= 2) {
        if (target.value > 31) {
          setDay('31');
        } else if (target.value < 1) {
          setDay('01');
        } else {
          setDay(target.value);
        }
        target.nextElementSibling.focus();
      } else {
        setDay(target.value);
      }
    } else if (target.name === 'year') {
      if (target.value.length >= 4) {
        const currentYear = new Date().getFullYear();
        if (target.value > currentYear) {
          setYear(currentYear);
        } else {
          setYear(target.value);
        }
        target.nextElementSibling.focus();
      } else {
        setYear(target.value);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key.match(/^[0-9]$|^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$/)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dob = new Date(year, month - 1, day);
    const today = new Date();
    const ageMilliseconds = Math.abs(today - dob);
    const ageYears = new Date(ageMilliseconds).getFullYear() - 1970;
    if (ageYears >= 21 && ageYears <= 150) {
      props.verifyAge();
    } else {
      window.location.href = 'https://responsibility.org';
    }
  };

  return (
    <div className="age-gate">
      <div className="age-gate__content">
        <h1>This is the Age Gate.</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="month"
            type="text"
            value={month}
            placeholder="MM"
            minLength={2}
            maxLength={2}
            pattern="0[1-9]|1[0-2]"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <input
            name="day"
            type="text"
            value={day}
            placeholder="DD"
            minLength={2}
            maxLength={2}
            pattern="0[1-9]|[1-2][0-9]|3[0-1]"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <input
            name="year"
            type="text"
            value={year}
            placeholder="YYYY"
            minLength={4}
            maxLength={4}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AgeGate;
