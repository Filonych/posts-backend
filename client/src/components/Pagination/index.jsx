import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../../redux/slices/filterSlice'
import { getPosts } from '../../redux/slices/postsSlice'
import * as SC from './styles'

const ITEMS_PER_PAGE = 10

export const Pagination = () => {
	const [pagination, setPagination] = useState([])

	const dispatch = useDispatch()
	const { searchValue, currentPage, sort, order } = useSelector(
		state => state.filter.filter
	)
	const totalCount = useSelector(state => state.posts.totalCount)

	// по-моему, итерация в useEffect срабатывает так же часто, как и без него
	// ниже оба варианта для сравнения

	// const pagination = [];
	//   for (let i = 1; i <= totalPages; i++) {
	//     pagination.push(i);
	//   }
	//   console.log("check pagination")

	useEffect(() => {
		const pagination = []
		const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
		for (let i = 1; i <= totalPages; i++) {
			pagination.push(i)
		}

		console.log('check pagination')

		setPagination(pagination)
	}, [totalCount])

	const changeCurrentPage = page => {
		const currentPage = page
		dispatch(changeFilter({ currentPage }))
		dispatch(getPosts({ searchValue, currentPage, sort, order }))
	}

	return (
		<SC.Wrap>
			{pagination.map(page => (
				<SC.Page
					key={page}
					onClick={() => changeCurrentPage(page)}
					className={currentPage === page ? 'active' : undefined}
				>
					{page}
				</SC.Page>
			))}
		</SC.Wrap>
	)
}
