import ProfPic from '../../assets/images/profile_picture.jpeg';
import InputLabel from '../../components/inputs/InputLabel';
import TextInput from '../../components/inputs/TextInput';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TopBackNav from '../../components/navigation/TopBackNav';
import Sidebar from '../../components/navigation/Sidebar';
import InputProfPic from '../../components/inputs/InputProfPic';

function EditProfile() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center">
        {/* top back nav start */}
        <TopBackNav title="Ubah Profil" />
        {/* top back nav end */}

        <main className="w-[90%] lg:w-[80%] h-[80%] flex flex-col items-center">
          {/* edit profile picture start */}
          <InputProfPic src={ProfPic} />
          {/* edit profile picture end */}

          {/* edit form start */}
          <form className="w-full h-full flex flex-col justify-between">
            <div id="edit__inputs" className="flex flex-col gap-4">
              <div id="edit__fullname">
                <InputLabel labelFor="fullname" content="Nama lengkap" />
                <TextInput type="text" name="fullname" id="fullname" placeholder="" required />
              </div>

              <div id="edit__email">
                <InputLabel labelFor="email" content="Email" />
                <TextInput type="text" name="email" id="email" placeholder="" required />
              </div>
            </div>

            <div id="edit__save__btn">
              <SubmitBtn text="Simpan" />
            </div>
          </form>
          {/* edit form end */}
        </main>
      </div>
    </div>
  );
}

export default EditProfile;
