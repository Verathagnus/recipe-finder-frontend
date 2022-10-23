import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/store";
import {
  fetchEvents,
  selectEvents,
} from "../../components/store/event/eventSlice";
interface EventGetType {
  title: string;
  date: string;
  summary: string;
  description: string;
  attachmentFlag: boolean;
  attachmentfileName: string;
}
declare global {
  interface Window {
      cloudinary: any;
  }
}
const Events = () => {
  const eventsList = useAppSelector(selectEvents);
  const [currentEvent, setEvent] = useState({
    title: "",
    date: new Date(),
    summary: "",
    description: "",
    attachmentFlag: false,
    attachmentfileName: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  const latestEvents = [
    {
      title: "Event 1",
      date: "04/02/2022",
      summary: "First event to be going to be held on 4 feb 2022",
      description: "",
      attachmentFlag: true,
      attachmentfileName: "link1",
    },
    {
      title: "Event 2",
      date: "06/02/2022",
      summary: "First event to be going to be held on 6 feb 2022",
      description: "",
      attachmentFlag: false,
      attachmentfileName: "",
    },
    {
      title: "Event 2",
      date: "07/03/2022",
      summary: "First event to be going to be held on 7 March 2022",
      description: "",
      attachmentFlag: true,
      attachmentfileName: "link3",
    },
  ];
  return (
    <>
      <div id="events" className="flex flex-col items-center ">
        <h3 className="text-5xl md:text-6xl text-black-700 font-bold mb-6">
          Events
        </h3>

        <ol className="border-l-2 border-purple-600">
          {eventsList.map((event) => (
            <li>
              <div className="md:flex flex-start">
                <div className="bg-purple-600 w-10 h-10 flex items-center justify-center rounded-full -ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="text-white w-3 h-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10 min-w-[270px]">
                  <div className="flex justify-between mb-4">
                    <a
                      href="#!"
                      className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                    >
                      {event.title}
                    </a>
                    <a
                      href="#!"
                      className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                    >
                      {new Date(event.date).toLocaleDateString()}
                    </a>
                  </div>
                  <p className="text-gray-700 mb-6">{event.summary}</p>
                  <button
                    type="button"
                    className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-bs-toggle="modal"
                    data-bs-target="#eventModalCenter"
                    onClick={() => setEvent(event)}
                  >
                    READ MORE
                  </button>
                  {event.attachmentFlag && (
                    <a
                      href={event.attachmentfileName}
                      type="button"
                      className="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-2"
                      data-mdb-ripple="true"
                    >
                      Attachment
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div
        className="modal fade fixed top-0 right-0 md:right-10  hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="eventModalCenter"
        aria-labelledby="eventModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-screen pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h3 className="text-xl font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800">
                {currentEvent.title}
              </h3>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body md:w-[600px] relative p-4">
              <p>
                <span className="text-purple-600 hover:text-purple-700 focus:text-purple-800">
                  Summary:
                </span>
                <span>{currentEvent.summary}</span>
              </p>
              <p>
                <span className="text-purple-600 hover:text-purple-700 focus:text-purple-800">
                  Date:
                </span>
                <span>{new Date(currentEvent.date).toLocaleDateString()}</span>
              </p>
              {currentEvent.description && (
                <p>
                  <span className="text-purple-600 hover:text-purple-700 focus:text-purple-800">
                    Description:
                  </span>
                  <span>{currentEvent.description}</span>
                </p>
              )}

              {/* <img
                className="w-full h-full"
                src={`${
                  import.meta.env.VITE_SERVERURL
                }/api/images/get-image-by-name/${currentEvent}`}
              /> */}
              <div className="py-6 px-6 lg:px-8"></div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-start p-4 border-t border-gray-200 rounded-b-md">
              {currentEvent.attachmentFlag && (
                <a
                  href={currentEvent.attachmentfileName}
                  type="button"
                  className="px-6
                  py-2.5
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                  ml-1"
                  data-mdb-ripple="true"
                >
                  Attachment
                </a>
              )}
              <button
                type="button"
                className="px-6
                py-2.5
                bg-purple-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-purple-700 hover:shadow-lg
                focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-purple-800 active:shadow-lg
                transition
                duration-150
                ease-in-out ml-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
