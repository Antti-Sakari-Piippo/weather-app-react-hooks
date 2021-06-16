import "./weather.style.css";

const Weather = (props) => {
  const {
    city,
    weatherIcon,
    temp_celsius,
    temp_max,
    temp_min,
    wind,
    windWarning,
    humidity,
    description,
    fontColor,
  } = props;

  return (
    <div className="container text-light">
      <div className="Card">
        <h1 style={{ color: fontColor }} className="py-2">
          {city}
        </h1>
        <p style={{ color: fontColor }} className="py-4">
          <i className={`wi ${weatherIcon} display-1`} />
        </p>
        {temp_celsius && (
          <h1 style={{ color: fontColor }} className="py-2">
            Temp: {temp_celsius}&deg;C
          </h1>
        )}

        {temp_max && temp_min && (
          <h3 className="py-2">
            <span style={{ color: fontColor }} className="py-2 pr-3">
              Min: {temp_min}&deg;C
            </span>
            <span style={{ color: fontColor }} className="py-2">
              Max: {temp_max}&deg;C
            </span>
          </h3>
        )}
        <div className="flex">
          {wind && (
            <h3 style={{ color: fontColor }} className="py-2">
              Wind speed: {wind} m/s
            </h3>
          )}
          {windWarning.storm && <h3 className="py-2 alert">Storm warning!</h3>}
          {windWarning.hurricane && (
            <h3 className="py-2 alert">Hurricane warning!</h3>
          )}
        </div>
        {humidity && (
          <h3 style={{ color: fontColor }} className="py-2">
            Humidity: {humidity}%
          </h3>
        )}
        <h3 style={{ color: fontColor }} className="py-5 description pt-5">
          {description.charAt(0).toUpperCase() + props.description.slice(1)}
        </h3>
      </div>
    </div>
  );
};

export default Weather;
