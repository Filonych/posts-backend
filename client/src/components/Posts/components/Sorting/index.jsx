import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setSort, setOrder } from "../../../../redux/slices/filterSlice";
import { Link } from "../../../ui/Link";
import * as SC from "./styles";

export const Sorting = ({ updatePosts }) => {
  const { searchValue, sort, order } = useSelector(
    (state) => state.filter.filter
  );
  const dispatch = useDispatch();

  const orderList = [
    { name: "A-Z", orderProperty: "ASC" },
    { name: "Z-A", orderProperty: "DESC" },
  ];

  const sortPosts = (orderProperty) => {
    dispatch(setSort('title'));
    dispatch(setOrder(orderProperty));
    dispatch(setCurrentPage(1));
    updatePosts(searchValue, 1, 'title', orderProperty);
  };

  return (
    <div>
      <h3>Сортировка</h3>
      <SC.LinkWrap>
        {orderList.map((obj) => (
          <Link
            onClick={() => sortPosts(obj.orderProperty)}
            className={obj.orderProperty === order ? "active" : undefined}
            key={obj.name}
          >
            {obj.name}
          </Link>
        ))}
      </SC.LinkWrap>
    </div>
  );
};
