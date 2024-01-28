import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useFetchSetting } from "./useFetchSetting";
import { useUpdatedSetting } from "./useUpdatedSetting";
function UpdateSettingsForm() {
  const { isFetching, settings } = useFetchSetting();
  console.log("Setting:", settings);
  const { isUpdating, updateSetting } = useUpdatedSetting();
  const {
    maxBookingLength,
    maxGuestsPerBooking,
    miniBookingLength,
    breakfastPrice,
  } = settings ? settings : {};

  function handelUpdateSetting(e, field) {
    const { value } = e.target;
    console.log(value, field);
    updateSetting({ [field]: value });
  }

  if (isFetching) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={miniBookingLength}
          onBlur={(e) => handelUpdateSetting(e, "miniBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handelUpdateSetting(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handelUpdateSetting(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handelUpdateSetting(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
