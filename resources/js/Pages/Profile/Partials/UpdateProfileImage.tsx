import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import { PageProps } from "@/types";

export default function UpdateProfileImage({
   className = "",
}: {
   className?: string;
}) {
   const user = usePage<PageProps>().props.auth.user;

   const { data, setData, post, errors, processing, recentlySuccessful } =
      useForm({
         image: "",
      });

   const [preview, setPreview] = useState<string | null>(null);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: any = e.target.files && e.target.files[0];

      if (file) {
         setData("image", file);
         const reader = new FileReader();
         reader.onload = () => {
            if (typeof reader.result === "string") {
               setPreview(reader.result);
            }
         };
         reader.readAsDataURL(file);
      }
   };

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route("profile.image.update"), {
         onSuccess: () => {
            console.log("Profile image updated successfully");
         },
         onError: () => {
            console.log("Error updating profile image");
         },
      });
   };

   return (
      <section className={className}>
         <header>
            <h2 className="text-lg font-medium text-gray-900">
               Profile picture
            </h2>

            <p className="mt-1 text-sm text-gray-600">
               Update your account's profile picture
            </p>
         </header>

         <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
            encType="multipart/form-data"
         >
            <div>
               <img
                  src={
                     user.image
                        ? `/storage/${user.image}`
                        : "/default-profile.png"
                  }
                  alt="Profile Image"
                  className="w-32 h-32 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-300"
               />
               <div className="my-3">
                  <input
                     id="fileInput"
                     type="file"
                     className="hidden"
                     onChange={handleImageChange}
                  />

                  <label
                     htmlFor="fileInput"
                     className="cursor-pointer px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
                  >
                     Choose File
                  </label>
               </div>

               <div className="flex items-center gap-4">
                  <PrimaryButton disabled={processing}>Save</PrimaryButton>

                  <Transition
                     show={recentlySuccessful}
                     enter="transition ease-in-out"
                     enterFrom="opacity-0"
                     leave="transition ease-in-out"
                     leaveTo="opacity-0"
                  >
                     <p className="text-sm text-gray-600">Saved.</p>
                  </Transition>
               </div>

               <InputError className="mt-2" message={errors.image} />
            </div>
         </form>
      </section>
   );
}
