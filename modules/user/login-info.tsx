'use client';

import { userStore } from '@/store';
import { Input } from '@nextui-org/input';
import { useSnapshot } from 'valtio';

const LoginInfo = () => {
  const userSnap = useSnapshot(userStore);

  if (!userSnap.user) {
    return null;
  }

  const label = userSnap.user.local.email
    ? 'email address'
    : userSnap.user.local.phone
      ? 'Phone Number'
      : 'Email';

  const value = userSnap.user.local.email
    ? userSnap.user.local.email
    : userSnap.user.local.phone
      ? userSnap.user.local.phone
      : userSnap.user.social.providers[0].email;

  return (
    <div className='my-5 max-w-sm flex-1'>
      <Input
        label={'Login ' + label}
        readOnly
        value={value}
      />
    </div>
  );
};
export default LoginInfo;
