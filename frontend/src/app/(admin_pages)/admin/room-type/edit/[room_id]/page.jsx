import { fetchCategoryById, fetchRoomById } from '@/api/api'
import EditForm from '@admin/Editform'

export default async function Page({ params }) {
  const { category_id } = await params
  const { success, data, message } = await fetchRoomById(room_id)

  if (success === false) {
    throw new Error(message || 'Internal Server Error')
  }

  return <EditForm data = {data} api = {`room-type/edit/${data._id}`} />
}
