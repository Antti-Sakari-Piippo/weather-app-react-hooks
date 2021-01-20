import React from "react";
import "./form.style.css";

const Form = ({ loadWeather, error, fontColor }) => {
  const errorF = () => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please enter city and country
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={loadWeather}>
        <div>{error ? errorF() : ""}</div>
        <div className="row">
          <div className="col-md-3 offset-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
              style={{ color: fontColor }}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
              style={{ color: fontColor }}
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-primary">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
