import { Icon } from '@iconify/react';

function InputProfPic({ src }) {
  return (
    <div id="edit__profile__picture__container" className="w-full py-12 flex items-center justify-center">
      <div id="edit__profile__picture" className=" relative">
        <img id="user__profile__picture" src={src} className={`w-36 h-36 rounded-full`}></img>

        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-violet-500 flex justify-center items-center">
          <Icon icon={'ph:camera-bold'} className="w-6 h-6 text-violet-500" />
        </div>
      </div>
    </div>
  );
}

export default InputProfPic;
