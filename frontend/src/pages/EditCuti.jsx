import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';

import Layout from './Layout';
import FormCuti from '../components/FormCuti';

const EditCuti = () => {
  const [type, setType] = useState('Cuti Tahunan');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState(0);
  const [msg, setMsg] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);
  useEffect(() => {
    const getCutiById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cutidata/${id}`);
        setType(response.data.type);
        setReason(response.data.reason);
        setStartDate(Date.parse(response.data.startDate));
        setEndDate(Date.parse(response.data.endDate));
        setDuration(response.data.duration);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCutiById();
  }, [id]);

  const updateCutiData = async e => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/cutidata/${id}`, {
        type: type,
        reason: reason,
        startDate: startDate,
        endDate: endDate,
        duration: duration
      });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <FormCuti
        cutiFunction={updateCutiData}
        buttonMessage="Simpan Cuti"
        title="Edit Cuti"
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
    </Layout>
  );
};

export default EditCuti;
