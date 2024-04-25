import { useState } from "react"
import { LucidePlay, LucideRotateCcw } from "lucide-react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

function CountDownTimer({ exerciseTypeTimer }: { exerciseTypeTimer: number }) {
  const [isTimerPlaying, setIsTimerPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return (
        <div className="flex ">
          <div className=" items-center justify-center">
            <p className="flex select-none  justify-center">Go !</p>
            <button
              className="mt-2 rounded-xl bg-slate-100 px-6 py-0.5 text-slate-600 hover:bg-slate-200"
              onClick={() => setKey((prevKey) => prevKey + 1)}
            >
              Restart
            </button>
          </div>
        </div>
      )
    }

    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return (
      <div className="flex flex-col">
        <div className="select-none text-xs">Temps restant</div>
        <div className="flex justify-center text-2xl font-black">{`${minutes}:${formattedSeconds}`}</div>
      </div>
    )
  }

  const restartFunction = () => {
    setKey((prevKey) => prevKey + 1)
    setIsTimerPlaying(false)
  }

  return (
    <div className="flex justify-center gap-8">
      <div className="mb-4">
        <CountdownCircleTimer
          key={key}
          isPlaying={isTimerPlaying}
          duration={exerciseTypeTimer}
          colors={["#D19F55", "#B99C70", "#B99C70"]}
          colorsTime={[30, 10, 7]}
          onComplete={() => ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: exerciseTypeTimer })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="flex items-center justify-center pb-3">
        {isTimerPlaying ? (
          <button
            className="flex h-12 w-28 cursor-pointer items-center justify-center rounded-xl bg-orange-100 px-6 py-0.5 text-orange-600 shadow-none transition-shadow duration-300 hover:bg-orange-500 hover:text-[#FFF] hover:shadow-lg  active:translate-y-0.5 active:shadow-inner "
            onClick={() => restartFunction()}
          >
            <LucideRotateCcw className="h-6 w-6" />
          </button>
        ) : (
          <button
            className="group flex h-12 w-28 cursor-pointer items-center justify-center rounded-xl bg-[#D19F55] px-6 py-0.5 text-gray-900 shadow-none transition-shadow duration-300 hover:bg-[#D19F55] hover:shadow-lg  active:translate-y-0.5 active:shadow-inner"
            onClick={() => setIsTimerPlaying(true)}
          >
            <LucidePlay className="h-6 w-6 transition ease-in-out group-hover:scale-110" />
          </button>
        )}
      </div>
    </div>
  )
}

export default CountDownTimer
