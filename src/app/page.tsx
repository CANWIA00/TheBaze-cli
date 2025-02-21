"use client";

import React, { useState } from "react";
import SideBarLayout from "../components/SideBarLayout";
import Welcome from "../components/welcome/Welcome";
import CreateNewGroup from "../components/CreateNewGroup";
import InviteToGroup from "../components/InviteToGroup";

export default function Home() {
    const [activeComponent, setActiveComponent] = useState<'welcome' | 'createGroup' | 'inviteGroup'>('welcome');

    return (
        <SideBarLayout activeComponent={activeComponent} setActiveComponent={setActiveComponent}>
            {activeComponent === 'welcome' && <Welcome />}
            {activeComponent === 'createGroup' && (
                <CreateNewGroup toggleCreateNewGroup={() => setActiveComponent('welcome')} toggleInviteToGroup={() => setActiveComponent('inviteGroup')} />
            )}
            {activeComponent === 'inviteGroup' && <InviteToGroup closeInviteGroup={() => setActiveComponent('welcome')} />}
        </SideBarLayout>
    );
}
