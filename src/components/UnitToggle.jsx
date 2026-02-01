import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../app/settingsSlice";

export default function UnitToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);

  return (
    <button className="unit-toggle-btn" onClick={() => dispatch(toggleUnit())}>
      {unit === "metric" ? "°C" : "°F"} 
      {/* Shortened the text to be cleaner */}
    </button>
  );
}