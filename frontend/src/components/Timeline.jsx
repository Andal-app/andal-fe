import React from 'react';
import moment from 'moment';

const Timeline = ({
  isVerifiedAtasan,
  isVerifiedKadis,
  isVerifiedKepegawaian,
  atasanVerificationDate,
  kadisVerificationDate,
  kepegawaianVerificationDate,
  verified
}) => {
  function displayDateFormat(date) {
    if (moment(date).format('DD MMMM YYYY') !== 'Invalid date') {
      return moment(date).format('DD MMMM YYYY');
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="timeline">
        <header className="timeline-header">
          <span className={`tag is-medium ${verified}`}>Diajukan</span>
        </header>
        <div className={`timeline-item ${isVerifiedAtasan && verified}`}>
          <div className={`timeline-marker ${isVerifiedAtasan && verified}`}></div>
          <div className="timeline-content">
            <p className="heading">{displayDateFormat(atasanVerificationDate)}</p>
            <p>Diverifikasi oleh Atasan</p>
          </div>
        </div>
        <div className={`timeline-item ${isVerifiedKadis && verified}`}>
          <div className={`timeline-marker ${isVerifiedKadis && verified}`}></div>
          <div className="timeline-content">
            <p className="heading">{displayDateFormat(kadisVerificationDate)}</p>
            <p>Diverifikasi oleh Kepala Dinas</p>
          </div>
        </div>
        <div className={`timeline-item ${isVerifiedKepegawaian && verified}`}>
          <div className={`timeline-marker ${isVerifiedKepegawaian && verified}`}></div>
          <div className="timeline-content">
            <p className="heading">{displayDateFormat(kepegawaianVerificationDate)}</p>
            <p>Diinput oleh Kepegawaian</p>
          </div>
        </div>
        <header className="timeline-header">
          <span className={`tag is-medium ${isVerifiedKepegawaian && verified}`}>Disahkan</span>
        </header>
      </div>
    </>
  );
};

export default Timeline;
