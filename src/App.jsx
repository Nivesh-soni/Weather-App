import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [city, setcity] = useState("Ratlam")
  const [inputCity, setInputCity] = useState("Ratlam")
  const [data, setdata] = useState({ lat: "", lon: "" })
  const [weather, setweather] = useState({ temp: "", humidity: "", speed: "", desc: "", pressure: "" })

  const getDayName = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return days[today.getDay()];
  };

  const key = "6ab7794c09590a5505aab385e4338ad3"

  // const error = () => {

  // }
  const getdata = async (city) => {
    let req = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1` + `&appid=${key}`)
    let res = await req.json()
    // console.log(res)
    if (res.length > 0) {
      const newData = {
        lat: res[0].lat,
        lon: res[0].lon
      }
      setdata(newData)
      setcity(city)
    }
  }

  const getWeather = async () => {
    let req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${key}&units=metric`)
    let res = await req.json()
    console.log(res)
    if (res.main) {
      const newWeather = {
        temp: res.main.temp,
        humidity: res.main.humidity,
        speed: res.wind.speed,
        pressure: res.main.pressure,
        desc: res.weather[0].description
      }
      setweather(newWeather)
      console.log(weather.desc)
    }
  }

  useEffect(() => {
    getdata(city)
  }, [])

  useEffect(() => {
    if (data.lat && data.lon) {
      getWeather()
    }
    // else {
    //   error()
    // }
  }, [data])


  const handlecity = (e) => {
    // console.log(e)
    setInputCity(e.target.value)
  }

  const handleSearch = (e) => {
    setcity(inputCity)
    getdata(inputCity)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setcity(inputCity)
      getdata(inputCity)
    }
  }
  return (
    <>
      <div className="container1 overflow-y-auto overflow-x-hidden max-h-[95vh] mx-auto xl:w-[60vw] lg:w-[50vw] md:w-[70vw] sm:w-[85vw] w-[90vw] rounded-2xl flex items-center flex-col my-5">
        <h1 className='text-3xl text-white mt-5 font-bold'>Weather App</h1>
        <div className="search rounded-2xl h-15 flex justify-around items-center w-[75%] xl:w-[45%] py-3 px-5">
          <input onChange={handlecity} value={inputCity} onKeyDown={handleEnter} type="text" placeholder='Search' className='input w-[75%]' />
          <i onClick={handleSearch} className="fa-solid fa-magnifying-glass cursor-pointer"></i>
        </div>

        <div className="text-white text-center mt-6 space-y-2">
          <div className='flex justify-center sm:justify-around mt-8 w-[23.75rem] lg:w-full'>
            <div className='flex flex-col gap-3 w-1/2 items-start'>
              <h1 className="text-2xl md:text-3xl font-semibold"><i class="fa-solid fa-location-dot text-white"></i> {city}</h1>
              <h1 className="text-2xl md:text-3xl font-semibold"><i class="fa-solid fa-calendar-week"></i> {getDayName()} </h1>
            </div>
            <img src="./assets/cloudy.png" alt="" className='h-20' />
          </div>
          <div className='flex lg:gap-9 flex-col items-center lg:flex-row my-10'>
            <div className='mt-5'>
              <div className="text-center text-xl bg-[#2e3647] rounded-2xl p-4 w-50 mt-10">Temp🌡 <br />{weather.temp}°C</div>
              <div className="text-center text-lg bg-[#2e3647] rounded-2xl p-4 w-50 mt-10">Humidity💧 <br />{weather.humidity}%</div>
            </div><br />
            <div className='mt-5'>
              <div className="text-center text-lg bg-[#2e3647] rounded-2xl p-4 w-50 lg:mt-10">Wind🍃 <br />{weather.speed} m/s</div>
              <div className="text-center text-lg bg-[#2e3647] rounded-2xl p-4 w-50 mt-10">Pressure⚖️ <br />{weather.pressure} hPa</div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App