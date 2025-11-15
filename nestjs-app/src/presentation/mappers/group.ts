import type { Group } from "src/domain/entities/group";
import type { GroupDTO } from "../dto/group";

export const mapGroupToDTO = (group: Group): GroupDTO => ({
	id: group.id,
	name: group.name,
});
