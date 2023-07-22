import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import idn from 'date-fns/locale/id';
import { useGlobalState } from '../state';
import 'react-datepicker/dist/react-datepicker.css';

let daysDuration,
  restCuti = 0;
registerLocale('idn', idn);

const FormCuti = ({
  cutiFunction,
  buttonMessage,
  title,
  type,
  setType,
  reason,
  setReason,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDuration,
  msg
}) => {
  const isWeekday = date => {
    const day = date.getDay();

    return day !== 0 && day !== 6;
  };
  const [cutiData] = useGlobalState('cutiData');
  const { user } = useSelector(state => state.auth);
  const [, setRestCuti] = useState();
  const [password] = useState('');
  const [confPassword] = useState('');

  function calculateDaysDuration(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, 'days');
  }

  function dateDifference(start, end) {
    var s = new Date(+start);
    var e = new Date(+end);

    s.setHours(12, 0, 0, 0);
    e.setHours(12, 0, 0, 0);

    var totalDays = Math.round((e - s) / 8.64e7);

    var wholeWeeks = (totalDays / 7) | 0;

    var days = wholeWeeks * 5;
    if (totalDays % 7) {
      s.setDate(s.getDate() + wholeWeeks * 7);

      while (s < e) {
        s.setDate(s.getDate() + 1);

        if (s.getDay() !== 0 && s.getDay() !== 6) {
          ++days;
        }
      }
    }
    return days;
  }

  function showDuration() {
    daysDuration = calculateDaysDuration(startDate, endDate);
    if (daysDuration < 0) {
      daysDuration = 0;
    } else {
      daysDuration = dateDifference(startDate, endDate) + 1;
    }

    return daysDuration <= 0 ? (
      <span style={{ color: 'red' }}>Tanggal selesai cuti tidak boleh lebih kecil dari tanggal mulai cuti</span>
    ) : restCuti - daysDuration < 0 ? (
      <span style={{ color: 'red' }}>Anda tidak boleh mengambil cuti lebih dari sisa cuti</span>
    ) : daysDuration > 21 ? (
      <span style={{ color: 'red' }}>Cuti tidak boleh diambil lebih dari 21 hari</span>
    ) : (
      <>
        <b className="is-block">Keterangan</b>
        <span>{`Anda akan cuti selama ${daysDuration} hari?`}</span>
      </>
    );
  }

  function calculateCuti() {
    restCuti = user.quota;
    cutiData.forEach(cutiOneData => {
      if (cutiOneData.user.name === user.name) {
        restCuti -= cutiOneData.duration;
      }
    });
  }
  user && calculateCuti();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${user.uuid}`);
      setRestCuti(response.data.restCuti);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async () => {
    restCuti = restCuti - daysDuration;
    setRestCuti(restCuti);
    let userId = user.uuid;
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        password,
        confPassword,
        restCuti
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="column is-6">
      <h1 className="title mt-4 is-2">{title}</h1>
      <div className="columns mt-5 cuti-input">
        <div className="column">
          <div className="col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Jumlah Sisa Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{restCuti}</span>
            </div>
          </div>
          <form onSubmit={cutiFunction}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label htmlFor="type" className="label">
                Tipe Cuti
              </label>
              <div className="select is-fullwidth">
                <select value={type} id="type" onChange={e => setType(e.target.value)} required>
                  <option value="" disabled>
                    Pilih opsi
                  </option>
                  <option value="Cuti Tahunan">Cuti Tahunan</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="reason" className="label">
                Alasan Cuti
              </label>
              <div className="control">
                <input
                  type="text"
                  id="reason"
                  className="input"
                  value={reason}
                  required
                  onChange={e => setReason(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <b>Tanggal Mulai Cuti: </b>
              <DatePicker
                selected={startDate}
                required
                locale="idn"
                dateFormat={'dd MMMM yyyy'}
                filterDate={isWeekday}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div className="field mb-4">
              <b>Tanggal Selesai Cuti: </b>
              <DatePicker
                selected={endDate}
                required
                locale="idn"
                dateFormat={'dd MMMM yyyy'}
                filterDate={isWeekday}
                onChange={date => setEndDate(date)}
              />
            </div>
            {showDuration()}
            <div className="field">
              <button
                type="submit"
                className="button is-success mt-5"
                disabled={(daysDuration <= 0 || daysDuration > 21 || restCuti - daysDuration < 0) && true}
                onClick={() => {
                  updateUser();
                  setDuration(daysDuration);
                }}
              >
                {buttonMessage}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCuti;
