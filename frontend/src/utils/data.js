var startDate = new Date();
startDate = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`;
var endDate = new Date();
endDate = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`;
let cutiData = [
  {
    id: +new Date()+1,
    nama: 'Rhino Rizky',
    tipeCuti: 'Liburan',
    alasanCuti: 'Liburan ke Jepang',
    durasiCuti: '4',
    startDate: startDate,
    endDate: endDate,
    isVerified: false
  },
  {
    id: +new Date(),
    nama: 'Siti Nabilah',
    tipeCuti: 'Sakit',
    alasanCuti: 'Sakit karena demam',
    durasiCuti: '2',
    startDate: startDate,
    endDate: endDate,
    isVerified: false
  }
];

function getData() {
  return cutiData;
}

function addCutiData({ nama, tipeCuti, alasanCuti, durasiCuti, startDate, endDate }) {
  startDate = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`;
  endDate = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`;
  cutiData = [
        ...cutiData, 
        {
          id: +new Date(),
          nama,
          tipeCuti,
          alasanCuti,
          durasiCuti,
          startDate,
          endDate,
          isVerified: false
        }
      ];
}

export { getData, addCutiData };