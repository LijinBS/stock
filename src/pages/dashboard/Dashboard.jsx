import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOneStock } from "../../shared/redux/dashboard/Action";
import moment from "moment";
import "./Dashboard.scss";
import Modal from "../../shared/component/modal/Modal";
import Toast from "../../shared/component/toast/Toast";

function Dashboard() {
  const dispatch = useDispatch();
  const dollarConversion = (value) => {
    const dollarUS = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const number = Number(value.replace(/[^0-9.-]+/g, ""));
    const changePercent = (number * 1) / 100;
    return dollarUS.format(number + changePercent);
  };

  const stockData = useSelector((state) => state.dashboard.stockData);

  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState({visible : false, data: {}});
  const [toastState, setToastState] = useState({visible : false, data: {}});


  useEffect(() => {
    const timeInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 10 + 0);
      if (random && tableData[random]) {
        const modifiedStock = tableData[random];
        modifiedStock['lastUpdated'] = moment().format()
        modifiedStock["Last Sale"] = dollarConversion(
          modifiedStock["Last Sale"]
        );
        dispatch(updateOneStock(modifiedStock));
      }
    }, 10000);
    return () => clearInterval(timeInterval);
  }, [tableData, dispatch]);

  useEffect(() => {
    if (stockData.length > 0) {
      setTableData(stockData);
    }
  }, [stockData]);

  const calculateTime = (lastTime, firstTime) => {
    return moment(lastTime || firstTime).fromNow();
  };

  const modalCallback  = (event, buy={}) => {
    console.log()
    setModalState({visible: event, data: {}});
    if(Object.keys(buy).length) {
      setToastState({visible: true, data: buy});
    }
    setTimeout(() => {
      setToastState({visible: false, data: {}});
    }, 3000)
  }


  const handleStock = (stock) => {
    const filteredStock = tableData.filter(d=> d.Symbol === stock)[0]
    setModalState({visible: true, data: filteredStock});
  }
  return (
    <div className="dashboardGroup">
    <div className="title">Detailed Table</div>
    <div className="container">
    <table className="table">
      <thead>
        <tr className="table-header">
          <th className="table-header-title">Symbol</th>
          <th className="table-header-title">Name</th>
          <th className="table-header-title">Industry</th>
          <th className="table-header-title">Sector</th>
          <th className="table-header-title">Last Sale</th>
          <th className="table-header-title">Volume</th>
          <th className="table-header-title">IPO Year</th>
          <th className="table-header-title">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((d) => (
          <tr key={d["Symbol"]} className="table-body" onClick={()=>handleStock(d["Symbol"])}>
            <td className="table-body-data link">{d["Symbol"]}</td>
            <td className="table-body-data">{d["Name"]}</td>
            <td className="table-body-data">{d["Industry"]}</td>
            <td className="table-body-data">{d["Sector"]}</td>
            <td className="table-body-data">{d["Last Sale"]}</td>
            <td className="table-body-data">{d["Volume"]}</td>
            <td className="table-body-data">{d["IPO Year"]}</td>
            <td className="table-body-data">
              {calculateTime(d.lastUpdated, d.firstUpdated)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <Modal props={modalState} callback={modalCallback}  />
    <Toast  visible={toastState.visible} data={toastState.data} />
    </div>
    
  );
}

export default Dashboard;
