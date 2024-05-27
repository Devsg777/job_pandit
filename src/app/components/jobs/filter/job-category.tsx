import React, { useState } from "react";
import job_data from "@/data/job-data";
import useFilterStore from "@/lib/store/filter";


const JobCategory = () => {
  const uniqueCategories = [
    ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const [isShowMore, setIsShowMore] = useState(false);
  const { category,setCategory } = useFilterStore((state) => state);


  const visibleCategories = isShowMore
    ? uniqueCategories
    : uniqueCategories.slice(0, 5);

  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        {visibleCategories.map((c, i) => (
          <li key={i}>
            <input
              onChange={() => setCategory(c)}
              type="checkbox"
              name={c}
              defaultValue={c}
              checked={category.includes(c)}
            />
            <label>
              {c}{" "}
              <span>
                {job_data.filter((job) => job.category.includes(c)).length}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsShowMore((prevState) => !prevState)}
        className="more-btn"
      >
        <i className="bi bi-dash"></i> Show {isShowMore ? "Less" : "More"}
      </div>
    </div>
  );
};

export default JobCategory;
