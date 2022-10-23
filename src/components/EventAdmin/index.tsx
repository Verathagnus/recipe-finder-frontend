import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchEvents, selectEvents } from "../store/event/eventSlice";
import EventForm from "./EventUploadForm";
import Table, {
  AvatarCell,
  DateCell,
  DeleteEvent,
  DownloadPDFEvent,
  SelectColumnFilter,
  SelectDateFilter,
  StatusPill,
} from "./table";

const EventAdmin = () => {
  // const [eventsList, setEventsList] = useState([]);
  const eventsList = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();
  const latestEvents = [
    {
      title: "Event 1",
      date: "04/02/2022",
      summary: "First event to be going to be held on 4 feb 2022",
      description: "ipsum",
      attachmentFlag: true,
      attachmentfileName: "link1",
    },
    {
      title: "Event 2",
      date: "06/02/2022",
      summary: "First event to be going to be held on 6 feb 2022",
      description: "ipsum",
      attachmentFlag: false,
      attachmentfileName: "",
    },
    {
      title: "Event 2",
      date: "07/03/2022",
      summary: "First event to be going to be held on 7 March 2022",
      description: "ipsum",
      attachmentFlag: true,
      attachmentfileName: "link3",
    },
  ];
  useEffect(() => {
    dispatch(fetchEvents()).then(() => console.log(eventsList));
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: DateCell,
        Filter: SelectDateFilter, // new
        filter: "includes",
      },
      {
        Header: "Summary",
        accessor: "summary",
      },
      {
        Header: "Attachment",
        accessor: "attachmentfileName",
        Cell: DownloadPDFEvent,
        flagAccessor: "attachmentFlag",
      },
      {
        Header: "Remove Event",
        accessor: "_id",
        Cell: DeleteEvent,
      },
      {
        Header: "Description",
        accessor: "description",
      },
      
    ],
    []
  );
  {
    /* 



      


          
      */
  }
  return (
    <>
      <div id="event" className="w-full">
        <div className="max-w-[1180px] mx-auto relative">
          <div className="justify-center items-center px-4">
            <h2 className="font-bold text-5xl pb-2 text-center mt-10">
              Event Admin
            </h2>
            <button
              type="button"
              className="px-4 mt-10 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              data-mdb-ripple="true"
              data-bs-toggle="modal"
              data-bs-target="#eventModal"
            >
              <PlusIcon className="h-6 w-6" />
              <p>Add Event</p>
            </button>
          </div>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="eventModal"
            aria-labelledby="eventModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="eventModalLabel"
                  >
                    Upload Event
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <EventForm />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Table columns={columns} data={eventsList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventAdmin;
