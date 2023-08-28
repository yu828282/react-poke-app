import React, { useEffect, useState } from "react";
import ArrowUp from "../assets/ArrowUp";

const Footer = () => { 

  const [show, setShow] = useState(false);

  const listner = () => {
    if(window.scrollY > 50){
      setShow(true);
    }else{
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listner);

    return () => {
      window.removeEventListener('scroll', listner);
    }
  }, [])


  function returnToTop() { 
    window.scrollTo(0, 0); 
  }

  return (
  <>{show ? 
    <div onClick={returnToTop} 
      className='cursor-pointer flex fixed bottom-5 right-5 z-5 animate-bounce w-16 h-16 rounded-full bg-[hsl(214,13%,47%)] text-white justify-center items-center shadow-md'
    >
      <ArrowUp></ArrowUp>
    </div>
    : null}
    <footer className="bottom-0 bg-black py-10">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-gray-500">
      본 페이지는 상업적 목적이 아닌 개인 공부용으로 제작되었습니다.
      <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="#" className="hover:underline">yu</a>. All Rights Reserved. 
    </span>
    </div>
</footer>
  </>
  )
}


export default Footer