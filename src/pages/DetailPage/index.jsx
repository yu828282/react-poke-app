import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import  Loading  from '../../assets/Loading';
import  LessThan  from '../../assets/LessThan';
import  GreaterThan  from '../../assets/GreaterThan';
import  ArrowLeft  from '../../assets/ArrowLeft';
import  Balance  from '../../assets/Balance';
import  Vector  from '../../assets/Vector';
import Type from "../../components/Type";
import BaseStat from "../../components/BaseStat";
import DamageRelations from "../../components/DamageRelations";
import DamageModal from '../../components/DamageModal'

const DetailPage = () => {

  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const[isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams(); // App의 :id를 통해 useParams 정보가 들어온다
  const pokemonId = params.id;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`

  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonData(pokemonId);
  }, [pokemonId])

  async function fetchPokemonData(id){
    const url = `${baseUrl}${id}`
    
    try{
      const { data:pokemonData } = await axios.get(url); //pokemonData 란 이름으로 data 가져오기
      // console.log(pokemonData)
      if(pokemonData){
        const {name, id, types, weight, height, stats, abilities, sprites} = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
        console.log(stats)

        const DamageRelations = await Promise.all( // 작업을 모두 처리한 다음 한꺼번에 리턴된다
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            console.log('i :', i, 'type :',type);
            return type.data.damage_relations
          })
        )

        const formattedPokemonSprites = (sprites) => { //도트이미지 가져오기
          const newSprites = {...sprites};
          Object.keys(newSprites).forEach(key => {
            if(typeof newSprites[key] !== 'string'){ //null 자료 제거
              delete newSprites[key]
            }
          })
          return Object.values(newSprites); //배열로 리턴
        }

        const filterAndFormatDescription = (flavorText) => {    
            const koreanDescriptions = flavorText
                ?.filter((text) => text.language.name === "ko")
                .map((text) => text.flavor_text.replace(/\r|\n|\f/g, ' '))
            return koreanDescriptions;
        }
        
        const getPokemonDescription = async (id) => {
          const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
          const { data : pokemonSpecies} = await axios.get(url)
          console.log(pokemonSpecies)

          const descriptions = filterAndFormatDescription(pokemonSpecies.flavor_text_entries)

          return descriptions[Math.floor(Math.random() * descriptions.length)]
        }

        
        const filterKoname = (names) => {    
          const koreanName = names
              ?.filter((text) => text.language.name === "ko")
          return koreanName;
      }

        const getKoname= async (id) => {
          const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
          const { data : pokemonSpecies} = await axios.get(url)
          const koname = filterKoname(pokemonSpecies.names)[0].name
          return koname
        }


        const formattedPokemonData = { 
          id, name, weight: weight / 10, height: height / 10, 
          previous: nextAndPreviousPokemon.previous, 
          next: nextAndPreviousPokemon.next, 
          abilities: formatPokemonAbilities(abilities), 
          stats: formatPokemonStats(stats),
          DamageRelations,
          types : types.map(type => type.type.name),
          sprites : formattedPokemonSprites(sprites),
          description : await getPokemonDescription(id),
          koname : await getKoname(id),
        }
        setPokemon(formattedPokemonData);
        setIsLoading(false);  
      }
    }catch(error){
      console.error(error);
      setIsLoading(false);
    }
  }

  const formatPokemonAbilities = (abilities) => {
    return abilities.filter((_, index) => index <= 1)
        .map((obj) => obj.ability.name.replaceAll('-', ' '))
  }
  const formatPokemonStats = ([
    statHP, statATK, statDEP, statSATK, statSDEP, statSPD
  ]) => [
    { name: 'Hit Points', baseStat: statHP.base_stat },
    { name: 'Attack', baseStat: statATK.base_stat },
    { name: 'Defense', baseStat: statDEP.base_stat },
    { name: 'Special Attack', baseStat: statSATK.base_stat },
    { name: 'Special Defense', baseStat: statSDEP.base_stat },
    { name: 'Speed', baseStat: statSPD.base_stat }
  ]

  async function getNextAndPreviousPokemon(id){
    const urlPokemon = `${baseUrl}?limit=1&offset=${id-1}`; //id-1 이후 1개를 가져오는 것이기 때문

    const {data : pokemonData} =await axios.get(urlPokemon)
    console.log('이전것',pokemonData)

    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next))// url로 데이터 요청
    const previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous))
   
    return {
      next : nextResponse?.data?.results?.[0]?.name, //nextResponse, 그 data, 그 result와 첫항의 name 존재여부 방어코드로 확인
      previous : previousResponse?.data?.results?.[0]?.name
    }
  }

  if(isLoading) {
    return <div className={
      `absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50`
    }><Loading className='w-12 h-12 z-50 animate-spin text-slate-900'/>
    </div>
  }
  if (!isLoading && !pokemon) {
    return (
        <div>...NOT FOUND</div>
    )
}

  if(!isLoading && pokemon) {
    return (
      <article className='w-full flex items-center gap-1 flex-col'>
        <div className={ `${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden` } >
        {pokemon.previous && (
          <Link
              className='absolute top-[40%] -translate-y-1/2 z-50 left-1'
              to={`/pokemon/${pokemon.previous}`}
          >
              <LessThan className='w-5 h-8 p-1' />
          </Link>
        )}
      {pokemon.next && (
          <Link
              className='absolute top-[40%] -translate-y-1/2 z-50 right-1'
              to={`/pokemon/${pokemon.next}`}
          >
              <GreaterThan className='w-5 h-8 p-1' />
          </Link>
                    )}
          <section className='w-full flex flex-col z-20 items-center justify-end relative h-full'>
            <div className='absolute z-30 top-6 flex items-center w-full justify-between px-2'>
                <div className='flex items-center gap-1'>
                    <Link to="/">
                        <ArrowLeft className='w-6 h-8 text-zinc-200' />
                    </Link>
                    <h1 className='text-zinc-200 font-bold text-xl capitalize'>
                        {pokemon.name}
                    </h1>
                </div>
                <div className='text-zinc-200 font-bold text-md'>
                    #{pokemon.id.toString().padStart(3, '00')}
                </div>
            </div>

            <div className='relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16'>
                <img
                    src={img}
                    width="100%"
                    height="auto"
                    loading="lazy"
                    alt={pokemon.name}
                    className={`object-contain h-full cursor-pointer`}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            </section>
            <section className='w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4'>
              <h2 className={`text-base font-semibold ${text}`}>
                  {pokemon.koname}
              </h2>   
              <div className='flex items-center justify-center gap-4'>               
                  {/* 포켓몬 타입 */}
                  {pokemon.types.map((type) => (
                      <Type key={type} type={type} />
                  ))}
              </div>
              <h2 className={`text-base font-semibold ${text}`}> 정보
              </h2>
              <div className='flex w-full items-center justify-between max-w-[400px] text-center'>
                  <div className='w-full'>
                      <h4 className='text-[0.5rem] text-zinc-100'>Weight</h4>
                      <div className='text-sm flex mt-1 gap-2 justify-center  text-zinc-200'>
                          <Balance />
                          {pokemon.weight}kg
                      </div>
                  </div>
                  <div className='w-full'>
                      <h4 className='text-[0.5rem] text-zinc-100'>Height</h4>
                      <div className='text-sm flex mt-1 gap-2 justify-center  text-zinc-200'>
                          <Vector />
                          {pokemon.height}m
                      </div>
                  </div>
                  <div className='w-full'>
                      <h4 className='text-[0.5rem] text-zinc-100'>Weight</h4>
                      {pokemon.abilities.map((ability) => (
                          <div key={ability} className="text-[0.5rem] text-zinc-100 capitalize"> {ability}</div>
                      ))}
                  </div>
              </div>
              <h2 className={`text-base font-semibold ${text}`}>
                  기본 능력치
              </h2>
              <div className='w-auto'>
                  <table>
                      <tbody>
                          {pokemon.stats.map((stat) => (
                              <BaseStat
                                  key={stat.name}
                                  valueStat={stat.baseStat}
                                  nameStat={stat.name}
                                  type={pokemon.types[0]}
                              />
                          ))}
                      </tbody>
                  </table>
              </div>
              <h2 className={`text-base font-semibold ${text}`}>
                데미지 정보
              </h2>
              {pokemon.DamageRelations && (
                <div className="w-10/12">
                  <h2 className={`text-base text-center font-semibold ${text}`}>
                    <DamageRelations damages = {pokemon.DamageRelations}></DamageRelations>
                  </h2>
                </div>
              )}              
              <h2 className={`text-base font-semibold ${text}`}>설명</h2>
                <p className='text-md leading-4 font-sans text-zinc-200 max-w-[30rem] text-center'>
                    {pokemon.description}
                </p>
                <div className='flex my-8 flex-wrap justify-center'>
                    {pokemon.sprites.map((url, index) => (
                        <img key={index} src={url} alt="sprite" />
                    ))}
                </div>
                </section>
              </div>
                {isModalOpen && <DamageModal 
                  setIsModalOpen={setIsModalOpen} 
                  damages={pokemon.DamageRelations}
                  />
                }
          </article>
    )
  }
  return null;
}

export default DetailPage