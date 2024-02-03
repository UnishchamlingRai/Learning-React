import supabase, { supabaseUrl } from "./supabase";
// https://sjfrrvwmnwlogoxbuvue.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-01-27T12%3A05%3A50.909Z
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Failed to load Cains");
  }
  return data;
}

export async function createAndEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1)create cabin
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //for edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    if (!id) {
      throw new Error("Failed to Create Cabin");
    }
    if (id) {
      throw new Error("Failed to edit Cabin");
    }
  }
  //2) Upload
  if (hasImagePath) return data; //no need to store or upload a image if hasImage path just return data
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3) deleting the cabin if there was a error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      " Cabin image could not be uploaded and cabin is not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Failed to delete Cabin");
  }

  return data;
}
