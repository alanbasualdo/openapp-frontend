export const useGeoApiStore = () => {
  const getProvincias = async () => {
    try {
      const resp = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      if (!resp.ok) {
        throw new Error(`Error al obtener las provincias: ${resp.status}`);
      }
      const data = await resp.json();
      const provinciasOrdenadas = data.provincias.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      return provinciasOrdenadas;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return [];
    }
  };

  const getLocalidades = async (provincia) => {
    if (provincia) {
      try {
        const resp = await fetch(
          `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=1000`
        );
        if (!resp.ok) {
          throw new Error(`Error al obtener las localidades: ${resp.status}`);
        }
        const data = await resp.json();
        console.log(data)
        const localidadesOrdenadas = data.localidades.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        return localidadesOrdenadas;
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        return [];
      }
    }
  };

  return {
    getProvincias,
    getLocalidades,
  };
};
