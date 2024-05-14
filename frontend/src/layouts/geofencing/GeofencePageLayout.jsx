import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Icon } from '@iconify/react';
import 'react-spring-bottom-sheet/dist/style.css';
import Sidebar from '../../components/navigation/Sidebar';
import Maps from '../../components/maps/Maps';

function GeofencePageLayout({ children, pageTitle = 'Page Title', user, selectPosition, setSelectPosition }) {
  // const [selectPosition, setSelectPosition] = useState(null);
  // console.log(selectPosition);

  return (
    <div className="flex">
      <Sidebar user={user} />

      <main className="relative mx-0 flex flex-col gap-4 w-full">
        {/* top  nav start */}
        <nav className="absolute z-10 w-full lg:w-[310px] lg:left-6 top-4 lg:top-8 flex items-center justify-center">
          {/* circular back button start */}
          <div className="absolute left-3 flex justify-center items-center w-8 h-8 bg-violet-300 rounded-full text-black">
            <Icon icon={'ion:arrow-back'} className="w-6 h-6" />
          </div>
          {/* circular back button end */}

          <div
            id="page__title"
            className="min-w-32 max-w-fit px-4 h-9 text-b-md font-bold bg-violet-300 rounded-full flex justify-center items-center"
          >
            <p>{pageTitle}</p>
          </div>
        </nav>
        {/* top  nav end */}

        {/* map section start */}
        <div className="z-0 h-screen w-full flex justify-center items-center">
          <div className="w-full h-[100vh]">
            <Maps selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          </div>
        </div>
        {/* map section end */}

        {/* information detail modal start */}
        <div id="information__detail">{children}</div>
        {/* information detail modal end */}

        {/* lang and long start (temporary)*/}
        {/* <div className="bg-red-200 absolute z-10 top-10 right-10">
          <p>lat: {selectPosition?.lat}</p>
          <p>lon: {selectPosition?.lon}</p>
        </div> */}
        {/* lang and long end */}
      </main>
    </div>
  );
}

export default GeofencePageLayout;
