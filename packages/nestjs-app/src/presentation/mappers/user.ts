import type { User } from "src/domain/entities/user";

import type { UserDTO } from "../dto/user";

export const mapUserToDTO = (user: User): UserDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
});
