import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import RecipeCard from './RecipeCard';
import { useMediaQuery } from '@mui/material';

export default function RecipeCarousel() {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  let swiperRef = useRef(null)

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

//   getting recipes
//   useEffect(() => {
//     const getSteps = async () => {
//         try {
//             const response = await api.get();
//             setSteps(response.data);
//         } catch(error){
//             console.error('There was an error getting your recipes:', error);
//         }
//     };

//     getSteps();
//   }, []);

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleBackClick = () => {
    if (swiperRef.current) {
        swiperRef.current.slidePrev();
    }
  }

  const activeSlideStyle = {
    zIndex: 4,
    transform: 'scale(1.4)',
  };
  
  const semiActiveSlideStyle = {
    zIndex: 3,
    transform: 'scale(1.2)',
  };
  
  const nonActiveSlideStyle = {
    zIndex: 2,
    transform: 'scale(1.0)',
  };
  
  const leastActiveSlideStyle = {
    zIndex: 1,
    transform: 'scale(0.9)',
  };
  
  const getSlideStyle = (index, activeStep, totalSteps, isSmallScreen) => {
    if (isSmallScreen) return {};
    if (index === activeStep) return activeSlideStyle;
    if (index === (activeStep + 1) % totalSteps || index === (activeStep - 1 + totalSteps) % totalSteps) return semiActiveSlideStyle;
    if (index === (activeStep + 2) % totalSteps || index === (activeStep - 2 + totalSteps) % totalSteps) return nonActiveSlideStyle;
    return leastActiveSlideStyle;
  };

  const exampleSteps = [
    {title: 'mac', description: 'cheesy'},
    {title: 'burger', description: 'meaty'},
    {title: 'chicken', description: 'wow chicken'},
    {title: 'soup', description: 'soupy'},
    {title: 'casserole', description: 'loaf'},
    {title: 'borsch', description: 'mmmmm'},
    {title: 'ribeye', description: 'cool'},
    {title: 'porkchops', description: 'puerco'},
    {title: 'corned beef', description: 'corned'},
    {title: 'curry', description: 'curry'},
    {title: 'bibimbap', description: 'uh'}
  ];

  return (
    <Box sx={{ width: '80vw' , flexGrow: 1, display: 'flex', justifyContent: 'center', alignContent: 'center', overflow: 'visible' }}>
      <Swiper 
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={isSmallScreen? 1 : 5}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        pagination={{clickable: true}}
        onSlideChange={(swiper) => {setActiveStep(swiper.realIndex), console.log(swiper.activeIndex)}}
        className='swiper'
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        style={{
            overflowY: 'visible'
        }}
      >
        {exampleSteps.map((stepData, index) => (
        //   <SwiperSlide key={index} style={index === (activeStep) ? activeSlideStyle : nonActiveSlideStyle}>
          <SwiperSlide key={index} style={getSlideStyle(index, activeStep, exampleSteps.length, isSmallScreen)}>
            <RecipeCard data={stepData} />
          </SwiperSlide>
        ))}
        <div onClick={handleNextClick} className="swiper-button-next"></div>
        <div onClick={handleBackClick} className="swiper-button-prev"></div>
      </Swiper>
    </Box>
  );
}
