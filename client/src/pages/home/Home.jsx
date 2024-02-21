import React from "react";
import { internshipData } from "../../utils/data";
import JobCard from "../../components/jobCard/JobCard";

const Home = () => {
  const internshipJsx = internshipData.map((data, i) => {
    return <JobCard key={i} data={data} />;
  });
  // this handler will be called when user clicks on apply button
  const handleApplyTOJob = async (id) => {
    const json = await fetch(`/api/v1/jobs/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ jobId: id }),
    });
    const data = await json.json();
    console.log(data);
    if (data.success) {
      alert("Applied to job successfully");
    } else {
      alert("Failed to apply to job");
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      {/* only show this when user is logged in */}
      <h2 className="text-3xl">Hey, Bhanu!👋</h2>

      <h3 className="text-xl my-10">Explore Internships now</h3>
      <main className="w-1/2 flex flex-col gap-5">{internshipJsx}</main>
    </div>
  );
};

export default Home;
