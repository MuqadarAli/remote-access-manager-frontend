import React from 'react';
import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
import { CgCommunity } from 'react-icons/cg';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { useGetChartCardDatForSAdminQuery } from '../../redux/rtk-query/chartData';
import Loader from '../../components/Loader';

const Dashboard: React.FC = () => {
  const { data: cardData, isLoading } =
    useGetChartCardDatForSAdminQuery(undefined);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats
              title="Total Approved Community"
              total={`${cardData?.value?.approvedCommunities}`}
            >
              <CgCommunity size={24} />
            </CardDataStats>
            <CardDataStats
              title="Total Pending Community"
              total={`${cardData?.value?.pendingCommunities}`}
            >
              <CgCommunity size={24} />
            </CardDataStats>
            <CardDataStats
              title="Total User"
              total={`${cardData?.value?.totalUsers}`}
            >
              <HiOutlineUsers size={24} />
            </CardDataStats>
            <CardDataStats
              title="Total Featured"
              total={`${cardData?.value?.totalFeatured}`}
            >
              <MdOutlineFeaturedPlayList size={24} />
            </CardDataStats>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            {/* <ChartOne /> */}
            <ChartTwo />
            <ChartThree />
            {/* <MapOne /> */}
            <div className="col-span-12 xl:col-span-8">
              {/* <TableOne /> */}
            </div>
            {/* <ChatCard /> */}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
