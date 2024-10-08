import React, { useEffect, useState } from 'react'
import slide5 from '../../../assets/slide5.png'
import slide8 from '../../../assets/slide8.png'
import slide9 from '../../../assets/slide9.jpeg'
import slide6 from '../../../assets/slide6.png'




const images=[
    slide5, 
    slide8,
    slide6,
]
function SlideShow() {
  const [count,setCount]=useState(0);
  useEffect(()=>{
    setTimeout(()=>{
      setCount((pre)=>pre===images.length-1?0:pre+1)
    },5000)
  },[count])
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     arrows: true,
    //   };
  return (

      <div className="w-full flex bg-slate-300 justify-center">
      {/* <Slider {...settings} className='w-[95%]'> */}
       
            <img src={images[count]} alt="" className=" md:h-[100%] h-[100%]   object-cover " />
          
       
      {/* </Slider> */}
      </div>
  )
}

export default SlideShow
