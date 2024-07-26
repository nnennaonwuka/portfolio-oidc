import { User } from "@/interfaces/user.interface";

export function getUserData(user) {

const userData:User={
    staff_id:user.staff_id,
    configs:user.data.config[0].configs
}
return userData
 }