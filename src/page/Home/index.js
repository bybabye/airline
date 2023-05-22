import { useEffect, useMemo, useState } from "react";
import { getFlight, getLocation } from "../../utils/request";
import Select from "react-select";
import styles from "./styles.module.css";
import { AiOutlineLogin } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function HomePage() {
  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState(new Date().getTime());

  const [loading, setLoadingg] = useState(false);
  const [selectedSanBayDi, setSelectedSanBayDi] = useState(null);
  const [selectedSanBayDen, setSelectedSanBayDen] = useState(null);

  const handleChangeSBDi = (selectedSanBay) => {
    setSelectedSanBayDi(selectedSanBay);
  };
  const handleChangeSBDen = (selectedSanBay) => {
    setSelectedSanBayDen(selectedSanBay);
  };

  const getListLocation = async () => {
    setLoadingg(true);
    const data = await getLocation();

    setLocations(data.data);
    setSelectedSanBayDi(data.data[0]);
    setSelectedSanBayDen(data.data[1]);
    setLoadingg(false);
  };

  useEffect(() => {
    getListLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickButtonSearch = async () => {
    const dateObject = new Date(startDate);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
    const day = dateObject.getDate();
    const formattedDate = `${year}/${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }`;
    console.log(selectedSanBayDi, selectedSanBayDen, formattedDate);
    const data = await getFlight({
      sbdi: selectedSanBayDi.masanbay,
      sbden: selectedSanBayDen.masanbay,
      time: formattedDate,
    });

    console.log(data);
  };

  const memoizedLocationList = useMemo(() => locations, [locations]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <div className={`${styles.layout}`}>
        {" "}
        {/** lay out */}
        <div className="relative">
          {" "}
          {/** form flight */}
          <img
            src="https://www.esky.com/_fe/img/HERO_CB_USA_LATAM.jpg"
            alt="logo"
          />
          <div className={`${styles.form_flight}`}>
            <div className="flex flex-col justify-around items-center h-[100%]">
              <h1 className="text-[#ffffff] text-[34px] font-semibold">
                Flight tickets, hotels, car rentals...
                <br /> Perfect city breaks and holidays
              </h1>
              <div className={`${styles.form_flight_content}`}>
                <div className="h-[68px] p-[12px] w-[83px] cursor-pointer ">
                  <img
                    className="ml-[5px]"
                    src="https://www.esky.com/_fe/img/icon_plane_right.svg?c=ffffff"
                    alt="flight"
                  />
                  <p className="text-[#ffffff] font-semibold mt-[6px]">
                    flight
                  </p>
                </div>
                <div className=" bg-[#ffffff] h-[100%] w-[100%] rounded-xl flex flex-col justify-around p-[12px]">
                  <div>options</div>
                  <div className="flex flex-row justify-around">
                    <div>
                      {" "}
                      {/** depart from */}
                      <p>depart from</p>
                      <div className="w-[240px]">
                        <Select
                          value={selectedSanBayDi}
                          options={memoizedLocationList}
                          getOptionValue={(option) => option.masanbay}
                          getOptionLabel={(option) => option.tinh}
                          onChange={handleChangeSBDi}
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      {/** flying to */}
                      <p>flying to</p>
                      <div className="w-[240px]">
                        <Select
                          value={selectedSanBayDen}
                          options={memoizedLocationList}
                          getOptionValue={(option) => option.masanbay}
                          getOptionLabel={(option) => option.tinh}
                          onChange={handleChangeSBDen}
                        />
                      </div>
                    </div>
                    <div>
                      Departure date
                      <DatePicker
                        className="h-[36px] border-solid border-[1px] py-[2px] px-[6px] rounded-md"
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                        }}
                      />
                    </div>
                    <div>
                      search
                      <button
                        className=" h-[36px] w-[70px] p-2 bg-[#e2076a] flex items-center text-[#ffffff] justify-center "
                        onClick={handleClickButtonSearch}
                      >
                        {" "}
                        <BiSearchAlt fontSize={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/** form flight */}
        <div className={`${styles.navbar}`}>
          {/** navbar*/}
          <div className="flex flex-row items-center justify-around min-h-[64px]">
            <img
              src="https://static1.eskypartners.com/logos/eskycom-white.svg"
              alt="logo"
            />
            <div className="text-[#ffffff]">item</div>
            <div className="flex items-center text-[#ffffff]">
              <AiOutlineLogin size={24} /> <p className="ml-[12px]">login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
