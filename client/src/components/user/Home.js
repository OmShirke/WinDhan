import React, { useState } from "react";
import Events from "./Events.js";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const user = props.user;
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [eventDetail, setEventDetail] = useState(null);
  return (
    <>
      <div className="sticky top-0 bg-slate-100 rounded-sm w-full shadow-lg p-5 flex  justify-between z-20">
        <div className=" text-center text-xl   text-blue-500 font-bold  font-[cursive]  ">
          TradeRay
        </div>

        <div className="flex gap-9 text-md text-blue-700">
          {user ? (
            <>
              <div>{user}</div>
              <Link to="/profile">Profile</Link> {/* Add Profile Button */}
              <div onClick={logout} className="cursor-pointer">
                Logout
              </div>
            </>
          ) : (
            <>
              <Link to="Login">Login</Link>
              <Link to="Signup">Signup</Link>
            </>
          )}
        </div>
      </div>
      <main
        className={`text-center p-5 flex flex-col gap-10 text-lg z-0    ${
          eventDetail !== null ? "hidden " : ""
        } `}
      >
        <span className=" text-lg font-medium ">
          <span className="text-3xl font-serif">" </span>
          Trade Your Opinions, Profit from Predictions.
          <span className="text-3xl font-serif"> "</span>
        </span>
        <div>
          At Traderay, we empower you to turn insights into opportunities. Bet
          on your beliefs and watch as the market turns your predictions into
          profits.
        </div>
        <div className="w-full  flex justify-center">
          <svg
            viewBox="0 0 100 100"
            className=" w-[300px] bg-slate-50 shadow-md  rounded-3xl"
          >
            <path
              fill="#c7ede6"
              d="M87.215,56.71C88.35,54.555,89,52.105,89,49.5c0-6.621-4.159-12.257-10.001-14.478	C78.999,35.015,79,35.008,79,35c0-11.598-9.402-21-21-21c-9.784,0-17.981,6.701-20.313,15.757C36.211,29.272,34.638,29,33,29	c-7.692,0-14.023,5.793-14.89,13.252C12.906,43.353,9,47.969,9,53.5C9,59.851,14.149,65,20.5,65c0.177,0,0.352-0.012,0.526-0.022	C21.022,65.153,21,65.324,21,65.5C21,76.822,30.178,86,41.5,86c6.437,0,12.175-2.972,15.934-7.614C59.612,80.611,62.64,82,66,82	c4.65,0,8.674-2.65,10.666-6.518C77.718,75.817,78.837,76,80,76c6.075,0,11-4.925,11-11C91,61.689,89.53,58.727,87.215,56.71z"
            />
            <path
              fill="#fdfcef"
              d="M79.875,60.5c0,0,3.64,0,6.125,0s4.5-2.015,4.5-4.5c0-2.333-1.782-4.229-4.055-4.455 C86.467,51.364,86.5,51.187,86.5,51c0-2.485-2.015-4.5-4.5-4.5c-1.438,0-2.703,0.686-3.527,1.736 C78.333,45.6,76.171,43.5,73.5,43.5c-2.761,0-5,2.239-5,5c0,0.446,0.077,0.87,0.187,1.282C68.045,49.005,67.086,48.5,66,48.5 c-1.781,0-3.234,1.335-3.455,3.055C62.364,51.533,62.187,51.5,62,51.5c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s9.5,0,9.5,0 h5.375V61h3V60.5z"
            />
            <path
              fill="#472b29"
              d="M73.5,43c-3.033,0-5.5,2.467-5.5,5.5c0,0.016,0,0.031,0,0.047C67.398,48.192,66.71,48,66,48 c-1.831,0-3.411,1.261-3.858,3.005C62.095,51.002,62.048,51,62,51c-2.757,0-5,2.243-5,5s2.243,5,5,5h14.875 c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H62c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.117,0,0.23,0.017,0.343,0.032l0.141,0.019 c0.021,0.003,0.041,0.004,0.062,0.004c0.246,0,0.462-0.185,0.495-0.437C63.232,50.125,64.504,49,66,49 c0.885,0,1.723,0.401,2.301,1.1c0.098,0.118,0.241,0.182,0.386,0.182c0.078,0,0.156-0.018,0.228-0.056 c0.209-0.107,0.314-0.346,0.254-0.573C69.054,49.218,69,48.852,69,48.5c0-2.481,2.019-4.5,4.5-4.5c2.381,0,4.347,1.872,4.474,4.263 c0.011,0.208,0.15,0.387,0.349,0.45c0.05,0.016,0.101,0.024,0.152,0.024c0.15,0,0.296-0.069,0.392-0.192 C79.638,47.563,80.779,47,82,47c2.206,0,4,1.794,4,4c0,0.117-0.017,0.23-0.032,0.343l-0.019,0.141 c-0.016,0.134,0.022,0.268,0.106,0.373c0.084,0.105,0.207,0.172,0.34,0.185C88.451,52.247,90,53.949,90,56c0,2.206-1.794,4-4,4 h-6.125c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H86c2.757,0,5-2.243,5-5c0-2.397-1.689-4.413-4.003-4.877 C86.999,51.082,87,51.041,87,51c0-2.757-2.243-5-5-5c-1.176,0-2.293,0.416-3.183,1.164C78.219,44.76,76.055,43,73.5,43L73.5,43z"
            />
            <path
              fill="#472b29"
              d="M72,50c-1.403,0-2.609,0.999-2.913,2.341C68.72,52.119,68.301,52,67.875,52 c-1.202,0-2.198,0.897-2.353,2.068C65.319,54.022,65.126,54,64.938,54c-1.529,0-2.811,1.2-2.918,2.732 C62.01,56.87,62.114,56.99,62.251,57c0.006,0,0.012,0,0.018,0c0.13,0,0.24-0.101,0.249-0.232c0.089-1.271,1.151-2.268,2.419-2.268 c0.229,0,0.47,0.042,0.738,0.127c0.022,0.007,0.045,0.01,0.067,0.01c0.055,0,0.11-0.02,0.156-0.054 C65.962,54.537,66,54.455,66,54.375c0-1.034,0.841-1.875,1.875-1.875c0.447,0,0.885,0.168,1.231,0.473 c0.047,0.041,0.106,0.063,0.165,0.063c0.032,0,0.063-0.006,0.093-0.019c0.088-0.035,0.148-0.117,0.155-0.212 C69.623,51.512,70.712,50.5,72,50.5c0.208,0,0.425,0.034,0.682,0.107c0.023,0.007,0.047,0.01,0.07,0.01 c0.109,0,0.207-0.073,0.239-0.182c0.038-0.133-0.039-0.271-0.172-0.309C72.517,50.04,72.256,50,72,50L72,50z"
            />
            <path
              fill="#472b29"
              d="M85.883,51.5c-1.326,0-2.508,0.897-2.874,2.182c-0.038,0.133,0.039,0.271,0.172,0.309 C83.205,53.997,83.228,54,83.25,54c0.109,0,0.209-0.072,0.24-0.182C83.795,52.748,84.779,52,85.883,52 c0.117,0,0.23,0.014,0.342,0.029c0.012,0.002,0.023,0.003,0.035,0.003c0.121,0,0.229-0.092,0.246-0.217 c0.019-0.137-0.077-0.263-0.214-0.281C86.158,51.516,86.022,51.5,85.883,51.5L85.883,51.5z"
            />
            <path
              fill="#fff"
              d="M15.405,51H5.5C5.224,51,5,50.776,5,50.5S5.224,50,5.5,50h9.905c0.276,0,0.5,0.224,0.5,0.5 S15.682,51,15.405,51z"
            />
            <path
              fill="#fff"
              d="M18.5,51h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S18.777,51,18.5,51z"
            />
            <path
              fill="#fff"
              d="M23.491,53H14.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.991c0.276,0,0.5,0.224,0.5,0.5 S23.767,53,23.491,53z"
            />
            <path
              fill="#fff"
              d="M12.5,53h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S12.777,53,12.5,53z"
            />
            <path
              fill="#fff"
              d="M9.5,53h-2C7.224,53,7,52.776,7,52.5S7.224,52,7.5,52h2c0.276,0,0.5,0.224,0.5,0.5S9.777,53,9.5,53z"
            />
            <path
              fill="#fff"
              d="M15.5,55h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S15.776,55,15.5,55z"
            />
            <path
              fill="#fff"
              d="M18.5,46c-0.177,0-0.823,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,0.823,0,1,0c0.276,0,0.5-0.224,0.5-0.5C19,46.224,18.776,46,18.5,46z"
            />
            <path
              fill="#fff"
              d="M18.5,48c-0.177,0-4.823,0-5,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,4.823,0,5,0c0.276,0,0.5-0.224,0.5-0.5C19,48.224,18.776,48,18.5,48z"
            />
            <path
              fill="#fff"
              d="M23.5,50c-0.177,0-2.823,0-3,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,2.823,0,3,0c0.276,0,0.5-0.224,0.5-0.5C24,50.224,23.776,50,23.5,50z"
            />
            <path
              fill="#fff"
              d="M72.5,24h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S72.776,24,72.5,24z"
            />
            <path
              fill="#fff"
              d="M76.5,24h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S76.776,24,76.5,24z"
            />
            <path
              fill="#fff"
              d="M81.5,26h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S81.777,26,81.5,26z"
            />
            <path
              fill="#fff"
              d="M69.5,26h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S69.776,26,69.5,26z"
            />
            <path
              fill="#fff"
              d="M66.375,26H64.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.875c0.276,0,0.5,0.224,0.5,0.5 S66.651,26,66.375,26z"
            />
            <path
              fill="#fff"
              d="M75.5,22h-5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5c0.276,0,0.5,0.224,0.5,0.5 S75.777,22,75.5,22z"
            />
            <path
              fill="#fff"
              d="M72.5,28h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S72.776,28,72.5,28z"
            />
            <path
              fill="#7e96af"
              d="M37.631,71.323c-4.479,0-8.123-3.644-8.123-8.123V36.8c0-4.479,3.644-8.123,8.123-8.123h26.4	c4.479,0,8.123,3.644,8.123,8.123v26.4c0,4.479-3.644,8.123-8.123,8.123H37.631z"
            />
            <polygon
              fill="#cfd7e2"
              points="72.492,43.231 69.108,45.938 66.4,51.426 63.692,46.615 60.985,48.646 58.862,43.871 58.277,43.986 57.793,43.906 55.611,50 53.557,50.721 50.831,54.738 48.123,53.385 45.415,46.615 42.708,51.985 40,50.677 37.292,54.062 35.262,54.826 32.554,53.385 29.846,52.708 29.565,63.622 31.002,68.106 34.386,70.646 37.198,71.323 65.297,71.255 68.583,70.159 71.477,66.634 72.177,62.561"
            />
            <g>
              <path
                fill="#472b29"
                d="M66.4,51.955c-0.18,0-0.347-0.097-0.436-0.255l-2.428-4.313l-2.252,1.688 c-0.122,0.091-0.278,0.125-0.426,0.083c-0.147-0.038-0.269-0.142-0.331-0.28l-2.142-4.818c-0.112-0.252,0.001-0.548,0.254-0.66 c0.252-0.11,0.548,0.002,0.66,0.254l1.887,4.245l2.206-1.654c0.115-0.086,0.263-0.116,0.403-0.089 c0.141,0.029,0.262,0.118,0.333,0.244l2.243,3.984l2.289-4.638c0.032-0.065,0.079-0.123,0.136-0.169l3.384-2.708 c0.216-0.172,0.53-0.136,0.703,0.078c0.172,0.216,0.137,0.53-0.078,0.703l-3.297,2.639l-2.659,5.388 c-0.082,0.166-0.25,0.273-0.435,0.278C66.409,51.955,66.404,51.955,66.4,51.955z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M35.262,55.326c-0.081,0-0.162-0.02-0.235-0.059l-2.654-1.413l-2.648-0.661 c-0.268-0.067-0.431-0.339-0.364-0.606c0.066-0.269,0.338-0.432,0.606-0.364l2.708,0.677c0.04,0.01,0.078,0.024,0.114,0.044 l2.508,1.335l1.691-0.637l2.622-3.277c0.146-0.184,0.398-0.237,0.608-0.138l2.265,1.095l2.487-4.932 c0.088-0.176,0.264-0.284,0.468-0.274c0.197,0.009,0.37,0.132,0.443,0.314l2.637,6.593l2.146,1.073l2.481-3.656 c0.06-0.088,0.147-0.155,0.248-0.19l1.829-0.642l2.102-5.87c0.093-0.26,0.38-0.394,0.639-0.302c0.26,0.093,0.396,0.379,0.302,0.64 l-2.182,6.094c-0.051,0.142-0.163,0.253-0.305,0.303l-1.898,0.666l-2.635,3.882c-0.141,0.206-0.414,0.279-0.637,0.166l-2.708-1.354 c-0.109-0.055-0.195-0.147-0.241-0.262l-2.296-5.74l-2.209,4.381c-0.123,0.243-0.417,0.345-0.664,0.225l-2.348-1.135l-2.458,3.073 c-0.056,0.07-0.13,0.124-0.214,0.155l-2.031,0.765C35.381,55.315,35.321,55.326,35.262,55.326z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M34.75,71.234c-0.138,0-0.25-0.112-0.25-0.25V43.907c0-0.138,0.112-0.25,0.25-0.25 S35,43.77,35,43.907v27.077C35,71.122,34.888,71.234,34.75,71.234z"
              />
              <path
                fill="#472b29"
                d="M34.75,40.773c-0.138,0-0.25-0.112-0.25-0.25v-2.708c0-0.138,0.112-0.25,0.25-0.25 S35,37.678,35,37.815v2.708C35,40.661,34.888,40.773,34.75,40.773z"
              />
              <path
                fill="#472b29"
                d="M34.75,36.034c-0.138,0-0.25-0.112-0.25-0.25v-6.769c0-0.138,0.112-0.25,0.25-0.25 S35,28.878,35,29.016v6.769C35,35.922,34.888,36.034,34.75,36.034z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M42.75,71.573c-0.138,0-0.25-0.112-0.25-0.25v-5.754c0-0.138,0.112-0.25,0.25-0.25 S43,65.432,43,65.569v5.754C43,71.461,42.888,71.573,42.75,71.573z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M42.75,63.111c-0.138,0-0.25-0.112-0.25-0.25V29.354c0-0.138,0.112-0.25,0.25-0.25 S43,29.216,43,29.354v33.508C43,62.999,42.888,63.111,42.75,63.111z"
              />
            </g>
            <g>
              <path
                fill="#39c1d7"
                d="M58.5,71.234c-0.42,0-0.75-0.407-0.75-0.927V29.523c0-0.512,0.336-0.928,0.75-0.928 s0.75,0.416,0.75,0.928v40.784C59.25,70.827,58.92,71.234,58.5,71.234z"
              />
              <path
                fill="#472b29"
                d="M58.5,28.846c0.276,0,0.5,0.304,0.5,0.677v40.785c0,0.374-0.224,0.677-0.5,0.677 S58,70.681,58,70.308V29.523C58,29.15,58.224,28.846,58.5,28.846 M58.5,28.346c-0.561,0-1,0.517-1,1.177v40.785 c0,0.66,0.439,1.177,1,1.177s1-0.517,1-1.177V29.523C59.5,28.863,59.061,28.346,58.5,28.346L58.5,28.346z"
              />
            </g>
            <g>
              <path
                fill="#39c1d7"
                d="M58.5,43.75c-1.241,0-2.25-1.01-2.25-2.25s1.009-2.25,2.25-2.25s2.25,1.01,2.25,2.25 c0,0.996-0.667,1.885-1.623,2.161C58.925,43.72,58.714,43.75,58.5,43.75z"
              />
              <path
                fill="#472b29"
                d="M58.5,39.5c1.103,0,2,0.897,2,2c0,0.885-0.593,1.675-1.443,1.922 C58.878,43.474,58.69,43.5,58.5,43.5c-1.103,0-2-0.897-2-2S57.397,39.5,58.5,39.5 M58.5,39c-1.381,0-2.5,1.119-2.5,2.5 s1.119,2.5,2.5,2.5c0.242,0,0.476-0.034,0.697-0.098C60.238,43.6,61,42.639,61,41.5C61,40.119,59.881,39,58.5,39L58.5,39z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M66.25,71.573c-0.138,0-0.25-0.112-0.25-0.25v-28.77c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25v28.77C66.5,71.461,66.388,71.573,66.25,71.573z"
              />
              <path
                fill="#472b29"
                d="M66.25,40.096c-0.138,0-0.25-0.112-0.25-0.25v-2.03c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25v2.03C66.5,39.983,66.388,40.096,66.25,40.096z"
              />
              <path
                fill="#472b29"
                d="M66.25,36.034c-0.138,0-0.25-0.112-0.25-0.25v-6.431c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25v6.431C66.5,35.922,66.388,36.034,66.25,36.034z"
              />
            </g>
            <g>
              <path
                fill="#472b29"
                d="M50.75,65.819c-0.138,0-0.25-0.112-0.25-0.25v-2.708c0-0.138,0.112-0.25,0.25-0.25 S51,62.724,51,62.861v2.708C51,65.707,50.888,65.819,50.75,65.819z"
              />
              <path
                fill="#472b29"
                d="M50.75,61.081c-0.138,0-0.25-0.112-0.25-0.25V38.492c0-0.138,0.112-0.25,0.25-0.25 S51,38.354,51,38.492v22.339C51,60.969,50.888,61.081,50.75,61.081z"
              />
              <path
                fill="#472b29"
                d="M50.75,36.712c-0.138,0-0.25-0.112-0.25-0.25v-1.354c0-0.138,0.112-0.25,0.25-0.25 S51,34.97,51,35.107v1.354C51,36.6,50.888,36.712,50.75,36.712z"
              />
              <path
                fill="#472b29"
                d="M50.75,71.573c-0.138,0-0.25-0.112-0.25-0.25v-3.046c0-0.138,0.112-0.25,0.25-0.25 S51,68.14,51,68.277v3.046C51,71.461,50.888,71.573,50.75,71.573z"
              />
              <path
                fill="#472b29"
                d="M50.75,32.65c-0.138,0-0.25-0.112-0.25-0.25v-3.047c0-0.138,0.112-0.25,0.25-0.25 S51,29.216,51,29.354V32.4C51,32.538,50.888,32.65,50.75,32.65z"
              />
            </g>
            <path
              fill="#472b29"
              d="M65,29.4c3.639,0,6.6,2.961,6.6,6.6v28c0,3.639-2.961,6.6-6.6,6.6H37c-3.639,0-6.6-2.961-6.6-6.6V36	c0-3.639,2.961-6.6,6.6-6.6H65 M65,28H37c-4.418,0-8,3.582-8,8v28c0,4.418,3.582,8,8,8h28c4.418,0,8-3.582,8-8V36	C73,31.582,69.418,28,65,28L65,28z"
            />
            <g>
              <path
                fill="#fdfcef"
                d="M36.5,73.5c0,0,1.567,0,3.5,0s3.5-1.567,3.5-3.5c0-1.781-1.335-3.234-3.055-3.455 C40.473,66.366,40.5,66.187,40.5,66c0-1.933-1.567-3.5-3.5-3.5c-1.032,0-1.95,0.455-2.59,1.165 c-0.384-1.808-1.987-3.165-3.91-3.165c-2.209,0-4,1.791-4,4c0,0.191,0.03,0.374,0.056,0.558C26.128,64.714,25.592,64.5,25,64.5 c-1.228,0-2.245,0.887-2.455,2.055C22.366,66.527,22.187,66.5,22,66.5c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5s7.5,0,7.5,0 V74h7V73.5z"
              />
              <path
                fill="#472b29"
                d="M38.25,69C38.112,69,38,68.888,38,68.75c0-1.223,0.995-2.218,2.218-2.218 c0.034,0.009,0.737-0.001,1.244,0.136c0.133,0.036,0.212,0.173,0.176,0.306c-0.036,0.134-0.173,0.213-0.306,0.176 c-0.444-0.12-1.1-0.12-1.113-0.118c-0.948,0-1.719,0.771-1.719,1.718C38.5,68.888,38.388,69,38.25,69z"
              />
              <circle cx="31.5" cy="73.5" r=".5" fill="#472b29" />
              <path
                fill="#472b29"
                d="M40,74h-3.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H40c1.654,0,3-1.346,3-3 c0-1.496-1.125-2.768-2.618-2.959c-0.134-0.018-0.255-0.088-0.336-0.196s-0.115-0.244-0.094-0.377C39.975,66.314,40,66.16,40,66 c0-1.654-1.346-3-3-3c-0.85,0-1.638,0.355-2.219,1c-0.125,0.139-0.321,0.198-0.5,0.148c-0.182-0.049-0.321-0.195-0.36-0.379 C33.58,62.165,32.141,61,30.5,61c-1.93,0-3.5,1.57-3.5,3.5c0,0.143,0.021,0.28,0.041,0.418c0.029,0.203-0.063,0.438-0.242,0.54 c-0.179,0.102-0.396,0.118-0.556-0.01C25.878,65.155,25.449,65,25,65c-0.966,0-1.792,0.691-1.963,1.644 c-0.048,0.267-0.296,0.446-0.569,0.405C22.314,67.025,22.16,67,22,67c-1.654,0-3,1.346-3,3s1.346,3,3,3h7.5 c0.276,0,0.5,0.224,0.5,0.5S29.776,74,29.5,74H22c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.059,0,0.116,0.002,0.174,0.006 C22.588,64.82,23.711,64,25,64c0.349,0,0.689,0.061,1.011,0.18C26.176,61.847,28.126,60,30.5,60c1.831,0,3.466,1.127,4.153,2.774 C35.333,62.276,36.155,62,37,62c2.206,0,4,1.794,4,4c0,0.048-0.001,0.095-0.004,0.142C42.739,66.59,44,68.169,44,70 C44,72.206,42.206,74,40,74z"
              />
              <path
                fill="#472b29"
                d="M34.5,73c-0.159,0-0.841,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.159,0,0.841,0,1,0c0.276,0,0.5-0.224,0.5-0.5C35,73.224,34.776,73,34.5,73z"
              />
            </g>
          </svg>
        </div>
        Join the community and make your first trade today!
        {!user ? (
          <div
            onClick={() => navigate("/Login")}
            className="bg-blue-300 w-fit self-center p-2 rounded-lg text-blue-900 font-semibold hover:cursor-pointer"
          >
            Join Now
          </div>
        ) : (
          <></>
        )}
      </main>
      <Events eventDetail={eventDetail} setEventDetail={setEventDetail} />
    </>
  );
};

export default Home;
