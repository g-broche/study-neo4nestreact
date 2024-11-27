export interface GenreDTO {
  label: string;
}

export interface TypeDTO {
  label: string;
}

export interface TagDTO {
  label: string;
}

export interface CategoryDTO {
  label: string;
}

export interface PlatformDTO {
  name: string;
}

export interface GameDTO {
  name: string;
  genres?: GenreDTO[];
}

export interface VideoDTO {
  id: number;
  title: string;
  description: string;
  games?: GameDTO[];
  type?: TypeDTO;
  categories?: CategoryDTO[];
  tags?: TagDTO[];
  hosts?: HostDTO[];
}

export interface HostDTO {
  name: string;
  date: Date;
  url: string;
  thumbnail: string;
}

export interface RoleDTO {
  label: string;
}
export interface PermissionDTO {
  right: string;
}
export interface UserDetailedDTO {
  id: string;
  username: string;
  roles: RoleDTO[];
  permissions: PermissionDTO[];
}
export interface UserBasicDTO {
  username: string;
  roles?: RoleDTO[];
}
export interface loginDTO {
  username: string;
  password: string;
}
