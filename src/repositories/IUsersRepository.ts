import { User } from "@prisma/client";

export interface iUsersRepository {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
}