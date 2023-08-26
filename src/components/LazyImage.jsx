import React, { useEffect, useState } from "react";

const LazyImage = ({url, alt}) => {
  const[isLoding, setIsLoding] = useState(true);
  const[opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    isLoding ? setOpacity('opacity-0') : setOpacity('opacity-100');
  }, [isLoding])

  return (
    <>
    {isLoding && (
      <div className="absolute h-full z-10 w-full opacity-100 flex items-center justify-center text-none">
          ..로딩중
      </div>
    )}
    <img src={url} alt={alt} width='100%' height='auto' loading='lazy' onLoad={()=>setIsLoding(false)} className={`object-contain h-full ${opacity}`} />
    </>
  )
}
export default LazyImage