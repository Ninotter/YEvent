import {supabase} from './lib/supabase'

class Database {
  static async getRandomUser() : Promise<Utilisateur | undefined> {
    try {
      const { data, error, status } = await supabase
        .from('Utilisateurs')
        .select('*')
        .order('id', { ascending: true });
      if (error && status !== 406) {
        console.log(error);
        throw error
      }

      if (data) {
        //return a random user in the list
        const randomIndex = Math.floor(Math.random() * data.length);
        return {
          id: data[randomIndex].id,
          nom: data[randomIndex].nom,
          email: data[randomIndex].email,
          password: data[randomIndex].password
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
    return undefined;
  }
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

  public static async getUsers() : Promise<Array<Utilisateur>| undefined> {
    try {
      const { data, error, status } = await supabase
        .from('Utilisateurs')
        .select('*');
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          nom: item.nom,
          email: item.email,
          password: item.password
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