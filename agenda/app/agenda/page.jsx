import { createClient } from '@/utils/supabase/server';

export default async function Agenda() {
  const supabase = createClient();
  const { data: agenda } = await supabase.from("agenda").select();

  if (!agenda || agenda.length === 0) {
    return <p>No hay datos en la agenda.</p>;
  }

  return (
  <div className=' h-screen w-screen flex items-center justify-center bg-gray-800'>
    <div className='w-full max-w-4x1 mt-5 bg-black shadow-md rounded-md p-8 m-5'>
    
    <button className='text-white'><a href="password">Cambiar contraseña</a></button>

      <h3 className="text-3xl text-center font-semibold mb-5 mt-5 text-white">Agenda de actividades</h3>
      <div className="flex items-center">
      <input type="text" placeholder="Buscar por nombre de la materia" className="p-2 border border-black rounded w-3/4 text-black"/>
      <button type="submit" className="ml-2 p-2 bg-purple-400 text-black rounded w-1/4">
        Buscar
      </button>
      </div>
      <button className="bg-purple-400 text-black mb-7 mt-4 p-2 rounded">Agregar actividad</button>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            {Object.keys(agenda[0]).map((key) => (
              <th key={key} className="border border-black py-3 px-6 text-center bg-purple-400 text-black">{key}</th>
            ))}
            <th className="border border-black py-3 px-6 text-center bg-purple-400 text-black">Acciones</th> {}
          </tr>
        </thead>
        <tbody>
          {agenda.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index} className="border border-black py-3 px-6 text-center bg-gray-200 text-black">{value}</td>
              ))}
              <td className="border border-black py-3 px-6 text-center bg-gray-200 text-black"> {}
                <button className="text-black p-2 rounded">Editar</button>
                <button className="text-black p-2 rounded">Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 </div>  
  );
}