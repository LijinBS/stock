import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.scss";
import moment from "moment";
import * as Yup from "yup";
import { updateStockQty } from "../../redux/dashboard/Action";

function Modal({ props, callback }) {
  const dispatch = useDispatch()
  const [selectedStock, setSelectedStock] = useState({});
  const updatedStock = useSelector((state) => state.dashboard.stockData);
  const [buySchema, setBuySchema] = useState(
    Yup.object().shape({
      qty: Yup.number().required("Qty required").min(1, "Minimum 1 Qty"),
    })
  );
  useEffect(() => {
    if (props.visible) {
      const existingData = props.data;
      const updatedData = updatedStock.filter(
        (d) => d.Symbol === props.data.Symbol
      )[0];
      const existingSalePrice = Number(
        existingData["Last Sale"].replace(/[^0-9.-]+/g, "")
      );
      const updatedSalePrice = Number(
        updatedData["Last Sale"].replace(/[^0-9.-]+/g, "")
      );
      const finalStock =
        updatedSalePrice >= existingSalePrice ? updatedData : existingData;
      setSelectedStock(finalStock);
      setBuySchema(
        Yup.object().shape({
          qty: Yup.number()
            .required("Qty required")
            .min(1, "Minimum 1 Qty")
            .max(finalStock.Volume, `Maximum ${finalStock.Volume} Qty`),
        })
      );
    }
  }, [props, updatedStock]);
  return (
    <div
      id="myModal"
      className={props.visible ? "modal modal-open" : "modal modal-close"}
    >
      <div className="modal-content">
        <Formik
          initialValues={{ qty: 1 }}
          validationSchema={buySchema}
          onSubmit={({qty}, actions) => {
            dispatch(updateStockQty({Symbol: selectedStock.Symbol , qty , lastUpdated: moment().format()}))
            callback(false, {name: selectedStock.Name, qty})
            actions.resetForm({
              values : {
                qty: 1
              }
            })
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <div className="modal-header">
                <span className="close" onClick={() => callback(false)}>
                  &times;
                </span>
                <h2>{`Buy Stock of ${selectedStock.Name} (${selectedStock.Sector})`}</h2>
              </div>
              <div className="modal-body">
                <h4 className="stock-title">Details</h4>
                <div className="section">
                  <div>
                    <span>Name:</span>
                    <span>{selectedStock.Name}</span>
                  </div>
                  <div>
                    <span>Symbol:</span>
                    <span>{selectedStock.Symbol}</span>
                  </div>
                  <div>
                    <span>Last Sale:</span>
                    <span>{selectedStock["Last Sale"]}</span>
                  </div>
                  <div>
                    <span>Net Change:</span>
                    <span>{selectedStock["Net Change"]}</span>
                  </div>
                  <div>
                    <span>% Change:</span>
                    <span>{selectedStock["% Change"]}</span>
                  </div>
                  <div>
                    <span>Market Cap:</span>
                    <span>{selectedStock["Market Cap"]}</span>
                  </div>
                  <div>
                    <span>Volume:</span>
                    <span>{selectedStock["Volume"]}</span>
                  </div>
                  <div>
                    <span>IPO Year:</span>
                    <span>{selectedStock["IPO Year"]}</span>
                  </div>
                  <div>
                    <span>Industry:</span>
                    <span>{selectedStock["Industry"]}</span>
                  </div>
                  <div>
                    <span>Sector</span>
                    <span>{selectedStock["Sector"]}</span>
                  </div>
                </div>
                <div className="sector-buy">
                  <h4 className="stock-title">Buy Volume:</h4>
                  <label className="label" htmlFor="qty">
                    Select a Quantity
                  </label>
                  <Field id="qty" name="qty" placeholder="Quanity" />
                  {errors.qty && touched.qty ? (
                    <div className="error-danger">{errors.qty}</div>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={!isValid } className="button button-buy">
                  Buy
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Modal;
