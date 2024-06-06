import React from "react";

const WorkExperience = ({experience}:any) => {
  
  return (
    <div className="time-line-data position-relative pt-15">
      {experience?.map((item:any, index:any) => (
        <div className="info position-relative" key={index}>
        <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
          {index + 1}
        </div>
        <div className="text_1 fw-500">{item.from} - {item.to}</div>
        <h4>{item.title}({item.company})</h4>
        <p>
          {item.description}
        </p>
      </div>
      ))

      }
     
    </div>
  );
};

export default WorkExperience;
