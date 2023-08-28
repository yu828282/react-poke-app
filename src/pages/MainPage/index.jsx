import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
// import { useDebounce } from './hooks/useDebounce'
import AutoComplete  from '../../components/AutoComplete'

function MainPage() {
  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(20);
  // const [pokemons, setPokemons] = useState([]); 
  const [allPokemons, setAllPokemons] = useState([]) //모든 포켓몬데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([]) //실제 보여줄 포켓몬 데이터 (0->20->40...)
  const limitNum = 20; //한번에 보여줄 포켓몬 수
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1080&offset=0`;


  // const debouncedSearchTerm = useDebounce(searchTerm,500);

  useEffect(()=> {
    // fetchPokeData(true); 
    fetchPokeData(); 
  }, [])

  // useEffect(()=> {
  //   handleSearchInput(debouncedSearchTerm)
  // }, [debouncedSearchTerm])

  const filterDisabledPokemonData = (allPokemonsData, displayedPokemons = []) => { // displayedPokemons가 없으면 빈 배열로..
    const limit = displayedPokemons.length + limitNum;  //모든 데이터에서 limitNum 만큼 추가로 가져오기
    const array = allPokemonsData.filter((pokemon, index) => index + 1 <= limit);
    return array;
  }

  const fetchPokeData = async()=> { //(isFirstFetch) => {
    try{ // 1080개 포켓몬 데이터 받아오기
      // const offsetValue = isFirstFetch ? 0 : offset + limit;  
      const response = await axios.get(url)   
      setAllPokemons(response.data.results) // 모든 포켓몬 데이터 기억하기
      setDisplayedPokemons(filterDisabledPokemonData(response.data.results)); // 실제로 화면에 보여줄 포켓몬 리스트를 저장하는 state
      // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`)   
      // setPokemons(response.data.results);
      // setPokemons([...pokemons, ...response.data.results]);
      // setOffset(offsetValue)    
  
      // for (let i = 1001; i <= 1010; i++) { //
      //   const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
      //   const kornName = speciesResponse.data.names.find(name => name.language.name === 'ko');
      //   const engName = speciesResponse.data.names.find(name => name.language.name === 'en');
      //   allPokemonData.push({ en_name : engName.name, ko_name: kornName.name });
      // }
      // setPokemonData(allPokemonData);  
      // console.log(allPokemonData)

    }catch(error){
      console.error(error);
    }
  } 


  // const handleSearchInput = async (searchTerm) => { // 검색기능
  //   if(searchTerm.length > 0){
  //     try{
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  //       const pokemonData = {
  //         url : `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name : searchTerm
  //       }
  //       setPokemons([pokemonData])
  //     }catch(error){
  //       setPokemons([]);
  //       console.error(error);
  //     }
  //   }else{
  //     fetchPokeData(true);
  //   }
  // }

  return (
    <article className='pt-20'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <AutoComplete allPokemons={allPokemons} setDisplayedPokemons={setDisplayedPokemons}></AutoComplete>
      </header>
      <section className='py-10 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl '>
          {displayedPokemons.length > 0 ? (
            // pokemons.map((pokemon, index) => (<div key={index} ><img src={pokemon.sprites.front_default} alt={pokemon.korean_name} /><p>{pokemon.korean_name}</p><p>No: {pokemon.id}</p></div>
            displayedPokemons.map(({url, name}, index) => (
            <PokeCard key={url} url = {url} name={name} ></PokeCard>
            ))            
            ):(
              <h2 className='font-medium text-lg text-slate-900 mb-1'>
                포켓몬이 없습니다.
              </h2>
            )}
        </div>
      </section>
      <div className='text-center pb-40'>
        {(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length !==1)&&
         (<button 
            onClick={()=>setDisplayedPokemons(filterDisabledPokemonData(allPokemons, displayedPokemons))}//fetchPokeData(false)}
            className='bg-slate-800 px-6 py-2 text my-4 text-base rounded-lg font-bold text-white'>
              더보기
          </button>)
        }
      </div>
    </article>    
  )
}

export default MainPage
