import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from '../../../../hooks/useDebounce'
import { changeFilter } from '../../../../redux/slices/filterSlice'
import { getPosts } from '../../../../redux/slices/postsSlice'
import { Input } from '../../../ui/Input'

export const Search = () => {
	const dispatch = useDispatch()
	const { searchValue, sort, order } = useSelector(state => state.filter.filter)

	const onChangeInput = event => {
		const searchValue = event.target.value
		dispatch(changeFilter({ searchValue }))
		debouncedUpdatePosts(searchValue)
	}

	const updatePage = searchValue => {
		const currentPage = 1
		dispatch(changeFilter({ currentPage }))
		dispatch(getPosts({ searchValue, currentPage, sort, order }))
	}

	const debouncedUpdatePosts = useCallback(useDebounce(updatePage, 500), [])

	return (
		<div>
			<h3>Поиск</h3>
			<Input type='text' value={searchValue} onChange={onChangeInput} />
		</div>
	)
}
