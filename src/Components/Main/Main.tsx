import React, { useState } from "react";
import style from "./main.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../store/hooks";
import Aside from "../Aside/Aside";
import { PropsQuery, dataGit } from "../../store/inderfaces";
import CircularProgress from "@mui/material/CircularProgress";

const Main = ({ query, setQuery }: PropsQuery) => {
  const { data, loading, count } = useAppSelector((state) => state.git);
  const [page, setPage] = useState(0);

  const [sortRow, setSortRow] = React.useState("");
  console.log(loading);
  const [currentRep, setCurrentRep] = useState<dataGit[]>([]);
  //функция пагинации страниц
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setQuery({ ...query, page: newPage + 1 });
  };
  //установка количества строк выборки
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery({ ...query, perPage: event.target.value });
    setPage(0);
  };

  //установка флага сортировки
  const handlerSort = (e: string) => {
    setQuery({ ...query, sort: e });
    setSortRow(e);
  };
  //установка текущего репозитория для отображения в сайдбаре
  const handlerSetRepo = (item: dataGit) => {
    setCurrentRep([item]);
  };
  //функция рендера содержимого таблицы
  const renderTable = () => {
    return data.map((item: dataGit) => {
      return (
        <TableRow key={item.id} onClick={() => handlerSetRepo(item)}>
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {item.language}
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {item.forks}
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {item.watchers}
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {item.updated_at}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className={style.main}>
      {data.length > 0 ? (
        <div className={style.table__wrapper}>
          <div className={style.table_content}>
            <TableContainer
              className={`${style.table} animate__animated animate__bounceInLeft`}
            >
              <h2>Результаты поиска</h2>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align="left">Язык</TableCell>

                    <TableCell
                      align="left"
                      onClick={() => handlerSort("forks")}
                    >
                      {sortRow === "forks" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : null}
                      Число форков
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handlerSort("stars")}
                    >
                      {sortRow === "stars" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : null}
                      Число звезд
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handlerSort("updated")}
                    >
                      {sortRow === "updated" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : null}
                      Дата обновления
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderTable()}</TableBody>
              </Table>
              <div className={style.pagination}>
                <TablePagination
                  component="div"
                  count={count}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={query.perPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </TableContainer>
            <Aside data={currentRep} />
          </div>
        </div>
      ) : loading ? (
        <div className={style.main_spiner}>
          <h2>Загрузка...</h2>
        </div>
      ) : (
        <div className={style.main_start}>
          <h1>Добро пожаловать</h1>
        </div>
      )}
    </div>
  );
};

export default Main;
