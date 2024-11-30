import { ConnectedUser, ConnectedUserDTO } from "../interface/dataTransfertObject";

export function converterConnectedUserDTOToConnectedUser(userDTO: ConnectedUserDTO): ConnectedUser{
  return {
    token: userDTO.token,
    username: userDTO.username,
    roles: userDTO.roles.map(role => role.label),
    permissions: userDTO.permissions.map(perm => perm.right)
  }
}