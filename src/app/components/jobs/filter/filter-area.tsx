"use client"
import React from 'react';
import JobLocations from './job-locations';
import JobType from './job-type';
import JobExperience from './job-experience';
import JobCategory from './job-category';
import JobTags from './job-tags';
import JobPrices from './job-prices';
import useFilterStore from '@/lib/store/filter';


// prop type 
type IProps = {
  priceValue: number[]
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice:number;
  job_data:any[];
}
const FilterArea = ({priceValue,setPriceValue,maxPrice,job_data}:IProps) => {
  const {resetFilter} = useFilterStore((state) => state)
  // handleReset
  const handleReset = () => {
    resetFilter()
    setPriceValue([0,maxPrice])
}
  return (
    <div className="filter-area-tab offcanvas offcanvas-start" id="filteroffcanvas">
      <button type="button" className="btn-close text-reset d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <div className="main-title fw-500 text-dark">Filter By</div>
      <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
        <div className="filter-block bottom-line pb-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseLocation" role="button" aria-expanded="false">Location</a>
          <div className="collapse show" id="collapseLocation">
            <div className="main-body">
              <JobLocations job_data={job_data}/>
            </div>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseJobType" role="button" aria-expanded="false">Job Type</a>
          <div className="collapse show" id="collapseJobType">
            <JobType job_data={job_data}/>
          </div> 
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseExp" role="button" aria-expanded="false">Experience</a>
          <div className="collapse show" id="collapseExp">
            <JobExperience job_data={job_data}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseSalary" role="button" aria-expanded="false">Salary</a>
          <div className="collapse show" id="collapseSalary">
            <JobPrices priceValue={priceValue} setPriceValue={setPriceValue} maxPrice={maxPrice}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark collapsed" data-bs-toggle="collapse" href="#collapseCategory" role="button" aria-expanded="false">Category</a>
          <div className="collapse" id="collapseCategory">
            <JobCategory job_data={job_data}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark collapsed" data-bs-toggle="collapse" href="#collapseTag" role="button" aria-expanded="false">Skill</a>
          <div className="collapse" id="collapseTag">
            <JobTags  job_data={job_data}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}

        <button onClick={handleReset} className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30">Reset Filter</button>
      </div>
    </div>
  );
};

export default FilterArea;