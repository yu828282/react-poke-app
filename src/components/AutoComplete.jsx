import React, {useState}  from 'react'
import koList from '../json/koList.json'

const AutoComplete = ({allPokemons, setDisplayedPokemons}) => {

  
  const [searchTerm, setSearchTerm] = useState(''); //검색기능

  const totalList = koList

  const filterNames = (input) => {
    return input ? totalList.filter((e) => e.ko_name.includes(input)) : [];
  }
  
  const enFilterNames = (input) => {
    const value = input.toLowerCase(); // 소문자 변경
    return value ? allPokemons.filter((e) => e.name.includes(value)) : []; //인풋이 포함되는 값 리턴
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = searchTerm.trim(); //문자열 좌우공백을 제거
    setDisplayedPokemons(enFilterNames(text));
    // console.log(enFilterNames(text))
    setSearchTerm('');
  }

  const checkEqualName = (input) => {
    const filteredArray = filterNames(input);
    return filteredArray[0]?.ko_name === input ? [] : filteredArray; //첫번째 배열이름이 인풋과 같으면 빈 배열을 넣기
  }

  return (    
    <div className='relative z-50'>
    <form 
      onSubmit={handleSubmit}
      className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto' action=""
      >
      <input 
        type="text" 
        className='text-xs w-[20.5rem] bg-[hsl(214,13%,47%)] h-6 px-2 py-1 rounded-lg text-gray-300 text-center' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}//{handleSearchInput}
      />
      <button type='submit' className='text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'>검색</button>
    </form>
    {checkEqualName(searchTerm).length > 0 && ( //길이가 0보다 크면 다음코드 보여주기
    <div
      className={ `w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2` }
    >
      <div className={ `w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2` }>
      </div>
      <ul 
        className={ `w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none` }
      >
       {checkEqualName(searchTerm).map((e, i) => (
        <li key={`button-${i}`}>
          <button
            onClick={() =>  setSearchTerm(e.en_name) }
            className={`text-base w-full hover:bg-gray-600 p-[2px] text-gray-100`}
          >{e.ko_name}
        </button>
        </li>
       ))} 
      </ul>
    </div>  
    )}
  </div>
  )
}

export default AutoComplete