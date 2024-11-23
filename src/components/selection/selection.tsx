import { items } from "../../../public/countries.json";
import styles from "./selection.module.css";

export default function CountrySelection({}: {}) {
  return (
    <select name="nationality" id="nationality" className={styles.rounded}>
      <option value="select">Select a Country</option>
      {items.countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
