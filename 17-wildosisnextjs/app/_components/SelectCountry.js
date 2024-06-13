

// Let's imagine your colleague already built this component 😃

import { getCountries } from "../_lib/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const flag =countries?.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%s${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries?.map((c) => (
        <option key={c.name} value={`${c.name}%s${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
