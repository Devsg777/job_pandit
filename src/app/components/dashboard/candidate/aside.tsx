"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";

import LogoutModal from "../../common/popup/logout-modal";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";
import { fetchCandidate, fetchCandidates } from "@/hooks/client-request/candidate";
import calculateProfileCompletion from "@/hooks/funcs/calculateProfileComplition";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile",
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/resume",
    title: "Resume",
  },
  // {
  //   id: 4,
  //   icon: nav_4,
  //   icon_active: nav_4_active,
  //   link: "/dashboard/candidate-dashboard/messages",
  //   title: "Messages",
  // },
  // {
  //   id: 5,
  //   icon: nav_5,
  //   icon_active: nav_5_active,
  //   link: "/dashboard/candidate-dashboard/job-alert",
  //   title: "Job Alert",
  // },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },
  {
    id: 7,
    icon: nav_7,
    icon_active: nav_7_active,
    link: "/dashboard/candidate-dashboard/setting",
    title: "Account Settings",
  },
];
// props type 
type IProps = {
  isOpenSidebar: boolean,
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const CandidateAside = ({isOpenSidebar,setIsOpenSidebar}:IProps) => {
  const {user,setUser} = useUserStore();
  const [candidate,setCandidate] = useState<any>({});
  const router = useRouter();
  

  useEffect(() => {
    if(user?.id){
      fetchCandidate({candidateId:user?.id}).then((data) => setCandidate(data));
      
    } 
  },[user])
  const completionPercentage = Number(calculateProfileCompletion(candidate?.profile)).toFixed(0);
 
  const pathname = usePathname();
  return (
    <>
    <aside className={`dash-aside-navbar ${isOpenSidebar?'show':''}`}>
      <div className="position-relative">
        <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
       
          <button onClick={() => setIsOpenSidebar(false)} className="close-btn d-block d-md-none">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="user-data">
          <div className="user-avatar online position-relative rounded-circle">
            <Image src={candidate?.profile?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${candidate.profile.avatar}`:"/assets/images/candidates/01.png"} alt="avatar" className="lazy-img border" style={{height:'100%', width:'100%', objectFit:'cover'}} width={100} height={100} />
          </div>
          <div className="user-name-data">
            <button
              className="user-name dropdown-toggle text-wrap"
              type="button"
              id="profile-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              {candidate?candidate?.profile?.name: user?.first_name + " " + user?.last_name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href={`/candidate/${user?.id}`}
                >
                  <Image src={profile_icon_1} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_2} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Account Settings</span>
                </Link>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <Image src={profile_icon_3} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Notification</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            {nav_data.map((m) => {
              const isActive = pathname === m.link;
              return (
                <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                  <Link
                    href={m.link}
                    className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                  >
                    <Image
                      src={isActive ? m.icon_active : m.icon}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span>{m.title}</span>
                  </Link>
                </li>
              );
            })}
           
          </ul>
        </nav>
        {!candidate.profile &&<div className="alert alert-danger fs-14" role="alert">
                Profile is required. <a href="/dashboard/candidate-dashboard/profile" className="alert-link">Create Here</a>.
              </div>}
        <div className="profile-complete-status">
          <div className="progress-value fw-500">{completionPercentage}%</div>
          <div className="progress-line position-relative">
            <div className="inner-line" style={{ width: completionPercentage + "%"}}>
            </div>
          </div>
          {completionPercentage !== '100' ?<p>Profile Need to Complete</p> :<p>Profile Complete</p>}
        </div>

        <a href="#"
        data-bs-toggle="modal"
        data-bs-target="#logoutModal"
         className="d-flex w-100 align-items-center logout-btn cursor-pointer">
          <Image src={logout} alt="icon" className="lazy-img" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
    {/* LogoutModal star */}
    <LogoutModal />
    {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
