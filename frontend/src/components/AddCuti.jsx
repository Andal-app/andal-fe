import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormCuti from './FormCuti';

const AddCuti = () => {
  const [type, setType] = useState('Cuti Tahunan');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState(0);
  const [isVerifiedAtasan] = useState(false);
  const [isVerifiedKadis] = useState(false);
  const [isVerifiedKepegawaian] = useState(false);
  const [msg] = useState('');

  const navigate = useNavigate();

  const saveCutiData = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/cutidata', {
        type,
        reason,
        startDate,
        endDate,
        duration,
        isVerifiedAtasan,
        isVerifiedKadis,
        isVerifiedKepegawaian
      });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormCuti
        cutiFunction={saveCutiData}
        buttonMessage="Ajukan cuti"
        title="Pengajuan Cuti"
        type={type}
        setType={setType}
        reason={reason}
        setReason={setReason}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setDuration={setDuration}
        msg={msg}
      />
    </>
  );
};

export default AddCuti;
