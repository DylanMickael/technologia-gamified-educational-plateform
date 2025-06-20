import AdminLayout from "../../layouts/AdminLayout"
import Generator from "./components/AIReportGenerator"

const Dashboard = () => {
    return (
        <AdminLayout>
            <Generator/>
        </AdminLayout>
    )
}

export default Dashboard;