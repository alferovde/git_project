import React, { useEffect } from "react";
import style from "./header.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchRepo } from "../../Data/gitSlice";
import { PropsQuery } from "../../store/inderfaces";
import { useAppDispatch } from "../../store/hooks";

const Header = ({ query, setQuery }: PropsQuery) => {
  const dispatch = useAppDispatch();

  //обработка запроса и отправка на сервер
  const handlerFetchData = () => {
    dispatch(fetchRepo(query));
  };

  useEffect(() => {
    dispatch(fetchRepo(query));

    //обновление реагирует только на изменение количество строк, страницу и сортировку, но не на строку запроса
  }, [query.perPage, query.page, query.sort]);

  return (
    <header className={style.header}>
      <TextField
        placeholder="Введите поисковый запрос"
        variant="outlined"
        style={{
          width: "65%",
          backgroundColor: "#fff",
          borderRadius: "4px",
          border: "none",
        }}
        onChange={(e) => setQuery({ ...query, query: e.target.value })}
      />
      <Button variant="contained" onClick={() => handlerFetchData()}>
        Искать
      </Button>
    </header>
  );
};

export default Header;
