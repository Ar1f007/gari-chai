import { Section } from '@/components/layout/section';
import AccountSettings from '@/modules/user/account-settings';
import ProfileInformation from '@/modules/user/profile-information';
import { Suspense } from 'react';

const UserProfileSettings = () => {
  return (
    <Section classNames='py-10 px-4 max-w-screen-md'>
      <Suspense>
        <div className='grid grid-cols-1 gap-5'>
          <ProfileInformation />
          <AccountSettings />
        </div>
      </Suspense>
    </Section>
  );
};
export default UserProfileSettings;
