import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DashboardCard from '../components/Dashboard/DashboardCard';
import { useAuth } from '../context/AuthContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-[28px] font-bold text-primary mb-2">My Profile</h2>
        <p className="font-body-md text-on-surface-variant">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 flex flex-col gap-gutter">
          <DashboardCard>
            <h3 className="font-headline-lg text-[20px] text-primary mb-stack-md">Personal Information</h3>
            <form className="space-y-stack-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Full Name" 
                  type="text" 
                  defaultValue={user?.name || ''}
                  icon="person"
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  defaultValue={user?.email || ''}
                  icon="mail"
                  disabled
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="button">Save Changes</Button>
              </div>
            </form>
          </DashboardCard>

          <DashboardCard>
            <h3 className="font-headline-lg text-[20px] text-primary mb-stack-md">Security</h3>
            <form className="space-y-stack-md">
              <Input 
                label="Current Password" 
                type="password" 
                icon="lock"
                placeholder="••••••••"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="New Password" 
                  type="password" 
                  icon="lock_reset"
                  placeholder="••••••••"
                />
                <Input 
                  label="Confirm New Password" 
                  type="password" 
                  icon="lock_reset"
                  placeholder="••••••••"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="button" variant="secondary">Update Password</Button>
              </div>
            </form>
          </DashboardCard>
        </div>

        <div className="md:col-span-4">
          <DashboardCard className="flex flex-col items-center text-center">
            <img 
              alt="User Profile Avatar" 
              className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-surface-container-highest" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYQJ2VdU6wem0aq9Rkp_TGbYG5m1fJUIMbpR8c0O3HOgYqEmbiy2rkPqFULbELlaeWCrivW8vTcj4yhj-JP1TxFpLII2k8FT5LWHhorqH7mglWOnn1KGiqNHsdsl7u7a7FETLZm0s6TUMj9QhF1pSOrRxGwCVIYgKWhinBdgOFTTv6msmbkCEgRwBsr_jJWQkvX0FndeeEjnrvlW2tsAyOHl32UZhrDu9f7ygaq3fj16D8YyZlos84" 
            />
            <h3 className="font-headline-lg text-[20px] text-primary">{user?.name || 'User'}</h3>
            <p className="font-body-md text-on-surface-variant mb-4">{user?.email || 'email@example.com'}</p>
            <div className="w-full flex flex-col gap-2">
              <Button variant="secondary" className="w-full justify-center">
                <span className="material-symbols-outlined text-sm">upload</span>
                Upload New Photo
              </Button>
              <button className="text-error text-sm font-label-md hover:underline py-2">
                Remove Photo
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
