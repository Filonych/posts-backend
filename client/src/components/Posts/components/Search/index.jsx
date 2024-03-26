import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../redux/slices/filterSlice";
import { Input } from "../../../ui/Input";
import { useDebounce } from "../../../../hooks/useDebounce";
import { getPosts } from "../../../../redux/slices/postsSlice";
import { useCallback } from "react";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchValue, sort, order } = useSelector(
    (state) => state.filter.filter
  );

  const onChangeInput = (event) => {
    const searchValue = event.target.value;
    dispatch(changeFilter({ searchValue }));
    debouncedUpdatePosts(searchValue);
  };

  const updatePage = (searchValue) => {
    const currentPage = 1;
    dispatch(changeFilter({ currentPage }));
    dispatch(getPosts({ searchValue, currentPage, sort, order }));
  };

  // без useCallback не работает debounce, т.е. сколько знаков ввожу в инпут -
  // столько запросов на сервер.
  // ниже 2 варианта - с useCallback и без.
  // я так поняла, что ты имела в виду, что надо сделать без useCallback?

  const debouncedUpdatePosts = useCallback(useDebounce(updatePage, 500), []);

  // const debouncedUpdatePosts = useDebounce(updatePage, 500)

  return (
    <div>
      <h3>Поиск</h3>
      <Input type="text" value={searchValue} onChange={onChangeInput} />
    </div>
  );
};
