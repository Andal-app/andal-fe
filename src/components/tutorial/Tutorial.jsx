import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideContent from './SlideContent';
// import './slider-custom.css';

function Tutorial({ imgSrc }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots) => (
      <div>
        <ul className="custom-slick-dots"> {dots} </ul>
      </div>
    )
  };

  const slides = [
    {
      img: imgSrc,
      title: 'Aplikasi Andal untuk Kesalamatan Anak',
      description:
        'Lacak keberadaan anak Anda dengan aplikasi Andal. Tetapkan jadwal dan lokasi kegiatan anak. Kami akan mengirimkan notifikasi jika Anak keluar dari wilayah kegiatannya.'
    },
    {
      img: imgSrc,
      title: 'Lakukan Registrasi Akun',
      description: 'Orang tua dan anak perlu mendaftarkan akun di perangkat masing-masing'
    },
    {
      img: imgSrc,
      title: 'Hubungkan Akun Anak',
      description:
        'Untuk dapat mengakses informasi terkini dari anak, hubungkan dengan akun anak. Masukkan kode dari akun orang tua di akun anak.'
    },
    {
      img: imgSrc,
      title: 'Ketahui Lokasi Terkini Anak',
      description: 'Ketahui alamat dan titik lokasi anak pada maps secara update'
    },
    {
      img: imgSrc,
      title: 'Tentukan Jadwal dan Lokasi Kegiatan Anak',
      description:
        'Awasi kegiatan anak dari jauh. Buat titik, area goefence pada maps, dan rentang waktu kegiatan anak untuk mengawasinya. Dapatkan notifikasi jika anak keluar dari area tersebut.'
    }
  ];

  return (
    <div className="slider-container w-full max-w-[300px] lg:w-full lg:max-w-[800px] h-[75%]">
      <Slider {...settings} className="pb-4">
        {slides.map((slide, index) => (
          <SlideContent key={index} imgSrc={slide.img} title={slide.title} description={slide.description} />
        ))}
      </Slider>
    </div>
  );
}

export default Tutorial;
