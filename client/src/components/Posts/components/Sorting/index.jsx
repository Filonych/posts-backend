import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../redux/slices/filterSlice";
import { Link } from "../../../ui/Link";
import * as SC from "./styles";
import { getPosts } from "../../../../redux/slices/postsSlice";

export const Sorting = () => {
  const { searchValue, order } = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  const orderList = [
    { name: "A-Z", order: "ASC" },
    { name: "Z-A", order: "DESC" },
  ];

  const sortPosts = (order) => {
    const currentPage = 1;
    const sort = "title";

    dispatch(changeFilter({ currentPage, sort, order }));
    dispatch(getPosts({ searchValue, currentPage, sort, order }));
  };

  return (
    <div>
      <h3>Сортировка</h3>
      <SC.LinkWrap>
        {orderList.map((obj) => (
          <Link
            onClick={() => sortPosts(obj.order)}
            className={obj.order === order ? "active" : undefined}
            key={obj.name}
          >
            {obj.name}
          </Link>
        ))}
      </SC.LinkWrap>
    </div>
  );
};
