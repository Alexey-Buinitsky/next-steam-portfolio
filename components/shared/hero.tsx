import React from 'react';
import { Warehouse } from "lucide-react";
import { Button } from '@/components/ui';

interface Props {
 className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
    return (
        <div className={`relative flex h-[500px] overflow-hidden rounded-4xl mt-4 p-6 sm:p-20 xl:p-40 ${className}`}>
            <div 
                className="absolute inset-0 bg-[url(/images/HeroBanner.png)] bg-cover bg-top-right"
                style={{
                    maskImage: 'linear-gradient(to left, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
                }}
            />
        
            <div className="relative z-20 flex h-full w-full items-center justify-center sm:justify-start text-center sm:text-start">
                <div className="flex items-center sm:items-start w-full max-w-3xl flex-col gap-4">
                    <h1 className="text-5xl font-bold leading-tight sm:text-5xl">
                        Создайте свое портфолио
                    </h1>
                    <p className="text-base text-gray-700 dark:text-gray-300 sm:text-xl max-w-[60%]">
                        Отслеживайте динамику цен и получайте профит
                    </p>
                    <div className="mt-8">
                        <Button size="lg" className="flex items-center gap-3 border-2 border-white bg-white py-6 text-base text-black hover:bg-transparent dark:hover:text-white sm:text-lg">
                            <Warehouse className="h-6 w-6" />Войти через Steam
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// <div className={`relative flex h-[500px] overflow-hidden rounded-4xl bg-black mt-4 p-6 sm:p-20 xl:p-40 ${className}`}>
//     <div className="absolute inset-0 z-10 bg-gradient-to-r from-black to-transparent via-black/90 opacity-90 sm:opacity-100" />
//     <div className="absolute inset-0 bg-[url(/images/HeroBanner.png)] bg-cover bg-top-right  sm:opacity-50" />

//     <div className="relative z-20 flex h-full w-full items-center justify-center sm:justify-start text-center sm:text-start">
//         <div className="flex items-center sm:items-start w-full max-w-3xl flex-col gap-4 text-white">
//             <h1 className="text-5xl font-bold leading-tight sm:text-5xl">
//                 Создайте свое портфолио
//             </h1>
//             <p className="text-base text-gray-300 sm:text-xl max-w-[60%]">
//                 Отслеживайте динамику цен и получайте профит
//             </p>
//             <div className="mt-8">
//                 <Button size="lg" className="flex items-center gap-3 border-2 border-white bg-white py-6 text-base text-black hover:bg-transparent hover:text-white sm:text-lg">
//                     <Warehouse className="h-6 w-6" />Войти через Steam
//                 </Button>
//             </div>
//         </div>
//     </div>
// </div>