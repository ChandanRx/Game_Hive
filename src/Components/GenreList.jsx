import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'

const GenreList = ({GenreId , selectedGenresName}) => {

    const [genreList ,setGenreList] = useState([])
    const [ActiveIndex , setActiveIndex] = useState(0)


    useEffect(()=>{
        getGenreList()
    },[])
    const getGenreList =()=> {
           GlobalApi.getGenreList.then((res)=>{
                    console.log(res.data.results);
                    setGenreList(res.data.results)
           }) 
    }
  return (
    <div>
        <h2 className='text-[30px] font-bold dark:text-white '>Genre</h2>
        {genreList.map((item,index)=>(
            <div onClick={()=>{setActiveIndex(index);GenreId(item.id);
            selectedGenresName(item.name)}} className={`flex gap-2 items-center cursor-pointer 
            mb-2 hover:bg-gray-600 p-2 
            group rounded-lg :hover:dark:bg-gray-600
            ${ActiveIndex==index?'bg-gray-300 dark:bg-gray-600':null}`}>
               <img src={item.image_background} alt='image' 
               className={`w-[40px] h-[40px] object-cover rounded-lg
               group-hover:scale-105 transition-all ease-out duration-300 
               ${ActiveIndex==index?'scale-105':null}`}/>
              <h3 className={`dark:text-white text-[18px] 
              group-hover:font-bold transition-all 
              ease-out duration-300
              ${ActiveIndex==index?'font-bold':null}`}>{item.name}</h3>
              </div>
        ))}
    </div>
  )
}

export default GenreList