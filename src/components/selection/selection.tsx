import { items } from "../../../public/countries.json";
import styles from "./selection.module.css";

export default function CountrySelection(probs: any) {
  return (
    <select name="nationality" id="nationality" className={probs.className}>
      <option value="select">Select a Country</option>
      {items.countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
