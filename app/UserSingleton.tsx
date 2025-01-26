export class UserSingleton {
    static #instance: UserSingleton;

    public user : Utilisateur | null = null;

    private constructor() { }

    public static get instance(): UserSingleton {
        if (!UserSingleton.#instance) {
            UserSingleton.#instance = new UserSingleton();
        }
        return UserSingleton.#instance;
    }
}