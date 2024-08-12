import React from "react";
import { dataGitPropd } from "../../store/inderfaces";
import style from "./aside.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";

const Aside = (data: dataGitPropd) => {
  const currentRep = data.data;

  return (
    <aside
      className={`${style.sidebar} animate__animated animate__bounceInRight`}
    >
      {currentRep.length !== 0 ? (
        <div className={`${style.sidebar_content}`}>
          {currentRep.map((item) => {
            return (
              <div key={item.id} className="animate__animated animate__fadeIn">
                <h2> {item.name}</h2>
                <div className={style.sidebar_header}>
                  <div className={style.sidebar_header__lang}>
                    {item.language}
                  </div>
                  <div className={style.sidebar_header__stars}>
                    <StarRateIcon />
                    {item.watchers}
                  </div>
                </div>
                <div className="">
                  {item.description ? item.description : "нет описания"}
                </div>
                <div className={style.sidebar_license}>
                  {item.license ? item.license.name : "нет лицензии"}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Выберите репозитарий</p>
      )}
    </aside>
  );
};

export default Aside;
