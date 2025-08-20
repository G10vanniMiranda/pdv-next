// app/contas-a-pagar/add-account-button.tsx
'use client';

import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";

export function CloseButton() {
    return (
        <Link href="/" className=''>
            < button className='bg-sky-600 cursor-pointer hover:bg-red-600 p-3 rounded-full text-center text-white'><IoIosArrowBack /></ button>
        </Link>
    );
}
