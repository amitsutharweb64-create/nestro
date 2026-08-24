import { fetchCategoryById } from '@/api/api'
import EditForm from '@admin/Editform'

export default async function Page({ params }) {
  const { category_id } = await params
  const { success, data, message } = await fetchCategoryById(category_id)

  if (success === false) {
    throw new Error(message || 'Internal Server Error')
  }

  return <EditForm data = {data} api = {`category/edit/${data._id}`} />
}
