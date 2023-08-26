import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value); 

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay); // delay =1000 1초마다 초기화

        return () => {
            clearTimeout(handler); // delay 전 다시 호출되면 clearTimeout으로 진행중 값이 없어짐
        }
    }, [value, delay]) // 둘중 하나 변경시 재호출

    return debouncedValue;
}