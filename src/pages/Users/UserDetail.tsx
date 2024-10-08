import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import PageTitle from '../../components/PageTitle';
import UserDetailComp from '../../components/UsersComp/UserDetailComp';

export const UserDetail: React.FC = () => {
  return (
    <AdminLayout>
      <PageTitle title="User Detail | Home Access Manager" />
      <UserDetailComp />
    </AdminLayout>
  );
};
