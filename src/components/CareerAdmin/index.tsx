import React, { useEffect, useState, Fragment } from "react";
import { getAllResumeList } from "../../routes/Career/server";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchResumes, selectResumes } from "../store/career/careerSlice";
import Table, { AvatarCell, DeleteResume, DownloadPDF, SelectColumnFilter, StatusPill } from "./table";

const CareerAdmin = () => {
  // const [resumesList, setResumesList] = useState([]);
  const resumesList = useAppSelector(selectResumes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResumes());
    console.log(resumesList)
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fName",
        Cell: AvatarCell,
        // imgAccessor: "imgUrl",
        lNameAccessor: "lName",
      },
      // {
      //   Header: "First Name",
      //   accessor: "fName",
      //   Cell: AvatarCell,
      //   // imgAccessor: "imgUrl",
      //   emailAccessor: "email",
      // },
      // {
      //   Header: "Last Name",
      //   accessor: "lName",
      //   // Cell: AvatarCell,
      //   // // imgAccessor: "imgUrl",
      //   // emailAccessor: "email",
      // },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Position",
        accessor: "position",
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
      {
        Header: "Resume",
        accessor: "resume",
      },
      {
        Header: "Date Applied",
        accessor: "dateUploaded",
      },
      {
        Header: "Attachment",
        accessor: "uploadedResumefileName",
        Cell: DownloadPDF,
      },
      {
        Header: "Remove Resume",
        accessor: "_id",
        Cell: DeleteResume
      }
    ],
    []
  );

  return (
    <div>
      <p className="font-bold text-5xl pb-2 text-center mt-10">Career Admin</p>
      {/* <Table columns={columns} rows={resumesList} per_page={3} table_header="Test Table" row_render ={rowcheck}/> */}
      <Table columns={columns} data={resumesList}/>
      
    </div>
  );
};

export default CareerAdmin;
