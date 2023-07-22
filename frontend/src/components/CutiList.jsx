import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import Modal from './Modal';
import Timeline from './Timeline';
import { useGlobalState } from '../state/index.js';

let statusMessage, i;

const CutiList = ({ cutiData, setCutiData }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [showVerifModal, setShowVerifModal] = useGlobalState('showVerifModal');
  const [showTimelineModal, setShowTimelineModal] = useGlobalState('showTimelineModal');

  useEffect(() => {
    getCutiData();
  }, []);

  const getCutiData = async () => {
    const response = await axios.get('http://localhost:5000/cutidata');
    setCutiData(response.data);
  };

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
                              navigate(`${cutiOneData.uuid}`);
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
                          activateFunction={() => {
                            setShowVerifModal(false);
                            navigate('/dashboard');
                          }}
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
                            verified="is-success"
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
  );
};

export default CutiList;
