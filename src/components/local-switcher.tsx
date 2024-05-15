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
    //guardar el idioma seleccionado en el local storage
    localStorage.setItem('locale', nextLocale);
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });

  };

  const languages = [
    { key: 'es', value: 'es', label: 'Español' },
    { key: 'en', value: 'en', label: 'English' },
    { key: 'pt', value: 'pt', label: 'Português' },
    { key: 'zh', value: 'zh', label: '中国人' },
  ];

  return (
      <Select
      placeholder='Select Language'
      items={languages}
      color='primary'
      variant='bordered'
        defaultSelectedKeys={[localActive]}
        className="max-w-xs w-36"
        onChange={onSelectChange}
      >
        {languages.map((lang) => (
          <SelectItem key={lang.key} value={lang.value} className='py-2 px-6'>
            {lang.label}
          </SelectItem>
        ))}
      </Select>

  );
}