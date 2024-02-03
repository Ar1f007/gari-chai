'use client';

import SectionTitle from '@/components/section-title';
import ChangePassword from './change-password';
import LoginInfo from './login-info';
import DeactivateOrDeleteAccount from './account-actions';

const AccountSettings = () => {
  return (
    <div>
      <SectionTitle>Account Settings</SectionTitle>
      <div className='my-5 flex flex-col justify-between gap-2 md:my-0 md:flex-row md:items-center'>
        <LoginInfo />
        <DeactivateOrDeleteAccount />
      </div>
      <ChangePassword />
    </div>
  );
};
export default AccountSettings;
