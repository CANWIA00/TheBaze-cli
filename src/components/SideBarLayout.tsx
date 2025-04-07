import React, { useState } from 'react';
import NavRight from '@/components/NavRight';
import NavGroup from '@/components/NavGroup';
import NavFriend from '@/components/NavFriend';
import Profile from '@/components/Profile';
import Notification from '@/components/Notification';
import Message from '@/components/Message';

function SideBarLayout({
                           children,
                           setActiveComponent,
                           activeComponent,
                       }: {
    children?: React.ReactNode; // Make children optional
    activeComponent: 'welcome' | 'createGroup' | 'inviteGroup';
    setActiveComponent: (component: 'welcome' | 'createGroup' | 'inviteGroup') => void;
}) {
    const [activeSidebar, setActiveSidebar] = useState<'group' | 'friend' | 'profile' | 'notification' | 'message' | null>(null);

    const toggleNavGroup = () => setActiveSidebar(activeSidebar === 'group' ? null : 'group');
    const toggleNavFriend = () => setActiveSidebar(activeSidebar === 'friend' ? null : 'friend');
    const toggleProfile = () => setActiveSidebar(activeSidebar === 'profile' ? null : 'profile');
    const toggleNotification = () => setActiveSidebar(activeSidebar === 'notification' ? null : 'notification');
    const toggleMessage = () => setActiveSidebar(activeSidebar === 'message' ? null : 'message');

    return (
        <div className="min-h-screen flex flex-col bg-[#201E43]">
            {/****** Main Section *******/}
            <section id="main-container" className="flex justify-center items-center flex-grow">
                {children} {/* Render children if available */}
            </section>

            {/****** Right Sidebar ******/}
            <div className="fixed right-0 top-0 h-screen flex items-center">
                {activeSidebar === 'group' && (
                    <div className="p-4 bg-[#201E43] h-screen flex items-center">
                        <NavGroup toggleCreateNewGroup={() => setActiveComponent('createGroup')} />
                    </div>
                )}

                {activeSidebar === 'friend' && (
                    <div className="p-4 bg-[#201E43] h-screen flex items-center">
                        <NavFriend />
                    </div>
                )}

                {activeSidebar === 'profile' && (
                    <div className="p-4 bg-[#201E43] h-screen flex items-center">
                        <Profile />
                    </div>
                )}

                {activeSidebar === 'notification' && (
                    <div className="p-4 bg-[#201E43] h-screen flex items-center">
                        <Notification />
                    </div>
                )}

                {activeSidebar === 'message' && (
                    <div className="p-4 bg-[#201E43] h-screen flex items-center">
                        <Message />
                    </div>
                )}

                <NavRight
                    toggleMessage = {toggleMessage}
                    toggleNotification={toggleNotification}
                    toggleProfile={toggleProfile}
                    toggleNavGroup={toggleNavGroup}
                    toggleNavFriend={toggleNavFriend}
                    toggleWelcome={() => setActiveComponent('welcome')}
                />
            </div>
        </div>
    );
}

export default SideBarLayout;
