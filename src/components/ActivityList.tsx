import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline"
import { useActivity } from "../hooks/useActivity"


export default function ActivityList() {

    const {state, dispatch} = useActivity()

    const {activities} = state

    //Metodo para mostrar por nombre en lugar de por id 
    const categoryName = useMemo(() => 
        (category : Activity["category"]) => categories.map(cat => cat.id === category ? cat.name : "")
        ,[activities])

    const isEmpty = useMemo(() => activities.length === 0, [activities])

  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">
            Comida y Actividades
        </h2>

        {isEmpty ? <p className="text-center my-5"> No hay actividades aún </p> :

        activities.map( activity => (
            <div className="px-5 py-10 bg-white mt-5 flex justify-between shadow" key={activity.id}>
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? "bg-cyan-300" : "bg-orange-400"}`}>
                        {categoryName(+activity.category)}
                    </p>
                    <p className="text-2xl font-bold pt-5">
                        {activity.name}
                    </p>
                    <p className="font-black text-4xl text-cyan-500">
                        {activity.calories} {""}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className="flex gap-5 items-center">
                    <button
                        onClick={() => dispatch({type: "set-activeId", payload : {id: activity.id}})}
                    >
                        <PencilSquareIcon 
                            className="h-8 w-8 text-gray-800"
                        />
                    </button>
                    <button
                        onClick={() => dispatch({type: "delete-activity", payload : {id: activity.id}})}
                    >
                        <XCircleIcon
                            className="h-8 w-8 text-red-500"
                        />
                    </button>
                </div>
            </div>
        ))}
    </>   
  )
}
