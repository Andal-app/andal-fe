import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import moment from 'moment';
import Modal from '../components/Modal';
import Timeline from '../components/Timeline';
import Layout from './Layout';
import { useGlobalState } from '../state';

let restCuti, usedCuti, statusMessage, i;

const VerifyCutiDashboard = () => {
  const [cutiData, setCutiData] = useState([]);
  const [, setMsg] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector(state => state.auth);
  const [isVerifiedAtasan, setIsVerifiedAtasan] = useGlobalState('isVerifiedAtasan');
  const [isVerifiedKadis, setIsVerifiedKadis] = useGlobalState('isVerifiedKadis');
  const [isVerifiedKepegawaian, setIsVerifiedKepegawaian] = useGlobalState('isVerifiedKepegawaian');
  const [showVerifModal, setShowVerifModal] = useGlobalState('showVerifModal');
  const [showTimelineModal, setShowTimelineModal] = useGlobalState('showTimelineModal');
  const [atasanVerificationDate, setAtasanVerificationDate] = useState();
  const [kadisVerificationDate, setKadisVerificationDate] = useState();
  const [kepegawaianVerificationDate, setKepegawaianVerificationDate] = useState();

  const getCutiData = async () => {
    const response = await axios.get('http://localhost:5000/cutidata');
    setCutiData(response.data);
  };

  useEffect(() => {
    getCutiData();
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  const getCutiById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cutidata/${id}`);
      setIsVerifiedAtasan(response.data.isVerifiedAtasan);
      setIsVerifiedKadis(response.data.isVerifiedKadis);
      setIsVerifiedKepegawaian(response.data.isVerifiedKepegawaian);
      setAtasanVerificationDate(response.data.atasanVerificationDate);
      setKadisVerificationDate(response.data.kadisVerificationDate);
      setKepegawaianVerificationDate(response.data.kepegawaianVerificationDate);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getCutiById();
  }, [id]);

  const updateCutiData = async e => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/cutidata/${id}`, {
        isVerifiedAtasan,
        isVerifiedKadis,
        isVerifiedKepegawaian,
        atasanVerificationDate,
        kadisVerificationDate,
        kepegawaianVerificationDate
      });
      setShowVerifModal(false);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  function calculateCuti() {
    restCuti = user.quota;
    usedCuti = 0;
    cutiData.forEach(cutiOneData => {
      if (cutiOneData.user.name === user.name) {
        usedCuti += cutiOneData.duration;
        restCuti -= cutiOneData.duration;
      }
    });
  }

  function activateFunction(cutiOneData) {
    if (user.role === 'Atasan') {
      setIsVerifiedAtasan(true);
      setAtasanVerificationDate(cutiOneData.updatedAt);
    } else if (user.role === 'Kepala Dinas') {
      setIsVerifiedKadis(true);
      setKadisVerificationDate(cutiOneData.updatedAt);
    } else {
      setIsVerifiedKepegawaian(true);
      setKepegawaianVerificationDate(cutiOneData.updatedAt);
    }
  }

  function isShowButton() {
    return statusMessage === 'Diajukan' && user.role === 'Atasan'
      ? true
      : statusMessage === 'Disetujui Atasan' && user.role === 'Kepala Dinas'
      ? true
      : statusMessage === 'Disetujui Kepala Dinas' && user.role === 'Kepegawaian'
      ? true
      : false;
  }

  i = cutiData.length;

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Beranda</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Jatah Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">12</span>
            </div>
          </div>
          {user && calculateCuti()}
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Jumlah Cuti Terpakai</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{usedCuti}</span>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Jumlah Sisa Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{restCuti}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 is-centered">
          <div className="table-container">
            <Link to="/pengajuan_cuti" className="button is-success">
              Tambah Cuti
            </Link>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th className="is-dark">No</th>
                  <th className="is-dark">Nama</th>
                  <th className="is-dark">Tipe</th>
                  <th className="is-dark">Alasan</th>
                  <th className="is-dark">Tanggal Mulai</th>
                  <th className="is-dark">Tanggal Selesai</th>
                  <th className="is-dark">Durasi</th>
                  <th className="is-dark">Status</th>
                  <th className="is-dark">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cutiData
                  .map((cutiOneData, index) => (
                    <tr key={cutiOneData.uuid}>
                      <td>{i - index}</td>
                      <td>{cutiOneData.user.name}</td>
                      <td>{cutiOneData.type}</td>
                      <td>{cutiOneData.reason}</td>
                      <td>{moment(cutiOneData.startDate).format('DD MMMM YYYY')}</td>
                      <td>{moment(cutiOneData.endDate).format('DD MMMM YYYY')}</td>
                      <td>{cutiOneData.duration} hari</td>
                      <td>
                        {cutiOneData.isVerifiedKepegawaian === true
                          ? (statusMessage = 'Cuti disahkan')
                          : cutiOneData.isVerifiedKadis === true
                          ? (statusMessage = 'Disetujui Kepala Dinas')
                          : cutiOneData.isVerifiedAtasan === true
                          ? (statusMessage = 'Disetujui Atasan')
                          : (statusMessage = 'Diajukan')}
                      </td>
                      <td>
                        {user && user.role !== 'Pegawai' && (
                          <>
                            {isShowButton() && (
                              <button
                                onClick={() => {
                                  setShowVerifModal({ id: cutiOneData.uuid, show: true });
                                }}
                                className="button is-small is-success"
                              >
                                Verifikasi
                              </button>
                            )}
                            <Modal
                              id={cutiOneData.uuid}
                              show={showVerifModal}
                              buttonShow={true}
                              onClose={() => {
                                setShowVerifModal(false);
                                navigate('/dashboard');
                              }}
                              title="Verifikasi Cuti"
                              buttonMessage="Verifikasi"
                              buttonColor="is-success"
                              updateCutiData={updateCutiData}
                              activateFunction={() => activateFunction(cutiOneData)}
                            >
                              Apakah Anda yakin melakukan verifikasi pada cuti ini?
                            </Modal>
                          </>
                        )}
                        {user && user.role === cutiOneData.user.role && (
                          <>
                            {cutiOneData.isVerifiedAtasan === false && (
                              <>
                                <Link to={`/cuti/edit/${cutiOneData.uuid}`} className="button is-small is-primary">
                                  Edit
                                </Link>
                              </>
                            )}
                            <button
                              onClick={() => setShowTimelineModal({ id: cutiOneData.uuid, show: true })}
                              className="button is-small is-info"
                            >
                              Lihat detail
                            </button>
                            <Modal
                              id={cutiOneData.uuid}
                              show={showTimelineModal}
                              onClose={() => setShowTimelineModal(false)}
                              title="Detail Pengajuan Cuti"
                            >
                              <Timeline
                                isVerifiedAtasan={cutiOneData.isVerifiedAtasan}
                                isVerifiedKadis={cutiOneData.isVerifiedKadis}
                                isVerifiedKepegawaian={cutiOneData.isVerifiedKepegawaian}
                                atasanVerificationDate={cutiOneData.atasanVerificationDate}
                                kadisVerificationDate={cutiOneData.kadisVerificationDate}
                                kepegawaianVerificationDate={cutiOneData.kepegawaianVerificationDate}
                                verified={'is-success'}
                              />
                            </Modal>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyCutiDashboard;
