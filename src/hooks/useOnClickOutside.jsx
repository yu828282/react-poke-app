import { useEffect } from "react";

export default function useOnClickOutside(ref,handler){
  useEffect(() => {
    const listner = (event) => { 
      console.log(event.target)
      //모달 안 클릭
      if(!ref.current || ref.current.contains(event.target)){ //ref가 없거나, 이벤트가 발생한 지점이 타겟(모달창)안에 속해 있다면
        return;
      }
      //모달 밖 클릭
      handler();
    }

    document.addEventListener('mousedown', listner);
    return()=> {
      document.removeEventListener('mousedown', listner);
    }
  }, [ref,handler])
}