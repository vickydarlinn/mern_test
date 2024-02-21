import React, { useState } from "react";
import InputComponent from "../../../components/InputElement/InputComponent";
import { useToast } from "@chakra-ui/react";

const PersonalDetails = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    mobile: "",
    linkedIn: "",
    github: "",
    profilePic: "",
    resume: "",
  });

  const handleInputChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateUserInfo = async (field, value) => {
    setIsLoading(true);
    // Update user info in the database
    try {
      const json = await fetch(`/api/v1/users/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ field, value }),
      });
      const data = await json.json();
      console.log(data);
      if (!json.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast({
        title: `${field} updated successfully`,
        description: `${field} updated successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <main>
      <div className="flex gap-10 items-center my-6">
        <div className="flex flex-col">
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="profilePic"
            className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
          >
            Choose profile pic
          </label>
          <span className="text-gray-400 text-xs pl-2">5 coins</span>
        </div>

        <div className="flex flex-col">
          <input type="file" id="profilePic" className="hidden" />
          <label
            htmlFor="profilePic"
            className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
          >
            Choose resume
          </label>
          <span className="text-gray-400 text-xs pl-2">5 coins</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <InputComponent
          type="text"
          placeholder="Full Name"
          coins={1}
          value={personalDetails.name}
          name={"name"}
          handler={handleInputChange}
          onSave={() => handleUpdateUserInfo("name", personalDetails.name)}
        />
        <InputComponent
          type="number"
          name={"mobile"}
          placeholder="Mobile"
          coins={15}
          value={personalDetails.mobile}
          handler={handleInputChange}
          onSave={() => handleUpdateUserInfo("mobile", personalDetails.mobile)}
        />
        <InputComponent
          type="text"
          name={"linkedIn"}
          placeholder="LinkedIn link"
          coins={3}
          value={personalDetails.linkedIn}
          handler={handleInputChange}
          onSave={() =>
            handleUpdateUserInfo("linkedIn", personalDetails.linkedIn)
          }
        />
        <InputComponent
          type="text"
          name={"github"}
          placeholder="Github link"
          coins={5}
          value={personalDetails.github}
          handler={handleInputChange}
          onSave={() => handleUpdateUserInfo("github", personalDetails.github)}
        />
      </div>
    </main>
  );
};

export default PersonalDetails;
