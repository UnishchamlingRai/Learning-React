import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModel }) {
  const { id: editCabinId, ...editValue } = cabinToEdit;
  const isEditComponent = Boolean(editCabinId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditComponent ? editValue : {},
  });
  const { errors } = formState;

  //for creating Cabin
  const { isCreating, createNewCabin } = useCreateCabin();
  //for editing Cabin
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log("data:", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    //for edit Cabin
    if (isEditComponent) {
      editCabin(
        { newCabin: { ...data, image }, id: editCabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    } else {
      //for create cabin
      createNewCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            console.log("data from:", data);
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  }
  function onError(err) {
    // console.log("error:", err);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModel ? "model" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is Required" })}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is Required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="RegularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is Required",
            min: {
              value: 1,
              message: "Regular Price should be greater than 1",
            },
          })}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is Required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than Regular Price",
          })}
        />
      </FormRow>
      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue={""}
          {...register("description", { required: "This field is Required" })}
        />
      </FormRow>
      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditComponent ? false : "This field is Required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditComponent ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
