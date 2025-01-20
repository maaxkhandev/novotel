import { GuestContext } from "contexts/GuestContext"
import { useContext } from "react"

export const useGuestContext =()=>{
    const context = useContext(GuestContext);
    if(!context){
         throw new Error("useRateContext must be used within an RateProvider");
    }
    return context;
}