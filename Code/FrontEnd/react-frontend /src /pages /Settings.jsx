import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DashboardCard from '../components/Dashboard/DashboardCard';
import Button from '../components/UI/Button';
import Toast from '../components/UI/Toast';

const Settings = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [language, setLanguage] = useState('en');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleEmail = () => {
    setEmailNotifs(!emailNotifs);
    showToast(`Email notifications ${!emailNotifs ? 'enabled' : 'disabled'}`);
  };

  const handleToggleMarketing = () => {
    setMarketingNotifs(!marketingNotifs);
    showToast(`Marketing updates ${!marketingNotifs ? 'enabled' : 'disabled'}`);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    showToast('Language preferences updated');
  };

  const handleLogoutAll = () => {
    showToast('Logged out of all other sessions');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
      showToast('Account deletion request initiated', 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-[28px] font-bold text-primary mb-2">Settings</h2>
        <p className="font-body-md text-on-surface-variant">Configure application preferences and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 flex flex-col gap-gutter">
          <DashboardCard>
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <h3 className="font-headline-lg text-[20px] text-primary">Notification Preferences</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-on-surface">Email Notifications</h4>
                  <p className="font-caption text-on-surface-variant">Receive updates when your document analysis is complete.</p>
                </div>
                <div 
                  className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${emailNotifs ? 'bg-primary' : 'bg-gray-300'}`}
                  onClick={handleToggleEmail}
                >
                  <span className={`inline-block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out transform ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-on-surface">Marketing Updates</h4>
                  <p className="font-caption text-on-surface-variant">Receive news, feature updates, and legal tips.</p>
                </div>
                <div 
                  className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${marketingNotifs ? 'bg-primary' : 'bg-gray-300'}`}
                  onClick={handleToggleMarketing}
                >
                  <span className={`inline-block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out transform ${marketingNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">language</span>
              <h3 className="font-headline-lg text-[20px] text-primary">Language Settings</h3>
            </div>
            <p className="font-body-md text-on-surface-variant mb-4">Select your preferred language for the interface and document summaries.</p>
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border border-outline-variant rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">Hindi (Beta)</option>
              <option value="mr">Marathi (Beta)</option>
            </select>
          </DashboardCard>
        </div>

        <div className="md:col-span-4 flex flex-col gap-gutter">
          <DashboardCard>
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">security</span>
              <h3 className="font-headline-lg text-[20px] text-primary">Security & Sessions</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-on-surface">Current Session</h4>
                  <p className="font-caption text-on-surface-variant">Windows 10 • Chrome • Active Now</p>
                </div>
              </div>
              <button 
                onClick={handleLogoutAll}
                className="text-primary font-label-md hover:underline cursor-pointer"
              >
                Log out of all other sessions
              </button>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-error">warning</span>
              <h3 className="font-headline-lg text-[20px] text-error">Danger Zone</h3>
            </div>
            <p className="font-body-md text-on-surface-variant mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <Button 
              variant="secondary" 
              onClick={handleDeleteAccount}
              className="w-full text-error border-error hover:bg-error-container"
            >
              Delete Account
            </Button>
          </DashboardCard>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </DashboardLayout>
  );
};

export default Settings;
