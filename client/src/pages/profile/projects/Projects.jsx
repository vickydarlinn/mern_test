import React, { useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { UserInfoContext } from "../../../context/userInfoContext";

const Projects = () => {
  const toast = useToast();
  const { updateUserInfo, userInfo } = useContext(UserInfoContext);

  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    soloProject: "",
    projectLink: "",
  });

  useEffect(() => {
    if (userInfo?.projects && userInfo.projects.length > 0) {
      setProjectDetails({
        name: userInfo.projects[0].name || "",
        description: userInfo.projects[0].description || "",
        soloProject: userInfo.projects[0].soloProject || true,
        projectLink: userInfo.projects[0].projectLink || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = await fetch(`/api/v1/users/addProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: projectDetails.name,
          description: projectDetails.description,
          soloProject: projectDetails.soloProject,
          projectLink: projectDetails.projectLink,
        }),
      });
      const data = await json.json();
      console.log(data);
      if (!json.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast({
        title: `Project updated successfully`,
        description: `Project updated successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      updateUserInfo((prevData) => ({
        ...prevData,
        coins: prevData.coins + 25,
      }));
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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Project name"
            value={projectDetails.name}
            name={"name"}
            required
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          />
          <span className="text-gray-400 text-xs pl-2">5 coins</span>
        </div>

        <div className="flex flex-col">
          <textarea
            // type="textarea"
            placeholder="Description"
            value={projectDetails.description}
            name={"description"}
            required
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          />
          <span className="text-gray-400 text-xs pl-2">6 coins</span>
        </div>

        <div className="flex flex-col">
          <select
            name="soloProject"
            value={projectDetails.soloProject}
            onChange={handleInputChange}
            required
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          >
            <option value="">Select Project Type</option>
            <option value={true}>Solo Project</option>
            <option value={false}>Group Project</option>
          </select>
          <span className="text-gray-400 text-xs pl-2">4 coins</span>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Project projectLink"
            value={projectDetails.projectLink}
            name={"projectLink"}
            required
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          />
          <span className="text-gray-400 text-xs pl-2">10 coins</span>
        </div>
        <button className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg">
          Save
        </button>
      </form>
    </>
  );
};

export default Projects;
