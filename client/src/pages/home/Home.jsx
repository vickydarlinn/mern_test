import React from "react";
import { internshipData } from "../../utils/data";
import JobCard from "../../components/jobCard/JobCard";

const Home = () => {
  const internshipJsx = internshipData.map((data, i) => {
    return <JobCard key={i} data={data} />;
  });

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
