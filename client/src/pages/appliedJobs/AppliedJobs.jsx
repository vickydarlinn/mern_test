import React, { useEffect, useState } from "react";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  console.log(appliedJobs);
  const fetchAppliedJobs = async () => {
    const json = await fetch(`/api/v1/jobs/applied`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await json.json();
    setAppliedJobs(data.appliedJobs);
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return <div>AppliedJobs</div>;
};

export default AppliedJobs;
