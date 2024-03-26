import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { changeFilter } from "../../redux/slices/filterSlice";
import { useEffect, useState } from "react";
import { getPosts } from "../../redux/slices/postsSlice";

const ITEMS_PER_PAGE = 10;

export const Pagination = () => {
  // добавила состояние pagination из-за useEffect
  const [pagination, setPagination] = useState([]);

  const dispatch = useDispatch();
  const { searchValue, currentPage, sort, order } = useSelector(
    (state) => state.filter.filter
  );
  const totalCount = useSelector((state) => state.posts.totalCount);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // по-моему, итерация в useEffect срабатывает так же часто, как и без него
  // ниже оба варианта для сравнения

  // const pagination = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pagination.push(i);
  //   }
  //   console.log("check pagination")

  useEffect(() => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i);
    }

    // console.log("check pagination")

    setPagination(pagination);
  }, [totalPages]);

  const changeCurrentPage = (page) => {
    const currentPage = page;
    dispatch(changeFilter({ currentPage }));
    dispatch(getPosts({ searchValue, currentPage, sort, order }));
  };

  return (
    <SC.Wrap>
      {pagination.map((page) => (
        <SC.Page
          key={page}
          onClick={() => changeCurrentPage(page)}
          className={currentPage === page ? "active" : undefined}
        >
          {page}
        </SC.Page>
      ))}
    </SC.Wrap>
  );
};
