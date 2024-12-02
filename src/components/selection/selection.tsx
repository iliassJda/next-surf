import { items } from "../../../public/countries.json";
import styles from "./selection.module.css";

interface InputProps {
    onChange?: (e) => void
}


export default function CountrySelection(probs: any) {
  return (
    <select name="nationality" id="nationality" className={probs.className} value={probs.value} onChange={(e) => {}}>
      <option value="select" disabled>Select a Country</option>
      {items.countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
