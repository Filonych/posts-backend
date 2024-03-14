import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { setCurrentPage } from "../../redux/slices/filterSlice";

const ITEMS_PER_PAGE = 10;

export const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.filter.filter);
  const totalCount = useSelector((state) => state.posts.totalCount);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const pagination = [];

  for (let i = 1; i <= totalPages; i++) {
    pagination.push(i);
  }

  const changeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
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
