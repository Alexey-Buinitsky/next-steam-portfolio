'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SidebarContextProps, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui';
import { AuthModal, Logo } from '@/components/shared';
import { ChevronsUpDownIcon, LogOutIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import { useAuthCheck, useAuthNotifications } from '@/hooks';

interface Props {
	className?: string;
	sidebar: SidebarContextProps;
}

export const AppSidebarFooter: React.FC<Props> = ({ className, sidebar }) => {
	const { user, logout, isAuthenticated } = useAuthCheck()
	const { showSuccess } = useAuthNotifications()
	const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)

	const handleLogout = async () => {
		await logout();
		showSuccess('Successfully logged out')
	}

	const handleAuthSuccess = () => {
		setIsAuthModalOpen(false)
		showSuccess('Successfully authenticated')
	}

	if (!isAuthenticated) {
		return (
			<SidebarFooter className={cn('', className)}>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size={'lg'} variant={'outline'}>
									<Logo title="Guest" subtitle="Sign in to continue" />
									<span className="flex shrink-0 ml-auto">
										<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
									</span>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end'>
								<DropdownMenuLabel>Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
									<LogInIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
									<span>Sign In</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
									<UserPlusIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
									<span>Register</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
				<AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
			</SidebarFooter>
		)
	}

	return (
		<SidebarFooter className={cn('', className)}>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size={'lg'} variant={'outline'}>
								<Logo title={user?.nickname ? user.nickname : ''} subtitle={user?.email} showAvatar={true} avatarName={user?.nickname} avatarEmail={user?.email} />
								<span className="flex shrink-0 ml-auto">
									<ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
								</span>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end'>
							<DropdownMenuLabel>
								<Logo title={user?.nickname ? user.nickname : ''} subtitle={user?.email} showAvatar={true} avatarName={user?.nickname} avatarEmail={user?.email} />
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								<LogOutIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}