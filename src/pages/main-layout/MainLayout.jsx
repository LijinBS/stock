import moment from "moment"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Header from "../../shared/component/header/Header"
import NavBar from "../../shared/component/navbar/Navbar"
import { updateStocks } from "../../shared/redux/dashboard/Action"
import Dashboard from "../dashboard/Dashboard"
import { mockData } from "./mockData"
const response = mockData
function MainLayout() {
    const dispatch = useDispatch()

    useEffect( () => {
        const modifiedData = response.map(d => {
            const data = {...d , firstUpdated: moment().format()}
            return data
        })
       dispatch(updateStocks(modifiedData))
    },[dispatch])

    return(
        <div>
            <div>
            <Header />
            <NavBar/>
            </div>
            <Dashboard />
        </div>
    )
}

export default MainLayout