'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Select, SelectItem } from "@nextui-org/select";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
      <Select
      placeholder='Select Language'
        defaultSelectedKeys={[localActive]}
        className="max-w-xs w-36"
        onChange={onSelectChange}
      >
        <SelectItem key="es" value="es" className='px-6 py-2'>
          Español
        </SelectItem>
        <SelectItem key="en" value="en" className='px-6 py-2'>
          English
        </SelectItem>
        <SelectItem key="pt" value="pt" className='px-6 py-2'>
          Portugues
        </SelectItem>
        <SelectItem key="zh" value="pt" className='px-6 py-2'>
          Chino
        </SelectItem>
      </Select>

  );
}