import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { SlEye } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { ApproveModal } from '../Modal/ApproveModal';
import { DisableModal } from '../Modal/DisableModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetPendingVehiclesForCommunityQuery } from '../../redux/rtk-query/vehicle';

const PendingVehiclesComp: React.FC = () => {
  const [approveModal, setApproveModal] = useState<boolean>(false);
  const [disableModal, setDisableModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('');
  const profile = useSelector(
    (state: RootState) => state.persistedReducer.auth.profile,
  );
  const communityId = useSelector(
    (state: RootState) => state.persistedReducer.auth.community_id,
  );
  
  const community_id = profile?.community?.id || communityId;
  const {
    data: vehicles,
    isError,
    isLoading,
  } = useGetPendingVehiclesForCommunityQuery(community_id);

  const navigate = useNavigate();
  const viewHandler = (vehicle: any) => {
    navigate('/vehicles/vehicle-detail', { state: { vehicle } });
  };

  function approveHandler(id: any) {
    setApproveModal(!approveModal);
    setCurrentId(id);
  }

  function disableHandler(id: any) {
    setDisableModal(!disableModal);
    setCurrentId(id);
  }
  return (
    <>
      <Breadcrumb pageName="Pending Vehicles" />
      <div>{isLoading && <Loader />}</div>
      <div>
        {isError && (
          <p className="text-lg leading-6 font-medium text-red-500">
            System Failed
          </p>
        )}
      </div>
      {!isLoading && (
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto mb-5">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px]  py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      License Plate
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white ">
                      Vehicle Model
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                      Make Of Vehicle
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                      Owner Name
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles?.value?.map((vehicle: any, key: number) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className=" text-black dark:text-white">
                          {vehicle?.license_plate}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {vehicle?.model_of_vehicle}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {vehicle?.make_of_vehicle}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {`${vehicle?.user?.first_name} ${vehicle?.user?.last_name}`}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary bg-green-400 hover:bg-slate-100 rounded-full p-1"
                            onClick={() => approveHandler(vehicle?.id)}
                            id="mark-button"
                          >
                            <IoMdCheckmark size={20} className="text-white" />
                          </button>
                          <button
                            className="hover:text-primary bg-red-400 hover:bg-slate-100 rounded-full p-1"
                            onClick={() => disableHandler(vehicle?.id)}
                            id="cross-button"
                          >
                            <RxCross2 size={20} className="text-white" />
                          </button>
                          <button
                            className="hover:text-primary hover:bg-slate-100 rounded-full p-1"
                            id="view-button"
                            onClick={() => viewHandler(vehicle)}
                          >
                            <SlEye size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {approveModal && (
            <ApproveModal
              name="Vehicle"
              setModal={setApproveModal}
              id={currentId}
            />
          )}
          {disableModal && (
            <DisableModal
              name="Vehicle"
              setModal={setDisableModal}
              id={currentId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PendingVehiclesComp;
