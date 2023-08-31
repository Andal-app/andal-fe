import React, { useState, useEffect } from 'react';
import { MdPersonOutline, MdChildCare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../state/index.js';

function LandingPage() {
  const [isLogin] = useGlobalState('isLogin');
  return (
    <>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <div className="box columns is-flex-direction-column">
                  <h1 className="title is-2 has-text-centered">Welcome</h1>
                  <div className="box column magnolia is-8 is-flex is-flex-direction-column is-align-items-center">
                    <Link to="/parent/login">
                      <MdPersonOutline size={160} />
                      <h2 className="has-text-centered">Orang Tua</h2>
                    </Link>
                  </div>
                  <div className="box column magnolia is-8 is-flex is-flex-direction-column is-align-items-center">
                    <Link to="/child/childlogin">
                      <MdChildCare size={160} />
                      <h2 className="has-text-centered">Anak</h2>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
