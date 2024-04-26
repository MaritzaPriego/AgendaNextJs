/* implementar un formulario para cambio de contraseña
    - input text para contraseña
    - input text para confirmar contraseña
    - boton cambiar mi contraseña
        - al guardar, debe validar:
            * que contraseña tenga valor ( es requerido)
            * contraseña tenga longitud mínima de 6
            * que confirmar contraseña tenga valor (es requerida)
            * contraseña y confirmar contraseña son iguales
        generar mensajes de error

        - acción para guardar la nueva contraseña (ejemplo pendiente)
*/
'use client'
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    // Validar que la contraseña y la confirmación coincidan
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("La contraseña y la confirmación no coinciden");
      return;
    }

    try {
      const user = supabase.auth.user();

      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      // Actualizar la contraseña del usuario en Supabase
      const { error } = await supabase.auth.update({
        password,
      });

      if (error) {
        throw error;
      }

      // Limpiar el estado y redirigir al usuario al inicio de sesión
      setPassword("");
      setConfirmPassword("");
      setError("");
      router.push("/login");
    } catch (error) {
      setError("Error al cambiar la contraseña: " + error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full max-w-md mx-auto justify-center items-center gap-6 p-6 rounded-lg shadow-lg text-white">
        <label className="text-lg font-semibold mb-2" htmlFor="password">
          Nueva Contraseña
        </label>
        <input
          className="rounded-full px-4 py-3 w-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-700 text-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu nueva contraseña"
          required
        />

        <label className="text-lg font-semibold mb-2" htmlFor="confirmPassword">
          Confirmar Contraseña
        </label>
        <input
          className="rounded-full px-4 py-3 w-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-700 text-white"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirma tu nueva contraseña"
          required
        />

        <button
          onClick={handleChangePassword}
          className="bg-green-700 rounded-full px-6 py-3 text-white hover:bg-green-600 transition duration-300"
        >
          Cambiar Contraseña
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}