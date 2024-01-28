import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FileInput from "../../ui/FileInput";

function CreateCabinForm({ editCabin = {} }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("Cabin Created Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data) {
    console.log("data:", data);
    mutate({ ...data, image: data.image[0] });
  }
  function onError(err) {
    // console.log("error:", err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is Required" })}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
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
          {...register("image", { required: "This field is Required" })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
