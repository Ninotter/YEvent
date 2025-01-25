import {supabase} from './lib/supabase'

class Database {
  static async getEvents(limit: number = 5) : Promise<Array<YEvent>| undefined>  {
    try {
      const { data, error, status } = await supabase
        .from('Evenements')
        .select('*')
        .order('date', { ascending: true })
        .limit(limit);
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          titre: item.titre,
          description: item.description,
          date: item.date,
          places_max: item.places_max,
          places_restantes: item.places_restantes,
          lieu: item.lieu,
          prix: item.prix,
          latitude: item.latitude,
          longitude: item.longitude
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
    return undefined;
  }
}
export default Database;