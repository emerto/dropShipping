import { useForm } from "react-hook-form";

type Props = {};

const CreateStore = (props: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-base-content">
        Create Your Store
      </h1>
      <form className="flex flex-col w-full bg-base-300 rounded-xl mt-5 p-5"></form>
    </>
  );
};

export default CreateStore;
