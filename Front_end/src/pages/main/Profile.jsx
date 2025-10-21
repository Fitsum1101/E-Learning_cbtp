import React from "react";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import Profile from "../../components/common/Avater/Profile";
import { Link } from "react-router-dom";

const UpdateProifle = () => {
  return (
    <div className="p-8 mt-10 bg-white shadow rounded-xl shadow-gray-200">
      <div>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="bg-[#F7FAFC] cursor-pointer w-[200px]  rounded-4xl  flex flex-col justify-center items-center flex-1/3 h-[23vh]">
              <Profile size={80} seed={"Chase"} className="p-1 " />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-gray-700 capitalize">
                fitsum kifle
              </h1>
              <p>@CoolNinja8762</p>
              <Link
                className="italic text-gray-500 hover:underline"
                to={"https://www.w3profile.com/CoolNinja8762/"}
              >
                https://www.w3profile.com/CoolNinja8762/
              </Link>
            </div>
          </div>
          <div>
            <Button
              className="cursor-not-allowed px-6 border border-gray-500 bg-[#e7e7e7]"
              disabled
            >
              Save changes
            </Button>
          </div>
        </div>
        <hr className="block my-10 text-gray-300" />
        <div>
          <h3 className="py-5 text-lg font-semibold">Account information</h3>
          <div className="flex flex-col">
            <div className="flex gap-5 ">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                required
                className="mt-1 block w-[500px]  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="first name"
                label={"first name"}
              />
              <Input
                type="text"
                name="last-name"
                id="last-name"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="last name"
                label={"last name"}
              />
            </div>
            <p className="mb-5 -mt-2 text-sm text-gray-500">
              The name you enter here will appear on your certificates.
            </p>
            certificate
          </div>
          <div>
            <div className="flex gap-5">
              <Input
                type="username"
                name="username"
                id="username"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="username"
                label={"username"}
              />
              <Input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="email"
                label={"email"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProifle;
