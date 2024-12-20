import AdminLayout from "../components/adminLayout";

const PenyimpananPage = ({ data, isLogin }) => {
  return (
    <AdminLayout isLogin={isLogin}>
      <div className="w-fit ml-[73px] xl:w-[900px] xl:ml-20">
        <h1 className="text-center text-xl font-bold p-3">
          Status Penyimpanan Database
        </h1>
        <div className="bg-background border border-dotted border-gray-800 w-full p-4 rounded-md">
          <table className="w-full text-xs lg:text-md xl:text-lg">
            <tbody>
              <tr>
                <td className="p-1">Nama Database</td>
                <td className="p-1">:</td>
                <td className="p-1">{data.db}</td>
              </tr>
              <tr>
                <td className="p-1">Total Document</td>
                <td className="p-1">:</td>
                <td className="p-1">{data.documents || 0}</td>
              </tr>
              <tr>
                <td className="p-1">Penyimpanan Terpakai</td>
                <td className="p-1">:</td>
                <td className="p-1">{data.penyimpananTerpakai || "0 MB"}</td>
              </tr>
              <tr>
                <td className="p-1">Total Penyimpanan</td>
                <td className="p-1">:</td>
                <td className="p-1">512MB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PenyimpananPage;
