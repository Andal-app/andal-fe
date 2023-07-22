import React, { useState } from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';

const InputCuti = () => {
  const [quota, setQuota] = useState();

  return (
    <Layout>
      <FormEditUser featureHeading="Input Cuti" disabled={true} quota={quota} setQuota={setQuota}>
        <div className="field mt-5">
          <label className="label">Input Jumlah Cuti</label>
          <div className="control">
            <input type="text" className="input" value={quota} onChange={e => setQuota(e.target.value)} />
          </div>
        </div>
      </FormEditUser>
    </Layout>
  );
};

export default InputCuti;
