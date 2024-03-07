import { useState } from 'react';
import { Icon } from '@iconify/react';
import 'react-spring-bottom-sheet/dist/style.css';

import Sidebar from '../../components/navigation/Sidebar';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';

function GeofencePageLayout({ children, pageTitle = 'Page Title' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

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

        {/* map start */}
        <div className="z-0 bg-neutral-400 h-screen w-full  flex justify-center items-center">
          MAP MAP MAP MAP MAP MAP
        </div>
        {/* map end */}

        {/* information detail modal start */}
        <div id="information__detail">{children}</div>
        {/* information detail modal end */}
      </main>
    </div>
  );
}

export default GeofencePageLayout;
