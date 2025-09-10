// // components/shared/app-sidebar/app-sidebar-user.tsx
// 'use client'

// import React, { useState } from 'react';
// import { cn } from '@/lib/utils';
// import { useAuthCheck, useAuthNotifications } from '@/hooks';
// import { ChevronsUpDownIcon, LogOutIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SidebarContextProps, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui';
// import { AuthModal, Logo } from '@/components/shared';

// interface Props {
//   className?: string;
//   sidebar: SidebarContextProps;
// }

// export const AppSidebarUser: React.FC<Props> = ({ className, sidebar }) => {
//   const { user, logout, isAuthenticated } = useAuthCheck();
//   const { showSuccess } = useAuthNotifications();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     showSuccess('Successfully logged out');
//     setIsDropdownOpen(false);
//   };

//   const handleAuthSuccess = () => {
//     setIsAuthModalOpen(false);
//     showSuccess('Successfully authenticated');
//   };

  
//   const handleAuthClick = () => {
//     setIsDropdownOpen(false); // Закрываем dropdown перед открытием модалки
//     setIsAuthModalOpen(true);
//   };

//   if (!isAuthenticated) {
//       return (
//       <SidebarFooter className={cn('', className)}>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton size={'lg'} variant={'outline'}>
//                   <Logo title="Guest" subtitle="Sign in to continue" />
//                   <span className="flex shrink-0 ml-auto">
//                     <ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
//                   </span>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end'>
//                 <DropdownMenuLabel>Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleAuthClick}>
//                   <LogInIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
//                   <span>Sign In</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleAuthClick}>
//                   <UserPlusIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
//                   <span>Register</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>

//         <AuthModal 
//           isOpen={isAuthModalOpen} 
//           onClose={() => setIsAuthModalOpen(false)}
//           onSuccess={handleAuthSuccess}
//         />
//       </SidebarFooter>
//     );
//   }

//   return (
//     <SidebarFooter className={cn('', className)}>
//       <SidebarMenu>
//         <SidebarMenuItem>
//           <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//             <DropdownMenuTrigger asChild>
//               <SidebarMenuButton size={'lg'} variant={'outline'}>
//                 <Logo 
//                   title={user?.nickname ? user.nickname : ''} 
//                   subtitle={user?.email}
//                   showAvatar={true}
//                   avatarName={user?.nickname}
//                   avatarEmail={user?.email}
//                 />
//                 <span className="flex shrink-0 ml-auto">
//                   <ChevronsUpDownIcon size={16} className="2k:size-5.5 4k:size-8 8k:size-16" />
//                 </span>
//               </SidebarMenuButton>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent side={sidebar.isMobile ? 'top' : 'right'} align='end'>
//               <DropdownMenuLabel>
//                 <Logo 
//                   title={user?.nickname ? user.nickname : ''}  
//                   subtitle={user?.email}
//                   showAvatar={true}
//                   avatarName={user?.nickname}
//                   avatarEmail={user?.email}
//                 />
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOutIcon size={16} className="mr-2 2k:size-5.5 4k:size-8 8k:size-16" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarFooter>
//   );
// };