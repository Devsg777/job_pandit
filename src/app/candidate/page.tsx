import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header-7';
import Wrapper from '@/layouts/wrapper';
import JobListThree from '../components/jobs/list/job-list-three';
import JobPortalIntro from '../components/job-portal-intro/job-portal-intro';
import FooterOne from '@/layouts/footers/footer-one';
import { fetchCandidates } from '@/hooks/server-request/candidate';
import CandidateV1Area from '../components/candidate/candidate-v1-area';

export const metadata: Metadata = {
  title: "Job List v1",
};


const JobListOnePage = async() => {
  const candidates_data = await fetchCandidates();

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <div className='mt-30'></div>
        {/* search breadcrumb end */}
        
        {/* job list three start */}
        {/* <JobListThree itemsPerPage={8} job_data={job_data || []} /> */}
        <CandidateV1Area candidates_data={candidates_data || []}/>
        {/* job list three end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobListOnePage;