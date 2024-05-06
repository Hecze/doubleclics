import React from 'react';
import Link from 'next/link';

// Definición de los tipos para las props
interface ButtonProps {
  path?: string; // Ahora es opcional
  children: React.ReactNode;
  onClick?: () => void; // Para soportar acciones de click para botones sin path
}

const Button: React.FC<ButtonProps> = ({ path, children, onClick }) => {
  if (path) {
    // Si hay un path, usa un Link
    return (
      <Link
        href={path}
        className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
      >
        {children}
      </Link>
    );
  }

  // Si no hay path, usa un botón
  return (
    <button
      type="submit" // Asumimos que el tipo es "submit"
      onClick={onClick} // Para permitir eventos de clic
      className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
    >
      {children}
    </button>
  );
};

export default Button;
