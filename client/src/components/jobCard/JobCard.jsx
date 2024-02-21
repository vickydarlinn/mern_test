import React from "react";
import noLogo from "../../assets/no-logo.svg";
import { TbCashBanknote } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";

const JobCard = ({ data }) => {
  return (
    <main className="border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-2xl font-medium">
            {data.refInternshipTitle.name}
          </span>
          <span className="text-sm text-gray-300">
            {data.refUser.refCompanyProfile.companyName}
          </span>
        </div>

        <div className="rounded-full w-10 overflow-hidden">
          {data.refUser.refCompanyProfile.logoUrl ? (
            <img
              src={data.refUser.refCompanyProfile.logoUrl}
              alt="company logo"
            />
          ) : (
            <img src={noLogo} alt="" />
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <div>
          <span className="flex items-center gap-2 text-gray-400 text-sm">
            <TbCashBanknote />
            <p>STIPEND</p>
          </span>
          <span>
            ₹{data.stipendRange[0]} - {data.stipendRange[1]}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2 text-gray-400 text-sm">
            <GrUserExpert />
            <p>EXPERIENCE</p>
          </span>
          <span>1-2 years</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-buttonBg text-primary font-medium px-8 py-2 rounded-xl">
          Apply now
        </button>
      </div>
    </main>
  );
};

export default JobCard;
