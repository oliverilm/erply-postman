import { UserI } from "../@interfaces";

class PluginStorage {

    getUsers(): UserI[] {
        const jsonString = localStorage.getItem("userList")
        return jsonString ? JSON.parse(jsonString) : []
    }

    setUsers(userArr: UserI[]): void {
        localStorage.setItem("userList", JSON.stringify(userArr))
    }
}

export default new PluginStorage()